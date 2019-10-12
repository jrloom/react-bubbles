import React, { useState } from "react";
import axios from "axios";

const Login = props => {
  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/login`, user)
      .then(res => {
        setUser({
          username: "",
          password: ""
        });
        localStorage.setItem("token", res.data.payload);
        props.history.push("/bubbles");
      })
      .catch(err => console.error);
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" autoComplete="off" value={user.username} onChange={handleChange} />
        <input type="password" name="password" autoComplete="off" value={user.password} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Login;
