export type UserDef = {
  email: string;
  name: string;
  avatar: string;
};

/**
 * For Demo - regres - api
 */
/* eslint-disable camelcase */
export type UserResponseDef = {
  data: {
    id: number;
    first_name: string;
    last_name: string;
    avatar: string;
    email: string;
  };
};
