import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service"
// import { User, Bookmark } from '@prisma/client' but we dont need to import these since these are now already exported as ts types in prisma folder 

import { AuthDto } from './dto'
import * as argon from 'argon2' // for hashing the password
import { PrismaClientKnownRequestError } from "generated/prisma/runtime/library";

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService) {

    }

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

            const { hash: _, ...userWithoutHash } = user; // to remove the hash from the returned user object

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

        // async signin(dto: AuthDto) {
        //     return { msg: 'Hey there! i have signed in' }
        // }
    }}