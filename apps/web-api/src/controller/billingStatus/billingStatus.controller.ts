import { Controller, Post, Body, UseFilters, Put, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { HttpErrorFilter } from '../../common/filters/http-error.filter';
import { BillingStatus } from '../../Models/billingStatus.model';
import { CreateBillingStatusDto, UpdateBillingStatusDto } from '../../Models/dto/biliingStatus.dto';
import { BillingStatusService } from '../../services/billingStatus';


@ApiTags('billingStatus')
@Controller('billingStatus')
@UseFilters(HttpErrorFilter)
export class BillingStatusController {
    constructor(private readonly billingStatusService: BillingStatusService) { }

    @Post('create')
    @ApiOperation({ summary: 'Create a new billing status' })
    @ApiBody({ type: CreateBillingStatusDto })
    async create(@Body() createBillingStatusDto: CreateBillingStatusDto): Promise<BillingStatus> {
        return await this.billingStatusService.createBillingStatus(createBillingStatusDto);
    }

    @Put('update')
    @ApiOperation({ summary: 'Update a billing status by ID' })
    @ApiBody({ type: UpdateBillingStatusDto })
    async update(@Body() updateBillingStatusDto: UpdateBillingStatusDto): Promise<BillingStatus> {
        return await this.billingStatusService.updateBillingStatus(updateBillingStatusDto.id, updateBillingStatusDto);
    }

    @Get('All')
    @ApiOperation({ summary: 'Get all billing statuses' })
    @ApiResponse({ status: 200, description: 'Return all billing statuses.' })
    async getAllBillingStatuses(): Promise<BillingStatus[]> {
        return await this.billingStatusService.getAllBillingStatuses();
    }
}
