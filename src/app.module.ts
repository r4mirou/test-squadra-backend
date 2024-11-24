import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database/database.module';
import { UserModule } from './modules/user/user.module';
import { ArticleModule } from './modules/article/article.module';

@Module({
  imports: [DatabaseModule, UserModule, ArticleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
