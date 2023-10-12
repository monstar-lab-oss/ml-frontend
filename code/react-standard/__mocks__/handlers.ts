import { user } from "./api/user";
import { employee } from "./api/employee";
import { login } from "./api/login";

const handlers = [...login, ...user, ...employee];

export default handlers;
