export type UserDef = {
  email: string;
  name: string;
  avatar: string;
};

/* eslint-disable camelcase */
export type UserResponseData = {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
  email: string;
};

/**
 * For Demo - regres - api
 */
export type UserResponseDef = {
  data: UserResponseData;
};

export interface User extends UserResponseData {
  name: string;
}
