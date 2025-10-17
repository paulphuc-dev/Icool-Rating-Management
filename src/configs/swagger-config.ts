import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
export class SwaggerConfig {
  static setup(app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle('My API')
      .setDescription('API documentation')
      .setVersion('1.0')
      .addBearerAuth() 
      .build();

    const document = SwaggerModule.createDocument(app, config);

    const sortedPaths = Object.keys(document.paths)
      .sort((a, b) => a.localeCompare(b))
      .reduce((acc, key) => {
        acc[key] = document.paths[key];
        return acc;
      }, {} as typeof document.paths);
    
    document.paths = sortedPaths; 
    SwaggerModule.setup('api-docs', app, document);
  }
}