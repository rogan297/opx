import { PartialType } from '@nestjs/mapped-types';
import { CreateStationQueueDto } from './create-station-queue.dto';

export class UpdateStationQueueDto extends PartialType(CreateStationQueueDto) {}
