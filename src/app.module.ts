import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './ormconfig';
import { LocationModule } from './location/location.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), LocationModule],
})
export class AppModule {}