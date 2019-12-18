import React, { Component } from "react";
import marked from "marked";

class PolicyPage extends Component {
  state = {
    markdown: ""
  };

  handleRequest = () => {
    const readmePath = require(`${this.props.page}`);

    fetch(readmePath)
      .then(response => {
        return response.text();
      })
      .then(text => {
        this.setState({
          markdown: marked(text)
        });
      });
  };

  componentDidMount() {
    this.handleRequest();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.page !== this.props.page) {
      this.handleRequest();
    }
  }

  render() {
    const { markdown } = this.state;
    return (
      <section>
        <article dangerouslySetInnerHTML={{ __html: markdown }}></article>
      </section>
    );
  }
}

export default PolicyPage;
