export type GenerateProjectTokenRequestDto = {
  grant_type: 'client_credentials';
  client_id: string;
  client_secret: string;
  scope: string;
};
