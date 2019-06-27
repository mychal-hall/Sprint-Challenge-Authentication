import React from "react";
import api from "./helpers/api";
import withAuth from "./helpers/auth";
import "./index.css";


class Jokes extends React.Component {
  state = {
    jokes: []
  };

  async componentDidMount() {
    try {
      const result = await api.get("/jokes");
      this.setState({
        jokes: result.data
      });
      console.log(this.state)
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <>
        <h2>Jokes</h2>

        <ul>
          {this.state.jokes.map((joke, i) => {
            return <li key={i}>{joke.joke}</li>;
          })}
        </ul>
      </>
    );
  }
}

export default withAuth(Jokes);
