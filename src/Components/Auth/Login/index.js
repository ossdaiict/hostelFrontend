import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../../Store/Actions/authAction";

import "./style.scss";

const LoginForm = ({ errors, touched, handleSubmit, isSubmitting }) => {
  return (
    <div className="login-form__container">
      <div className="form">
        <Form onSubmit={handleSubmit} className="login-form">
          <div className="form__wrapper">
            <label htmlFor="studentID" className="form__label">
              Student ID
            </label>
            <Field
              type="id"
              name="sID"
              placeholder="Student ID"
              className="form__input"
            />
            {touched.sID && errors.sID && (
              <div className="form__error">{errors.sID}</div>
            )}
          </div>
          <div className="form__wrapper">
            <label htmlFor="studentID" className="form__label">
              Password
            </label>
            <Field
              type="password"
              name="password"
              placeholder="Password"
              className="form__input"
            />
            {touched.password && errors.password && (
              <div className="form__error">{errors.password}</div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%"
            }}
          >
            <button
              disabled={isSubmitting}
              type="submit"
              className="login-form__submit"
            >
              Log in
            </button>
            <NavLink
              to="/forgot-password"
              style={{ textDecoration: "none", color: "black" }}
            >
              <span
                style={{
                  fontSize: "1.35rem",
                  marginRight: "2rem"
                }}
              >
                Forget Password ?
              </span>
            </NavLink>
          </div>
          <div className="form__text">
            <NavLink to="/register" className="form__text--link">
              Register New Account ?
            </NavLink>
          </div>
        </Form>
      </div>
    </div>
  );
};

const FormikEnhance = withRouter(
  withFormik({
    mapPropsToValues: ({ sID, password }) => {
      return {
        sID: sID || "",
        password: password || ""
      };
    },
    validationSchema: Yup.object().shape({
      sID: Yup.number("Student ID must be number")
        .required("Student ID is required")
        .positive("ID must be positive")
        .integer("ID must be integer")
        .test("length", "Student ID must be exactly 9 digits", val => {
          if (val) {
            return val.toString().length === 9;
          }
        })
        .min(200000000, "Invalide ID")
        .max(209909999, "Invalide ID"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be 6 charactures long")
    }),
    handleSubmit: (
      values,
      { resetForm, setSubmitting, setErrors, ...formikBag }
    ) => {
      // let location = formikBag.props.location;
      let { from } = formikBag.props.location.state || {
        from: { pathname: "/" }
      };
      formikBag.props.loginUser(values, formikBag.props.history, from);
      resetForm();
      setSubmitting(false);
    }
  })(LoginForm)
);

export default connect(null, { loginUser })(FormikEnhance);
