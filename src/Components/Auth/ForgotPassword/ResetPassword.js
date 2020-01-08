import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { SERVER_URL } from "../../../Utils/constants";

const ResetPasswordLink = ({ errors, touched, handleSubmit, isSubmitting }) => {
  return (
    <div className="login-form__container">
      <div className="form">
        <Form onSubmit={handleSubmit} className="login-form">
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
          <div className="form__side-wrapper">
            <div className="form__wrapper">
              <label htmlFor="passwordConfirm" className="form__label">
                Confirm Password
              </label>
              <Field
                type="password"
                name="passwordConfirm"
                placeholder="Confirm Password"
                className="form__input"
              />
              {touched.passwordConfirm && errors.passwordConfirm && (
                <div className="form__error">{errors.passwordConfirm}</div>
              )}
            </div>
          </div>
          <div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="login-form__submit"
            >
              Reset Password
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

const FormikEnhance = withRouter(
  withFormik({
    mapPropsToValues: ({ password, passwordConfirm }) => {
      return {
        password: password || "",
        passwordConfirm: passwordConfirm || ""
      };
    },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be 6 charactures long"),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref("password"), "Password doesn't match."])
        .required("Password confirm is required")
    }),
    handleSubmit: (
      values,
      { resetForm, setSubmitting, setErrors, ...formikBag }
    ) => {
      const { password } = values;
      axios
        .post(
          `${SERVER_URL}/auth/reset-password/${formikBag.props.match.params.token}`,
          { password }
        )
        .then(res => {
          toast.success(`${res.data.message}`);
          resetForm();
          setSubmitting(false);
        })
        .catch(err => {
          if (typeof err.response !== undefined) {
            toast.error(`Unable to reset a password!..`);
          } else {
            toast.error(`${err.response.data.message}`);
          }
        });

      formikBag.props.history.push("/");
    }
  })(ResetPasswordLink)
);

export default FormikEnhance;
