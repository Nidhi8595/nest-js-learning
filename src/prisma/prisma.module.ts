import { Global, Module } from '@nestjs/common';
import { PrismaController } from './prisma.controller';
import { PrismaService } from './prisma.service';

@Global() // now it will be available to all the modules
@Module({
    controllers: [PrismaController],
    providers: [PrismaService],

    exports: [PrismaService],// need to be exported in case using in other module
})
export class PrismaModule {}
