// similar to App.js in react(imports all the modules)

import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';

// decorator 
@Module({
  imports: [AuthModule, UserModule, BookmarkModule, PrismaModule],
  
})
export class AppModule {}
