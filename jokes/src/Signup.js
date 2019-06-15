import React from "react";
import { withRouter } from "react-router-dom";
import api from "./helpers/api";

class Signup extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleSubmit = async e => {
    e.preventDefault();
    try {
      const { username, password } = this.state;

      const result = await api.post("/register", {
        username,
        password
      });

      localStorage.setItem("token", result.data.token);
      this.props.history.push("/jokes");
    } catch (err) {
      console.error(err);
    }
  };

  handlChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <>
        <h3>Sign Up</h3>

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="username"
            onChange={this.handleChange}
            value={this.state.username}
          />
          <input
            type="text"
            name="password"
            placeholder="password"
            onChange={this.handleChange}
            value={this.state.password}
          />
          <button type="submit">Sign Up</button>
        </form>
      </>
    );
  }
}

export default withRouter(Signup);
