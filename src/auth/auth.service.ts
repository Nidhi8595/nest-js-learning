import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service"
// import { User, Bookmark } from '@prisma/client' but we dont need to import these since these are now already exported as ts types in prisma folder 

import { AuthDto } from './dto'
import * as argon from 'argon2' // for hashing the password
import { PrismaClientKnownRequestError } from "generated/prisma/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config"; // to use jwt secret from env file

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService,
    ) { }

    async signup(dto: AuthDto) {

        const hash = await argon.hash(dto.password); // hashing  the password before storing it in db

        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                },
                // select:{ // only return these fields
                //     id:true,
                //     email:true,
                //     createdAt:true,
                // }

            })

            // or

            const { hash: _, ...userWithoutHash } = user; // to remove the hash from the returned user object and store into a "ignored variable"

            return userWithoutHash;
        }
        catch (error) {
            // avoiding duplicate email error
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken')
                }
            }

            throw error
        }
    }

    async signin(dto: AuthDto) {

        // firstly find if the user having such email exists
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        })

        // if user does not exist throw exception
        if (!user) {
            throw new ForbiddenException('User does not exist')
        }

        // then, compare passwords
        const pwMatches = await argon.verify(user.hash, dto.password)

        if (!pwMatches) {
            throw new ForbiddenException('Credentials incorrect')
        }

        // otherwise return the user

        const { hash: _, ...userWithoutHash } = user; // to remove the hash from the returned user object and store into a "ignored variable i.e. _"

        return this.signToken(user.id, user.email);
    }

    async signToken(userId: number, email: string // info extracted from jwt
    ): Promise<{ access_token: string }> {

        // data sent using jwt token
        const payload = {
            sub: userId,
            email
        }

        const secret = this.config.get('JWT_SECRET')
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m', // token expiry time
            secret: secret,
        })

        return {
            access_token: token,
        }


    }
}