import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GenerateProjectTokenRequestDto } from './dto/generate-project-token-request.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class SwanAuthService {
  private readonly swanTokenEndpoint: string;
  private readonly swanClientId: string;
  private readonly swanClientSecret: string;
  private readonly swanOnboardingCallbackUrl: string;
  private readonly logger = new Logger(SwanAuthService.name);

  constructor(
    readonly httpService: HttpService,
    readonly configService: ConfigService,
  ) {
    this.swanTokenEndpoint = this.configService.get<string>(
      'SWAN_TOKEN_ENDPOINT',
    );
    this.swanClientId = this.configService.get<string>('SWAN_CLIENT_ID');
    this.swanClientSecret =
      this.configService.get<string>('SWAN_CLIENT_SECRET');
    this.swanOnboardingCallbackUrl = this.configService.get<string>(
      'SWAN_ONBOARDING_CALLBACK_URL',
    );
  }

  async retrieveProjectToken() {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const body: GenerateProjectTokenRequestDto = {
      grant_type: 'client_credentials',
      client_id: this.swanClientId,
      client_secret: this.swanClientSecret,
      scope: 'openid offline',
    };

    try {
      const response = await firstValueFrom(
        this.httpService
          .post(this.swanTokenEndpoint, body, {
            headers,
          })
          .pipe(
            catchError((error) => {
              this.logger.error(`[retrieveProjectToken] Error: ${error}`);
              throw error;
            }),
          ),
      );
      return response.data.access_token;
    } catch (error) {
      this.logger.error(`[retrieveProjectToken] Error: ${error}`);
      throw error;
    }
  }

  async retrieveUserToken(code: string) {
    this.logger.log(`[retrieveUserToken] with code: ${code}`);
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const body = new URLSearchParams({
      code,
      grant_type: 'authorization_code',
      client_id: this.swanClientId,
      redirect_uri: this.swanOnboardingCallbackUrl,
      client_secret: this.swanClientSecret,
    });

    this.logger.log(`[retrieveUserToken] Request body: ${body.toString()}`);

    try {
      const response = await firstValueFrom(
        this.httpService
          .post(this.swanTokenEndpoint, body, {
            headers,
          })
          .pipe(
            catchError((error) => {
              this.logger.error(`[retrieveUserToken] Error: ${error}`);
              throw error;
            }),
          ),
      );
      return response.data.access_token;
    } catch (error) {
      this.logger.error(`[retrieveUserToken] Error: ${error}`);
      throw error;
    }
  }
}
