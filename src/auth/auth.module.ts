import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
// import {PrismaModule} from '../prisma/prisma.module'
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';

@Module({
    // imports: [PrismaModule],
    imports: [JwtModule.register({})],// for using JWT in auth service
    controllers: [AuthController], // handles requests
    providers: [AuthService, JwtStrategy], // handles business logic
})
export class AuthModule { } // created a module for authentication and exported so it can be imported in app.module.ts
