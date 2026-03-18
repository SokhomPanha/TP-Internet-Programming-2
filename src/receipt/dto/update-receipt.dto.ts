import { IsDateString , IsNumber, IsOptional, IsString, Min} from 'class-validator';

export class UpdateReceiptDto {
    @IsOptional()
    @IsDateString()
    isUsedAt?: Date;

    @IsOptional()
    @IsString()
    name? : String;

    @IsOptional()
    @IsNumber()
    @Min(0)
    price?: number;

}
