import React from "react";
import { Route, NavLink, withRouter } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Jokes from "./Jokes";
import "./index.css";


class App extends React.Component {
  logout = () => {
    localStorage.removeItem("token");
    this.props.history.push("/login");
  };

  render() {
    return (
      <>
        <div className="navBar">
          <a>
            <NavLink to="/login">Login</NavLink>
          </a>
          <a>
            <NavLink to="/signup">Signup</NavLink>
          </a>
          <a>
            <NavLink to="/jokes">Jokes</NavLink>
          </a>
          <a>
            <button className="logoutBtn" onClick={this.logout}>Logout</button>
          </a>
        </div>

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
