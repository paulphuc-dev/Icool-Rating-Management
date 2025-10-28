import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export class SwaggerConfig {
  static setup(app: INestApplication): void {
    const configService = app.get(ConfigService);
    const developmentUrl =
      configService.get<string>('BASE_URL') ?? 'http://localhost:3001/';

    const config = new DocumentBuilder()
      .setTitle('Icool Rating API')
      .setDescription('Rating API documentation')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'Authorization',
          description: 'Enter JWT token',
          in: 'header',
        },
        'Bearer',
      )
      .addServer(developmentUrl, 'http')
      .addTag('Auth', 'Require login to use CMS features')
      .addTag('Feedbacks', 'Used to manage feedbacks')
      .addTag('Regions', 'Used to manage regions')
      .addTag('Stores', 'Used to manage stores')
      .addTag('Surveys', 'Used to manage surveys')
      .build();

    const document = SwaggerModule.createDocument(app, config);

    const sortedPaths = Object.keys(document.paths)
      .sort((a, b) => a.localeCompare(b))
      .reduce(
        (acc, key) => {
          acc[key] = document.paths[key];
          return acc;
        },
        {} as typeof document.paths,
      );

    document.paths = sortedPaths;
    SwaggerModule.setup('api-docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });
  }
}
