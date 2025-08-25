import { PartialType } from '@nestjs/mapped-types';
import { CreateCollateralTypeDto } from './create-collateral-type.dto';

export class UpdateCollateralTypeDto extends PartialType(CreateCollateralTypeDto) {}
