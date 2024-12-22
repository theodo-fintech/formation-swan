export interface GenerateUserTokenRequestDto {
  grant_type: 'authorization_code';
  client_id: string;
  client_secret: string;
  code: string;
}
