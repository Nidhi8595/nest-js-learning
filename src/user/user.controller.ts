import { Controller, Get,Patch, UseGuards} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { Request } from "express";
import { GetUser } from '../auth/decorator/get-user.decorator'
import { JwtGuard } from "../auth/guard";
import type { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {

    @Get('me')
    getMe(@GetUser() user: User) {
        return user;
    }

    @Patch()
    editUser() {
        
    }
}
