import { Module } from '@nestjs/common';
import { PreferenceService } from './preference.service';
import { PreferenceController } from './preference.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {PreferenceSchema} from './schemas/preference.schemas'
@Module({
  imports:[MongooseModule.forFeature([{name:'Preference',schema:PreferenceSchema}])],
  providers: [PreferenceService],
  controllers: [PreferenceController]
})
export class PreferenceModule {}
