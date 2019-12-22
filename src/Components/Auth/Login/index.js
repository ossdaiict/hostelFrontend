import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

import "./style.scss";

const LoginForm = ({ errors, touched, handleSubmit, isSubmitting }) => (
  <div className="form">
    <Form onSubmit={handleSubmit} className="login-form">
      <div className="form__wrapper">
        <label htmlFor="studentID" className="form__label">
          Student ID
        </label>
        <Field
          type="id"
          name="studentId"
          placeholder="Student ID"
          className="login-form__input"
        />
        {touched.studentId && errors.studentId && (
          <div className="form__error">{errors.studentId}</div>
        )}
        {console.log(errors)}
      </div>
      <div className="form__wrapper">
        <label htmlFor="studentID" className="form__label">
          Password
        </label>
        <Field
          type="password"
          name="password"
          placeholder="Password"
          className="login-form__input"
        />
        {touched.password && errors.password && (
          <div className="form__error">{errors.password}</div>
        )}
      </div>
      <button
        disabled={isSubmitting}
        type="submit"
        className="login-form__submit"
      >
        Submit
      </button>
    </Form>
  </div>
);

const FormikLogin = withFormik({
  mapPropsToValues: ({ studentId, password }) => {
    return {
      studentId: studentId || "",
      password: password || ""
    };
  },
  validationSchema: Yup.object().shape({
    studentId: Yup.number("Student ID must be number")
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
  handleSubmit: (values, { resetForm, setSubmitting, setErrors }) => {
    setTimeout(() => {
      if (values.email === "parth@gmail.com") {
        setErrors({ email: "This is already taken" });
      } else {
        console.log(values);
        resetForm();
      }
      setSubmitting(false);
    }, 2000);
  }
})(LoginForm);

export default FormikLogin;
