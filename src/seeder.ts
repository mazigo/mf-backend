import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder/seeder.module';
import { SeederService } from './seeder/seeder.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeederModule);
  const seeder = app.get(SeederService);
  await seeder.seedInitialData();
  await app.close();
}

bootstrap().catch(err => {
  console.error('Error during seeding:', err);
  process.exit(1);
});