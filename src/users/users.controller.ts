import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { Permissions } from 'src/permissions/permissions.decorator';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(PermissionsGuard)
  @Permissions('create:users')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(PermissionsGuard)
  @Permissions('read:users')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('read:users')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('update:users')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('delete:users')
  remove(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
