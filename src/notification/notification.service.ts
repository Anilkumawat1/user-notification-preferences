import { Injectable , NotFoundException ,InternalServerErrorException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { NotificationLog } from './schemas/notification.schemas';
import { SendNotificationDto } from './dto/notification.dto';
import { ResponseDto } from 'src/helper/helper.response';
@Injectable()
export class NotificationService {
    constructor(
        @InjectModel(NotificationLog.name)
        private notificationLogModel: mongoose.Model<NotificationLog>,
        
      ) {}
    async sendNotification(sendNotificationDto: SendNotificationDto): Promise<ResponseDto<NotificationLog>> {
       
        const isSuccess = Math.random() > 0.2;
        
        const logData: NotificationLog = {
          userId: sendNotificationDto.userId,
          type: sendNotificationDto.type,
          channel: sendNotificationDto.channel,
          status: isSuccess ? 'sent' : 'failed',
          sentAt: isSuccess ? new Date() : undefined,
          failureReason: isSuccess ? undefined : 'Simulated failure',
          metadata: {
            content: sendNotificationDto.content,
          },
        };
    
        try {
          const createdLog = new this.notificationLogModel(logData);
          const saved = await createdLog.save();
          return new ResponseDto<NotificationLog>(true,"success",saved);
        } catch (error) {
          throw new InternalServerErrorException('Failed server error');
        }
        
      }
    
      async getUserLogs(userId: string): Promise<ResponseDto<NotificationLog[]>> {
        try {
          const logs = await this.notificationLogModel.find({ userId }).exec();
          return new ResponseDto<NotificationLog[]>(true,"success",logs);
        } catch (error) {
          throw new InternalServerErrorException('Failed server error');
        }
      
      }
    
      async getStats(): Promise<ResponseDto<Record<string, any>>> {
        try {
          const stats = await this.notificationLogModel.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } },
          ]);
          return new ResponseDto<Record<string, any>>(true,"success",stats.reduce((acc, { _id, count }) => ({ ...acc, [_id]: count }), {}));
        } catch (error) {
          throw new InternalServerErrorException('Failed server error');
        }
        
      }
    }

