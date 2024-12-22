export interface GenerateUserTokenResponseDto {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: 'bearer';
  id_token: string;
  refresh_token: string;
}
