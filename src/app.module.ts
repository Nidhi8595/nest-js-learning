// similar to App.js in react(imports all the modules)

import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';

// decorator 
@Module({
  imports: [AuthModule, UserModule, BookmarkModule],
  
})
export class AppModule {}
