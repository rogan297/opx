import { PartialType } from '@nestjs/mapped-types';
import { CreateActionTypeDto } from './create-action-type.dto';

export class UpdateActionTypeDto extends PartialType(CreateActionTypeDto) {}
