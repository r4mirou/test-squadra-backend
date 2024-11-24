import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ArticleModule } from './modules/article/article.module';

@Module({
  imports: [DatabaseModule, UserModule, ArticleModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
