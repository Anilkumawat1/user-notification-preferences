import { Module } from '@nestjs/common';
import { PreferenceModule } from './perference/preference.module';
import { NotificationModule } from './notification/notification.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    PreferenceModule, 
    NotificationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
