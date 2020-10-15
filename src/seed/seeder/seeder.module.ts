import { MongoProviderModule } from './../../modules/mongo-provider.module';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BootcampsModule } from 'src/modules/bootcamps.module';
import { SeederService } from './seeder.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongoProviderModule,
    MongooseModule.forRoot(`mongodb://localhost:27017/dev-camper`, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }),
    BootcampsModule,
  ],
  controllers: [],
  providers: [SeederService, Logger],
})
export class SeederModule {}
