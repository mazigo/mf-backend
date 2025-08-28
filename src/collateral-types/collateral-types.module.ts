import { Module } from '@nestjs/common';
import { CollateralTypesService } from './collateral-types.service';
import { CollateralTypesController } from './collateral-types.controller';
import { CollateralType } from './entities/collateral-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CollateralType])],
  controllers: [CollateralTypesController],
  providers: [CollateralTypesService],
})
export class CollateralTypesModule {}
