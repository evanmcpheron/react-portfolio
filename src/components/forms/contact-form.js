import React from "react";

export default class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      status: ""
    };
  }

  render() {
    const { status } = this.state;
    const formInput = {
      padding: "1rem",
      color: "#dfdfdf",
      marginBottom: "2rem"
    }

    const textareaStyle = {
      color: "#dfdfdf",
      width: "100%",
      marginBottom: "2rem"
    }
    return (
      <form
        onSubmit={this.submitForm}
        action="https://formspree.io/xrgqkqzb"
        method="POST"
      >
        <h1 style={{width: "100%", textAlign: "center", marginBottom: "2rem"}}>CONTACT</h1>
        <input placeholder="Name" className="select-element" type="text" name="name" style={formInput} />
        <input placeholder="Email" className="select-element" type="email" name="email" style={formInput} />
        <textarea placeholder="Message" type="text" name="message" style={textareaStyle} />
        {status === "SUCCESS" ? <p>Thanks!</p> : <button className="btn submit-btn" style={{width: "80%", marginLeft: "10%"}}>Submit</button>}
        {status === "ERROR" && <p>Ooops! There was an error.</p>}
      </form>
    );
  }

  submitForm(ev) {
    ev.preventDefault();
    const form = ev.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        this.setState({ status: "SUCCESS" });
      } else {
        this.setState({ status: "ERROR" });
      }
    };
    xhr.send(data);
  }
}