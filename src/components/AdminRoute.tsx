import React, { ComponentType } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useStores } from '../hooks/stores.hook';


interface IAdminRouteProps {
  component: ComponentType<any>;
  path: string;
  exact?: boolean;
}

const AdminRoute: React.FC<IAdminRouteProps> = ({
  path,
  component: Node,
  exact,
}: IAdminRouteProps) => {
  const { userStore } = useStores();

  return (
    <Route
      path={path}
      exact={exact}
      render={(props: any) => userStore.isAdmin
        ? (<Node {...props}/>)
        : (<Redirect to={'/admin'}/>)
      }
    />
  );
};

export default observer(AdminRoute);
