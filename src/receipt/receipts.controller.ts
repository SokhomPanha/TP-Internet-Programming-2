import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import {CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { UseGuards} from '@nestjs/common'
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller( 'receipts')
export class ReciptsController {
    constructor(private receiptsService: ReceiptsService) {}

    @Get()
    findAll(){
        return this.receiptsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.receiptsService.findOne(id);
    }

    @Post()
    create(@Body() dto: CreateReceiptDto) {
        return this.receiptsService.create(dto);
    }

    // @Put(':id')
    // async update(@Param('id') id: string, @Body() dto: UpdateReceiptDto) {
    //     return this.receiptsService.update(id, dto);
    // }
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateReceiptDto) {
        return this.receiptsService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id')id: string) {
        return
    }
}   