import { IsBoolean, IsEmail, IsEnum, IsObject, IsString, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class Channels {
  @IsBoolean()
  email: boolean;

  @IsBoolean()
  sms: boolean;

  @IsBoolean()
  push: boolean;
}

class Preferences {
  @IsBoolean()
  marketing: boolean;

  @IsBoolean()
  newsletter: boolean;

  @IsBoolean()
  updates: boolean;

  @IsEnum(['daily', 'weekly', 'monthly', 'never'])
  frequency: 'daily' | 'weekly' | 'monthly' | 'never';

  @ValidateNested()
  @Type(() => Channels)
  channels: Channels;
}

export class CreateUserPreferenceDto {
  @IsString()
  userId: string;

  @IsEmail()
  email: string;

  @ValidateNested()
  @Type(() => Preferences)
  preferences: Preferences;

  @IsString()
  timezone: string;
}

export class UpdateUserPreferenceDto {
    @IsOptional()
    @IsEmail()
    email?: string;
  
    @IsOptional()
    @IsObject()
    preferences?: Preferences;
  
    @IsOptional()
    @IsString()
    timezone?: string;
  }