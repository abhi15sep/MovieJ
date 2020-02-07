import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import "../style/Login.css";
import * as actions from "../actions";
import * as services from "../services/posts";
class Login extends Component {
  handleLogin = e => {
    e.preventDefault();
    const id = document.querySelector("#id"),
      pw = document.querySelector("#password");
    return this.props.loginRequest(id.value, pw.value).then(() => {
      const { status, _id } = this.props;
      if (status === "success") {
        let loginData = {
          loggedIn: true,
          name: id.value,
          _id
        };
        localStorage.loggedIn = JSON.stringify(loginData);
        window.location.href = "/";
        return true;
      } else {
        alert("Incorrect ID or Password");
        return false;
      }
    });
  };
  render() {
    return (
      <div>
        <Header></Header>
        <div className="form_container">
          <h2>Login </h2>
          <form id="form" method="post" onSubmit={this.handleLogin}>
            <div>
              <input
                id="id"
                type="text"
                name="email"
                placeholder="Email"
              ></input>
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
              ></input>
            </div>
            <div>
              <input type="submit" value="Login"></input>
              <button>
                <Link to={"/signup"}>Sign Up</Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    lan: state.movielist.lan,
    status: state.login.login.status,
    _id: state.login.login._id,
    loggedIn: state.login.login.isLoggedIn
  };
};
const mapDispatchToProps = dispatch => {
  return {
    loginRequest: (name, pw) => {
      dispatch(actions.login());
      return services.login(name, pw).then(response => {
        //alert(JSON.stringify(response.data.uid));
        if (response.data.success === 1)
          dispatch(actions.loginSuccess(response.data.uid, name));
        else dispatch(actions.loginFailure());
      });
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
