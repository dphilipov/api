import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common'
import { Public } from 'nest-keycloak-connect'

import { ExpensesService } from './expenses.service'
import { CreateExpenseDto } from './dto/create-expense.dto'

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) { }

  @Public()
  @Get('list')
  async findAll() {
    return await this.expensesService.listExpenses()
  }

  @Public()
  @Post('create-expense')
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.createExpense(createExpenseDto)
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expensesService.findOne(id)
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expensesService.remove(id)
  }

  @Public()
  @Delete()
  removeMany(@Body() idsToDelete: string[]) {
    return this.expensesService.removeMany(idsToDelete);
  }
}