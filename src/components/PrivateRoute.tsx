import React, { ComponentType } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useStores } from '../hooks/stores.hook';


interface IPrivateRouteProps {
  component: ComponentType<any>;
  path: string;
  exact?: boolean;
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({
  path,
  component: Node,
  exact,
}: IPrivateRouteProps) => {
  const { authStore } = useStores();

  return (
    <Route
      path={path}
      exact={exact}
      render={(props: any) => authStore.isAuthenticated
        ? (<Node {...props}/>)
        : (<Redirect to={'/start'}/>)
      }
    />
  );
};

export default observer(PrivateRoute);
