import React from "react";
import { Route, NavLink, withRouter } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Jokes from "./Jokes";

class App extends React.Component {
  logout = () => {
    localStorage.removeItem("token");
    this.props.history.push("/login");
  };

  render() {
    return (
      <>
        <h1>Welcome</h1>

        <ul>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/signup">Signup</NavLink>
          </li>
          <li>
            <NavLink to="/jokes">Jokes</NavLink>
          </li>
          <li>
            <button onClick={this.logout}>Logout</button>
          </li>
        </ul>

        <main>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/jokes" component={Jokes} />
        </main>
      </>
    );
  }
}

export default withRouter(App);