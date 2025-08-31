import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {} // created a module for authentication and exported so it can be imported in app.module.ts
