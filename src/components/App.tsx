import React from "react";
import logo from "logo.svg";
import { useAuth0 } from "@auth0/auth0-react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { addDataToFirestore } from "utilities/Firebase";

const App = () => {
  const { logout } = useAuth0();

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <button onClick={() => logout()}>Log Out</button>
      <button onClick={() => addDataToFirestore("projects", { title: "new" })}>
        New Project
      </button>
    </div>
  );
};

export default withAuthenticationRequired(App, {
  onRedirecting: () => <div>Loading</div>,
});
