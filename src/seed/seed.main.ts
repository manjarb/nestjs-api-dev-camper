import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder/seeder.module';
import { SeederService } from './seeder/seeder.service';

async function bootstrap(): Promise<void> {
  NestFactory.createApplicationContext(SeederModule)
    .then(appContext => {
      const logger = appContext.get(Logger);
      const seeder = appContext.get(SeederService);

      if (process.argv[2] === '-i') {
        seeder
          .seed()
          .then(() => {
            logger.debug('Seeding complete!');
          })
          .catch(error => {
            logger.error('Seeding failed!');
            throw error;
          })
          .finally(() => appContext.close());
      } else if (process.argv[2] === '-d') {
        // deleteData();
      }
    })
    .catch(error => {
      throw error;
    });
}
bootstrap();
