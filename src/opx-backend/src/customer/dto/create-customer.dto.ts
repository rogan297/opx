import { IsString, IsUUID } from 'class-validator';

export class CreateCustomerDto {

    @IsString()
    name: string;

    @IsUUID() 
    tenantId: string;
}
