import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { StoresClientModule } from './modules/stores-client.module';

@Module({
  imports: [
    RouterModule.register([
      {
        path:'client',
        module: StoresClientModule
      }
    ]),
    StoresClientModule
  ]
})
export class StoresModule {}
