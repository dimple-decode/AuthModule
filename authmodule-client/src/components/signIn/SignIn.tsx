import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import user_icon from "../../assets/person.png";
import email_icon from "../../assets/email.png";
import password_icon from "../../assets/password.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./SignIn.css";

export default function SignIn() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      axios
        .post(`http://localhost:3001/auth/login`, values)
        .then((res) => {
          console.log(res);
          console.log(res.data);
          navigate("/home");
        })
        .catch((err) => {
          if (err.response.status === 401) {
            alert("Invalid Email or Password");
          }
        });
    },
  });

  const redirectSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text"> Sign In</div>
        <div className="underline"></div>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="inputs">
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
            Don't have a account?{" "}
            <span onClick={redirectSignUp}>Click Here To Sign Up</span>
          </div>
          <div className="submit-container">
            <button className="submit" type="submit">
              Sign In
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
