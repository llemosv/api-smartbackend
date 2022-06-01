import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriaSchema } from './interfaces/categorias/schema/categoria.schema';
import { JogadorSchema } from './interfaces/jogadores/schema/jogador.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://llemos:llemos@123@cluster0.fbdln.mongodb.net/sradmbackend?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
    ),
    MongooseModule.forFeature([
      { name: 'Jogador', schema: JogadorSchema },
      { name: 'Categoria', schema: CategoriaSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
