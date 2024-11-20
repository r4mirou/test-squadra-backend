import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { Swagger } from './config/swagger/swagger';

async function bootstrap() {
  const port = process.env.DEFAULT_HTTP_PORT ?? 3000;

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  Swagger.initalizer(app);

  await app.listen(port, () =>
    console.log(`Application is running on PORT: ${port}`),
  );
}
bootstrap();
