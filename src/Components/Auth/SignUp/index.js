import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

const SignUp = ({ errors, touched, handleSubmit, isSubmitting, values }) => (
  <div className="form" style={{ height: "88vh", overflowY: "scroll" }}>
    <Form onSubmit={handleSubmit} className="login-form">
      <h1 style={{ textAlign: "center", margin: "3.5rem", fontSize: "3rem" }}>
        Register Account
      </h1>
      <div className="form__side-wrapper">
        <div className="form__wrapper">
          <label htmlFor="studentID" className="form__label">
            Student ID
          </label>
          <Field
            type="id"
            name="studentId"
            placeholder="Student ID"
            className="form__input"
          />
          {touched.studentId && errors.studentId && (
            <div className="form__error">{errors.studentId}</div>
          )}
        </div>
      </div>

      <div className="form__side-wrapper">
        <div className="form__wrapper">
          <label htmlFor="firstName" className="form__label">
            First Name
          </label>
          <Field
            type="text"
            name="fname"
            placeholder="First Name"
            className="form__input"
          />
          {touched.fname && errors.fname && (
            <div className="form__error">{errors.fname}</div>
          )}
        </div>
        <div className="form__wrapper">
          <label htmlFor="lastName" className="form__label">
            Last Name
          </label>
          <Field
            type="text"
            name="lname"
            placeholder="Last Name"
            className="form__input"
          />
          {touched.lname && errors.lname && (
            <div className="form__error">{errors.lname}</div>
          )}
        </div>
      </div>

      <div className="form__side-wrapper">
        <div className="form__wrapper">
          <label htmlFor="wing" className="form__label">
            Wing
          </label>
          <Field
            name="wing"
            as="select"
            className="form__input"
            value={values.wing}
          >
            <option value="" label="Select a  Wing" />
            <option value="A" label="A" />
            <option value="B" label="B" />
            <option value="C" label="C" />
            <option value="D" label="D" />
            <option value="E" label="E" />
            <option value="F" label="F" />
            <option value="G" label="G" />
            <option value="H" label="H" />
            <option value="I" label="I" />
            <option value="J" label="J" />
            <option value="D" label="D" />
            <option value="E" label="E" />
            <option value="F" label="F" />
          </Field>
          {errors.wing && touched.wing && (
            <div className="form__error">{errors.wing}</div>
          )}
        </div>
        <div className="form__wrapper">
          <label htmlFor="roomNo" className="form__label">
            Room No.
          </label>
          <Field
            type="text"
            name="room"
            placeholder="Room No."
            className="form__input"
          />
          {touched.room && errors.room && (
            <div className="form__error">{errors.room}</div>
          )}
        </div>
      </div>

      <div className="form__side-wrapper">
        <div className="form__wrapper">
          <label htmlFor="password" className="form__label">
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
      </div>

      <button
        disabled={isSubmitting}
        type="submit"
        className="login-form__submit"
      >
        Create Account
      </button>
    </Form>
  </div>
);

const FormikEnhance = withFormik({
  mapPropsToValues: ({ studentId, fname, lname, room, wing, password }) => {
    return {
      studentId: studentId || "",
      fname: fname || "",
      lname: lname || "",
      wing: wing || "",
      room: room || "",
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
    fname: Yup.string()
      .required("First name is required")
      .max(20),
    lname: Yup.string()
      .required("Last name is required")
      .max(20),
    room: Yup.number("Room No must be number")
      .required("Room No. is required")
      .min(100)
      .max(999),
    wing: Yup.string().required("Wing is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be 6 digit long")
  }),
  handleSubmit: (values, { resetForm, setSubmitting, setErrors }) => {
    setTimeout(() => {
      console.log(values);
      resetForm();
      setSubmitting(false);
    }, 2000);
  }
})(SignUp);

export default FormikEnhance;
