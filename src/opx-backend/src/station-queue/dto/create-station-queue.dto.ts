import { IsString } from 'class-validator';

export class CreateStationQueueDto {
  @IsString()
  stationId: string;

  @IsString()
  productionOrderId: string;
}
