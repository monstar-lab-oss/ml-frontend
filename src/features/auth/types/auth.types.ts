/**
 * For redux slice and helper function
 */
export interface InitialStateDef {
  accessToken: string | null;
  error: boolean;
  loading: boolean;
}

/**
 * For Demo - regres - api, only token is returned from api,
 * but expiresIn is added in code
 */
export type LoginResponseDef = {
  token: string;
  expiresIn?: string;
};

export type LoginRequestDef = {
  email: string;
  password: string;
};
