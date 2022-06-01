import { Controller, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

import { AppService } from './app.service';
import { Categoria } from './interfaces/categorias/categoria.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  private readonly logger = new Logger(AppService.name);

  @EventPattern('criar-categoria')
  async create(@Payload() categoria: Categoria): Promise<void> {
    await this.appService.create(categoria);
  }

  @MessagePattern('consultar-categorias')
  async getCategories(
    @Payload() _id: string,
  ): Promise<Categoria | Categoria[]> {
    if (_id) {
      const getById = await this.appService.getCategoriesById(_id);
      return getById;
    }
    const getAllCategories = await this.appService.getAllCategories();
    return getAllCategories;
  }
}
