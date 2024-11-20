import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema({ timestamps: true })
export class Preference {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true, unique: true ,match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })
  email: string;

  @Prop({
    required: true,
    type: {
      marketing: Boolean,
      newsletter: Boolean,
      updates: Boolean,
      frequency: { type: String, enum: ['daily', 'weekly', 'monthly', 'never'] },
      channels: {
        email: Boolean,
        sms: Boolean,
        push: Boolean,
      },
    },
  })
  preferences: {
    marketing: boolean;
    newsletter: boolean;
    updates: boolean;
    frequency: 'daily' | 'weekly' | 'monthly' | 'never';
    channels: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };

  @Prop({ required: true })
  timezone: string;
}

export const PreferenceSchema = SchemaFactory.createForClass(Preference);