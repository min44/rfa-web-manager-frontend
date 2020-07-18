import React from "react";
import { MobXProviderContext } from "mobx-react";
import { IStores } from "../react-app-env";

export const useStores = (): IStores => React.useContext(MobXProviderContext) as IStores;
