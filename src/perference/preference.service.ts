import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Preference } from './schemas/preference.schemas';
import { CreateUserPreferenceDto, UpdateUserPreferenceDto } from './dto/user.dto';
import { ResponseDto } from 'src/helper/helper.response';

@Injectable()
export class PreferenceService {
  constructor(
    @InjectModel(Preference.name)
    private PerferenceModel: mongoose.Model<Preference>,
  ) {}

  async findAll(): Promise<ResponseDto<Preference[]>> {
    try {
      return new ResponseDto<Preference[]>(true,"success",await this.PerferenceModel.find());
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve users');
    }
  }

  async findOne(id: string): Promise<ResponseDto<Preference>> {
    try {
      const user = await this.PerferenceModel.findOne({userId:id});
      if (!user) {
        return new ResponseDto<Preference>(false,"User not found",null);
      }
      return new ResponseDto<Preference>(true,"success",user);
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        throw new NotFoundException(`Invalid ID format: ${id}`);
      }
      throw new InternalServerErrorException('Failed to retrieve user');
    }
  }

  async create(createUserPreferenceDto: CreateUserPreferenceDto): Promise<ResponseDto<Preference>> {
    try {
      try{
        const id : string = createUserPreferenceDto.userId;
        const isUser = await this.PerferenceModel.findOne({userId:id}).exec();
        
        if(isUser){
          return new ResponseDto<Preference>(false,"UserId is already there",null);
        }
      }catch (error) {
      throw new InternalServerErrorException('Failed to create user preferences');
    }
      const createdUser = new this.PerferenceModel(createUserPreferenceDto);
      return new ResponseDto<Preference>(true,"success",await createdUser.save());
    } catch (error) {
      throw new InternalServerErrorException('Failed to create user preferences');
    }
  }

  async update(id: string, updateUserPreferenceDto: UpdateUserPreferenceDto): Promise<ResponseDto<Preference>> {
    try {
      const updatedUser = await this.PerferenceModel
        .findOneAndUpdate({userId:id}, updateUserPreferenceDto, { new: true });
      if (!updatedUser) {
        return new ResponseDto<Preference>(false,"User id not found",null);
      }
      return new ResponseDto<Preference>(true,"success",updatedUser);
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        throw new NotFoundException(`Invalid ID format: ${id}`);
      }
      throw new InternalServerErrorException('Failed to update user preferences');
    }
  }

  async remove(id: string): Promise<ResponseDto<string>> {
    try {
        const deletedUser = await this.PerferenceModel
        .findOneAndDelete({ userId: id });
      if (!deletedUser) {
        return new ResponseDto<string>(false,"User id not found","");
      }
      return new ResponseDto<string>(true,"success","Deleted successfully");
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        throw new NotFoundException(`Invalid ID format: ${id}`);
      }
      throw new InternalServerErrorException('Failed to delete user');
    }
  }
}
