export interface Authentication {
  auth: (authentication: AuthenticationParams) => Promise<string>
}

export type AuthenticationParams = {
  email: string
  password: string
}
