export interface Authentication {
  auth: (login: AuthenticationParams) => Promise<AuthenticationResult>
}

export interface AuthenticationParams {
  name: string
  password: string
}

export interface AuthenticationResult {
  accessToken: string
  name: string
}
