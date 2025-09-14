import { Body, Controller,HttpCode, HttpStatus, Post } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { AuthDto } from './dto'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    //initialising the service// private used instead of using this pointer

    @Post('signup') // 201
    signup(@Body() dto: AuthDto) {
        return this.authService.signup(dto)// calling the method from auth service
    }

    @HttpCode(HttpStatus.OK) // 200
    @Post('signin')
    signin(@Body() dto: AuthDto) {

        return this.authService.signin(dto)
    }

} 