import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export class SwaggerDocument {
  public static swaggerSetup = (app: INestApplication) => {
    const config = new DocumentBuilder()
      .setTitle('Navicode')
      .setDescription('Navicode API specification')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/swagger', app, document);
  };
}
