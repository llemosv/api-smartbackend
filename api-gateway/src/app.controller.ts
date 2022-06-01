import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CriarCategoriaDto } from './common/dtos/categorias/criar-categoria.dto';

@Controller('api/v1')
export class AppController {
  private logger = new Logger(AppController.name);
  private clientAdminBackend: ClientProxy;

  constructor() {
    this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user:HIU51Y7DdChw@54.89.222.190:5672/smartranking'],
        queue: 'admin-backend',
      },
    });
  }

  @Post('categorias/create')
  @UsePipes(ValidationPipe)
  createCategory(@Body() criarCategoriaDto: CriarCategoriaDto) {
    this.clientAdminBackend.emit('criar-categoria', criarCategoriaDto);
  }

  @Get('categorias/list')
  getCategories(@Query('idCategoria') _id: string): Observable<any> {
    return this.clientAdminBackend.send('consultar-categorias', _id ? _id : '');
  }
}
