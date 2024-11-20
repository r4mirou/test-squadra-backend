import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as compression from 'compression';
import helmet from 'helmet';
import { PrismaService } from './config/database/prisma.service';
import { Swagger } from './config/swagger/swagger';

async function bootstrap() {
  const port = process.env.DEFAULT_HTTP_PORT ?? 3000;

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  app.use(helmet());
  app.use(compression());

  Swagger.initalizer(app);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(port, () =>
    console.log(`Application is running on PORT: ${port}`),
  );
}
bootstrap();
