import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as DappLib from '@decentology/dappstarter-dapplib';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  @Get('isContractRunStateActive')
  async isContractRunStateActive(): Promise<string> {
    return await DappLib["isContractRunStateActive"].call(null, {});
  }
}
