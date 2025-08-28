import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentMethod } from './entities/payment-method.entity';

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectRepository(PaymentMethod)
    private paymentMethodRepository: Repository<PaymentMethod>,
  ) {}

  async create(createPaymentMethodDto: CreatePaymentMethodDto): Promise<PaymentMethod> {
    // Check for duplicate name
    const existingPaymentMethod = await this.paymentMethodRepository.findOne({
      where: { name: createPaymentMethodDto.name },
    });
    if (existingPaymentMethod) {
      throw new ConflictException(`Payment method with name "${createPaymentMethodDto.name}" already exists`);
    }

    // Create PaymentMethod
    const paymentMethod = new PaymentMethod();
    paymentMethod.name = createPaymentMethodDto.name;

    // Save PaymentMethod
    return this.paymentMethodRepository.save(paymentMethod);
  }

  async findAll(): Promise<PaymentMethod[]> {
    return this.paymentMethodRepository.find();
  }

  async findOne(id: string): Promise<PaymentMethod> {
    const paymentMethod = await this.paymentMethodRepository.findOne({
      where: { id },
    });
    if (!paymentMethod) {
      throw new NotFoundException(`Payment method with ID "${id}" not found`);
    }
    return paymentMethod;
  }

  async update(id: string, updatePaymentMethodDto: UpdatePaymentMethodDto): Promise<PaymentMethod> {
    const paymentMethod = await this.paymentMethodRepository.findOne({
      where: { id },
    });
    if (!paymentMethod) {
      throw new NotFoundException(`Payment method with ID "${id}" not found`);
    }

    // Check for duplicate name
    if (updatePaymentMethodDto.name && updatePaymentMethodDto.name !== paymentMethod.name) {
      const existingPaymentMethod = await this.paymentMethodRepository.findOne({
        where: { name: updatePaymentMethodDto.name },
      });
      if (existingPaymentMethod) {
        throw new ConflictException(`Payment method with name "${updatePaymentMethodDto.name}" already exists`);
      }
      paymentMethod.name = updatePaymentMethodDto.name;
    }

    return this.paymentMethodRepository.save(paymentMethod);
  }

  async delete(id: string): Promise<void> {
    const paymentMethod = await this.paymentMethodRepository.findOne({
      where: { id },
    });
    if (!paymentMethod) {
      throw new NotFoundException(`Payment method with ID "${id}" not found`);
    }
    await this.paymentMethodRepository.delete(id);
  }
}
