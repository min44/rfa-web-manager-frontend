import React from "react";
import { observer } from "mobx-react";
import { Switch, Route } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core";
import { responsiveFontSizes } from "@material-ui/core/styles";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import { StoragePage } from "./pages/StoragePage";
import { ParameterManagementPage } from "./pages/ParameterManagementPage";
import { LoginPage } from "./pages/LoginPage";
import { StartPage } from "./pages/StartPage";
import { SignUpPage } from "./pages/SignUpPage";
import { UploadPage } from "./pages/UploadPage";
import { ProfilePage } from "./pages/ProfilePage";
import { useStores } from "./hooks/strores.hook";
import { AdministratorPage } from "./pages/AdminPage";
import { useTheme } from "./theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ButtonAppBar } from "./components/AppBar";

export const App: React.FC = observer(() => {
  const { commonStore, authStore } = useStores();
  let theme = responsiveFontSizes(useTheme());

  const { appLoaded } = commonStore;
  const { isAuthenticated } = authStore;

  return appLoaded ? (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {isAuthenticated && <ButtonAppBar />}
      <Switch>
        <PrivateRoute path="/upload" component={UploadPage} />
        <PrivateRoute path="/profile" component={ProfilePage} />
        <PrivateRoute path="/storage" component={StoragePage} />
        <PrivateRoute path="/parametermanagement" component={ParameterManagementPage} />
        <Route path="/start" component={StartPage} />
        <Route path="/auth/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
        <AdminRoute path="/admin" component={AdministratorPage} />
        <PrivateRoute path="/" component={StoragePage} />
      </Switch>
    </MuiThemeProvider>
  ) : (
    <div />
  );
});
