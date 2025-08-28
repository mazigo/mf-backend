import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PaymentTypeService } from './payment-type.service';
import { CreatePaymentTypeDto } from './dto/create-payment-type.dto';
import { UpdatePaymentTypeDto } from './dto/update-payment-type.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { Permissions } from 'src/permissions/permissions.decorator';
import { PermissionsGuard } from 'src/permissions/permissions.guard';

@Controller('payment-type')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class PaymentTypeController {
  constructor(private readonly paymentTypeService: PaymentTypeService) {}

  @Post()
      @UseGuards(PermissionsGuard)
      @Permissions('create:payment-type')
  create(@Body() createPaymentTypeDto: CreatePaymentTypeDto) {
    return this.paymentTypeService.create(createPaymentTypeDto);
  }

  @Get()
      @UseGuards(PermissionsGuard)
      @Permissions('read:payment-type')
  findAll() {
    return this.paymentTypeService.findAll();
  }

  @Get(':id')
      @UseGuards(PermissionsGuard)
      @Permissions('read:payment-type')
  findOne(@Param('id') id: string) {
    return this.paymentTypeService.findOne(id);
  }

  @Patch(':id')
      @UseGuards(PermissionsGuard)
      @Permissions('update:payment-type')
  update(@Param('id') id: string, @Body() updatePaymentTypeDto: UpdatePaymentTypeDto) {
    return this.paymentTypeService.update(id, updatePaymentTypeDto);
  }

  @Delete(':id')
      @UseGuards(PermissionsGuard)
      @Permissions('delete:payment-type')
  remove(@Param('id') id: string) {
    return this.paymentTypeService.delete(id);
  }
}
