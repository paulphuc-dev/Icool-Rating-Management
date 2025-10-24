import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { RegionsCMSModule } from './modules/regions-cms.module';

@Module({
  imports: [
    RouterModule.register([
      {
        path:'cms',
        module: RegionsCMSModule
      }
    ]),
    RegionsCMSModule
  ]
})
export class RegionsModule {}
