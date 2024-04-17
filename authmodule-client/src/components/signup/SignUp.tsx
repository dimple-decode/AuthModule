import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import user_icon from "../../assets/person.png";
import email_icon from "../../assets/email.png";
import password_icon from "../../assets/password.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./SignUp.css";

export default function SignUp() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
          "Password should be minimum 8 characters and must contain 1 letter, number and special characters"
        ),
    }),
    onSubmit: (values) => {
      axios
        .post(`http://localhost:3001/auth/signUp`, values)
        .then((res) => {
          console.log(res);
          console.log(res.data);
          navigate("/home");
        })
        .catch((err) => {
          if (err.response.status === 500) {
            alert("Email already exists");
          }
        });
    },
  });

  const redirectSignIn = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text"> Sign Up</div>
        <div className="underline"></div>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              type="text"
              placeholder="Name"
              id="name"
              {...formik.getFieldProps("name")}
            />
          </div>

          {formik.touched.name && formik.errors.name && (
            <div className="error">{formik.errors.name}</div>
          )}

          <div className="input">
            <img src={email_icon} alt="" />
            <input
              type="email"
              placeholder="Email"
              id="email"
              {...formik.getFieldProps("email")}
            />
          </div>
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}

          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              placeholder="Password"
              id="password"
              {...formik.getFieldProps("password")}
            />
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
          <div className="register">
            Already have a account?{" "}
            <span onClick={redirectSignIn}>Click Here To Sign In</span>
          </div>
          <div className="submit-container">
            <button className="submit" type="submit">
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
