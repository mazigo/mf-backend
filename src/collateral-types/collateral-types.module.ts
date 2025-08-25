import { Module } from '@nestjs/common';
import { CollateralTypesService } from './collateral-types.service';
import { CollateralTypesController } from './collateral-types.controller';

@Module({
  controllers: [CollateralTypesController],
  providers: [CollateralTypesService],
})
export class CollateralTypesModule {}
