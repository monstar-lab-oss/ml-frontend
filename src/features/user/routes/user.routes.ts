import { RouteItemDef } from "@app/types/route.types";

import { UserPathsEnum } from "../constants/user.paths";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import UsersScreen from "../screens/UsersScreen/UsersScreen";

const USERS_SCREEN: RouteItemDef = {
  id: "users",
  path: UserPathsEnum.USERS,
  navigationTitle: "users.navigationTitle",
  component: UsersScreen,
};

const PROFILE_SCREEN: RouteItemDef = {
  id: "profile",
  path: UserPathsEnum.PROFILE,
  navigationTitle: "profile.navigationTitle",
  component: ProfileScreen,
};

export const USER_ROUTES = [USERS_SCREEN, PROFILE_SCREEN];
