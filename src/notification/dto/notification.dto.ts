import { IsEnum, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class NotificationContentDto {
  @IsString()
  subject: string;

  @IsString()
  body: string;
}

export class SendNotificationDto {
  @IsString()
  userId: string;

  @IsEnum(['marketing', 'newsletter', 'updates'])
  type: 'marketing' | 'newsletter' | 'updates';

  @IsEnum(['email', 'sms', 'push'])
  channel: 'email' | 'sms' | 'push';

  @ValidateNested()
  @Type(() => NotificationContentDto)
  content: NotificationContentDto;
}
