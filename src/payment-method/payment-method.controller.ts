import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Permissions } from 'src/permissions/permissions.decorator';

@Controller('payment-method')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @Post()
        @UseGuards(PermissionsGuard)
        @Permissions('create:payment-method')
  create(@Body() createPaymentMethodDto: CreatePaymentMethodDto) {
    return this.paymentMethodService.create(createPaymentMethodDto);
  }

  @Get()
        @UseGuards(PermissionsGuard)
        @Permissions('read:payment-method')
  findAll() {
    return this.paymentMethodService.findAll();
  }

  @Get(':id')
        @UseGuards(PermissionsGuard)
        @Permissions('read:payment-method')
  findOne(@Param('id') id: string) {
    return this.paymentMethodService.findOne(id);
  }

  @Patch(':id')
        @UseGuards(PermissionsGuard)
        @Permissions('update:payment-method')
  update(@Param('id') id: string, @Body() updatePaymentMethodDto: UpdatePaymentMethodDto) {
    return this.paymentMethodService.update(id, updatePaymentMethodDto);
  }

  @Delete(':id')
        @UseGuards(PermissionsGuard)
        @Permissions('delete:payment-method')
  remove(@Param('id') id: string) {
    return this.paymentMethodService.delete(id);
  }
}
