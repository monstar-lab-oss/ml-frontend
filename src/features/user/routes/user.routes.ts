import { RouteItemDef } from "@app/types/route.types";

import { UserPathsEnum } from "../constants/user.paths";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import UserListScreen from "../screens/UserListScreen/UserListScreen";

const PROFILE_SCREEN: RouteItemDef = {
  id: "profile",
  path: UserPathsEnum.PROFILE,
  navigationTitle: "profile.navigationTitle",
  component: ProfileScreen,
};

const USER_LIST_SCREEN: RouteItemDef = {
  id: "user_list",
  path: UserPathsEnum.USER_LIST,
  navigationTitle: "userList.navigationTitle",
  component: UserListScreen,
};

export const USER_ROUTES = [PROFILE_SCREEN, USER_LIST_SCREEN];
