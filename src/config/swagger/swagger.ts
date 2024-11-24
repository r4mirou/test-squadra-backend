import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

export class Swagger {
  private static getConfig(): Omit<OpenAPIObject, 'paths'> {
    const config = new DocumentBuilder()
      .setTitle("Article System Doc's")
      .setDescription('')
      .setVersion('0.0.1')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        'access-token',
      )
      .build();

    return config;
  }

  static initalizer(app: NestExpressApplication) {
    const config = this.getConfig();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`/docs`, app, document);
  }
}
