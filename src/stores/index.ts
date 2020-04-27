import { IStores } from "../react-app-env";
import authStore from "./authStore";
import commonStore from "./commonStore";
import userStore from "./userStore";
import sessionsStore from "./sessionsStore";
import forgeStore from "./forgeStore";
import adminStore from "./adminStore";

export const stores: IStores = {
  authStore,
  commonStore,
  userStore,
  sessionsStore,
  forgeStore,
  adminStore,
};
