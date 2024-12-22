import { Controller, Get, Query } from '@nestjs/common';

@Controller('swan')
export class SwanController {
  @Get('redirect/consent')
  handleConsentRedirect(
    @Query('consentId') consentId: string,
    @Query('env') env: string,
    @Query('resourceId') resourceId: string,
    @Query('status') status: string,
  ) {
    console.log('Consent ID:', consentId);
    console.log('Environment:', env);
    console.log('Resource ID:', resourceId);
    console.log('Status:', status);
    return 'Handle consent redirection ...';
  }
}
