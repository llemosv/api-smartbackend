import { Model } from 'mongoose';

import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';

import { Categoria } from './interfaces/categorias/categoria.interface';
import { Jogador } from './interfaces/jogadores/jogador.interface';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}
  private readonly logger = new Logger(AppService.name);

  async create(categoria: Categoria): Promise<Categoria> {
    try {
      const createCategory = new this.categoriaModel(categoria);

      return createCategory.save();
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);

      throw new RpcException(error.message);
    }
  }

  async getAllCategories(): Promise<Categoria[]> {
    try {
      const categories = await this.categoriaModel.find().exec();

      return categories;
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);

      throw new RpcException(error.message);
    }
  }

  async getCategoriesById(_id: string): Promise<Categoria> {
    try {
      const category = await this.categoriaModel.findOne({ _id }).exec();

      return category;
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);

      throw new RpcException(error.message);
    }
  }
}
