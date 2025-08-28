import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentTypeDto } from './dto/create-payment-type.dto';
import { UpdatePaymentTypeDto } from './dto/update-payment-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentType } from './entities/payment-type.entity';

@Injectable()
export class PaymentTypeService {
  constructor(
    @InjectRepository(PaymentType)
    private paymentTypeRepository: Repository<PaymentType>,
  ) {}

  async create(createPaymentTypeDto: CreatePaymentTypeDto): Promise<PaymentType> {
    // Check for duplicate name
    const existingPaymentType = await this.paymentTypeRepository.findOne({
      where: { name: createPaymentTypeDto.name },
    });
    if (existingPaymentType) {
      throw new ConflictException(`Payment type with name "${createPaymentTypeDto.name}" already exists`);
    }

    // Create PaymentType
    const paymentType = new PaymentType();
    paymentType.name = createPaymentTypeDto.name;

    // Save PaymentType
    return this.paymentTypeRepository.save(paymentType);
  }

  async findAll(): Promise<PaymentType[]> {
    return this.paymentTypeRepository.find();
  }

  async findOne(id: string): Promise<PaymentType> {
    const paymentType = await this.paymentTypeRepository.findOne({
      where: { id },
    });
    if (!paymentType) {
      throw new NotFoundException(`Payment type with ID "${id}" not found`);
    }
    return paymentType;
  }

  async update(id: string, updatePaymentTypeDto: UpdatePaymentTypeDto): Promise<PaymentType> {
    const paymentType = await this.paymentTypeRepository.findOne({
      where: { id },
    });
    if (!paymentType) {
      throw new NotFoundException(`Payment type with ID "${id}" not found`);
    }

    // Check for duplicate name
    if (updatePaymentTypeDto.name && updatePaymentTypeDto.name !== paymentType.name) {
      const existingPaymentType = await this.paymentTypeRepository.findOne({
        where: { name: updatePaymentTypeDto.name },
      });
      if (existingPaymentType) {
        throw new ConflictException(`Payment type with name "${updatePaymentTypeDto.name}" already exists`);
      }
      paymentType.name = updatePaymentTypeDto.name;
    }

    return this.paymentTypeRepository.save(paymentType);
  }

  async delete(id: string): Promise<void> {
    const paymentType = await this.paymentTypeRepository.findOne({
      where: { id },
    });
    if (!paymentType) {
      throw new NotFoundException(`Payment type with ID "${id}" not found`);
    }
    await this.paymentTypeRepository.delete(id);
  }
}
