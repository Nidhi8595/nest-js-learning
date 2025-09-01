import   { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService{

    signup(){
        return {msg:'Hey there'}
    }

    signin(){
        return {msg:'Hey there! i have signed in'}
    }
}