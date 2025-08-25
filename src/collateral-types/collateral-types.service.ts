import { Injectable } from '@nestjs/common';
import { CreateCollateralTypeDto } from './dto/create-collateral-type.dto';
import { UpdateCollateralTypeDto } from './dto/update-collateral-type.dto';

@Injectable()
export class CollateralTypesService {
  create(createCollateralTypeDto: CreateCollateralTypeDto) {
    return 'This action adds a new collateralType';
  }

  findAll() {
    return `This action returns all collateralTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} collateralType`;
  }

  update(id: number, updateCollateralTypeDto: UpdateCollateralTypeDto) {
    return `This action updates a #${id} collateralType`;
  }

  remove(id: number) {
    return `This action removes a #${id} collateralType`;
  }
}
