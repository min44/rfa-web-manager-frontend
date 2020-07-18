import { observer } from "mobx-react";
import React from "react";
import { useStores } from "../hooks/stores.hook";

interface IParameter {
  id: number;
  name: string;
  isShared: boolean;
  storageType: string;
}

interface IFamily {
  objectKey: string;
  parameters: IParameter[];
}

type IFamilies = IFamily[];

export const SearchResults: React.FC = observer(() => {
  const { forgeStore } = useStores();

  return forgeStore.extractedParametersFilesState.case({
    pending: (staleValue) => {
      return staleValue || "searching";
    },
    fulfilled: (value: any) => {
      return value;
    },
    rejected: (error) => {
      return "Oops: " + error;
    },
  });
});
