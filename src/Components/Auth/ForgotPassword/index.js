import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import { withRouter } from "react-router-dom";

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
          <div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="login-form__submit"
            >
              Send Email
            </button>
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
        sID: sID || ""
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
        .max(209909999, "Invalide ID")
    }),
    handleSubmit: (
      values,
      { resetForm, setSubmitting, setErrors, ...formikBag }
    ) => {
      console.log(values);
      resetForm();
      setSubmitting(false);
      formikBag.props.history.push("/");
    }
  })(LoginForm)
);

export default FormikEnhance;
