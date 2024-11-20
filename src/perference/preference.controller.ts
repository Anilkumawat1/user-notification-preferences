import { Controller, Get, Post, Body,Param,Patch,Delete } from '@nestjs/common';
import { PreferenceService } from './preference.service';
import {CreateUserPreferenceDto,UpdateUserPreferenceDto} from './dto/user.dto';
@Controller('preference')
export class PreferenceController {
    constructor(
        private preferenceService : PreferenceService
    ){}

    
    @Get()
    async findAll() {
      return this.preferenceService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      return this.preferenceService.findOne(id);
    }
  
    @Post()
    async create(@Body() createUserPreferenceDto: CreateUserPreferenceDto) {
      return this.preferenceService.create(createUserPreferenceDto);
    }
  
    @Patch(':id')
    async update(
      @Param('id') id: string,
      @Body() updateUserPreferenceDto: UpdateUserPreferenceDto,
    ) {
      return this.preferenceService.update(id, updateUserPreferenceDto);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string) {
      return this.preferenceService.remove(id);
    }
}
