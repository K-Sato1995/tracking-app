import React from "react";
import logo from "logo.svg";
import "components/App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { withAuthenticationRequired } from "@auth0/auth0-react";

const App = () => {
  const { logout } = useAuth0();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={() => logout()}>Log Out</button>
      </header>
    </div>
  );
};

export default withAuthenticationRequired(App, {
  onRedirecting: () => <div>Loading</div>,
});
