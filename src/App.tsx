import React from "react";
import { observer } from "mobx-react";
import { Switch, Route } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core";
import { responsiveFontSizes } from "@material-ui/core/styles";
import PrivateRoute from "./components/PrivateRoute";
import { ForgeDataManagementPage } from "./pages/ForgeDataManagementPage";
import { ForgeDesignAutomationPage } from "./pages/ForgeDesignAutomationPage";
import { LoginPage } from "./pages/LoginPage";
import { StartPage } from "./pages/StartPage";
import { SignUpPage } from "./pages/SignUpPage";
import { UploadPage } from "./pages/UploadPage";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { useStores } from "./hooks/strores.hook";
import { AdminPage } from "./pages/AdminPage";
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
      {isAuthenticated ? <ButtonAppBar /> : <div/> }
      <Switch>  
        <PrivateRoute path="/upload" component={ UploadPage } />
        <PrivateRoute path="/profile" component={ ProfilePage } />
        <PrivateRoute path="/admin" component={ AdminPage } />
        <PrivateRoute path="/datamanagement" component={ ForgeDataManagementPage } />
        <PrivateRoute path="/designautomation" component={ ForgeDesignAutomationPage } />
        <Route path="/start" component={ StartPage } />
        <Route path="/auth/login" component={ LoginPage } />
        <Route path="/signup" component={ SignUpPage } />
        <PrivateRoute path="/" component={ HomePage } />
      </Switch>
    </MuiThemeProvider>
  ) : (
    <></>
  );
});
