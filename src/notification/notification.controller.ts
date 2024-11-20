import { Controller,Param,Post,Body,Get } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { SendNotificationDto } from './dto/notification.dto';
@Controller('notification')
export class NotificationController {
    constructor(private notificationLogService: NotificationService) {}

    @Post('send')
    async sendNotification(@Body() sendNotificationDto: SendNotificationDto) {
      const result = await this.notificationLogService.sendNotification(sendNotificationDto);
      return result;
    }
  
    @Get(':userId/logs')
    async getUserLogs(@Param('userId') userId: string) {
      return this.notificationLogService.getUserLogs(userId);
    }
  
    @Get('stats')
    async getStats() {
      return this.notificationLogService.getStats();
    }
  }

