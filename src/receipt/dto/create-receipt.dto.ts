
import { IsDateString, IsNotEmpty, IsNumber, IsString, Min} from 'class-validator';

export class CreateReceiptDto {
    @IsDateString()
    issuedAt: Date;

    @IsString()
    @IsNotEmpty()
    name: String;

    @IsNumber()
    @Min(0)
    price: number;  
}