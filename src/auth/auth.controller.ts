import { Controller, Post } from "@nestjs/common"
import { AuthService } from "./auth.service"

@Controller('auth')

export class AuthController {
    constructor(private authService: AuthService) { }// private used instead of using this pointer

    @Post('signup')
    signup() {
        return 'This is signup endpoint'
    }

    @Post('signin')
    signin() {

        return 'This is signin endpoint'
    }

} 