import { PartialType } from '@nestjs/swagger';
import { CreateStockmovementDto } from './create-stockmovement.dto';

export class UpdateStockmovementDto extends PartialType(CreateStockmovementDto) {}
