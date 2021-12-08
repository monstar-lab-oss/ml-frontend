import { RouteItemDef } from "@app/types/route.types";

import { UserPathsEnum } from "../constants/user.paths";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";

const PROFILE_SCREEN: RouteItemDef = {
  id: "profile",
  path: UserPathsEnum.PROFILE,
  navigationTitle: "profile.navigationTitle",
  component: ProfileScreen,
};

export const USER_ROUTES = [PROFILE_SCREEN];
