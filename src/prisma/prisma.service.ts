import { Injectable } from "@nestjs/common";
import { PrismaClient } from "generated/prisma";

@Injectable({})
export class PrismaService extends PrismaClient{
    constructor(){
        super({
            datasources:{
                db:{
                    url: 'postgresql://nestuser:nestpass@localhost:5432/nest?schema=public'
                },            
            },           
        });        
    }        
}                        