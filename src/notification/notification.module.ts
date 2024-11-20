import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { MongooseModule } from '@nestjs/mongoose';
import {NotificationLogSchema} from './schemas/notification.schemas'
@Module({
  imports:[MongooseModule.forFeature([{name:'NotificationLog',schema:NotificationLogSchema}])],
  controllers: [NotificationController],
  providers: [NotificationService]
})
export class NotificationModule {}
