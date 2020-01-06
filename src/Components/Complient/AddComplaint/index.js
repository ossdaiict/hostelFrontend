import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { toast } from "react-toastify";

// import { registerUser } from "../../../Store/Actions/authAction";

const SignUp = ({ errors, touched, handleSubmit, isSubmitting, values }) => (
  <div className="form" style={{ height: "88vh", overflowY: "scroll" }}>
    <Form onSubmit={handleSubmit} className="login-form">
      <h1 style={{ textAlign: "center", margin: "3.5rem", fontSize: "3rem" }}>
        Register Complaint
      </h1>

      <div className="form__side-wrapper">
        <div className="form__wrapper">
          <label htmlFor="type" className="form__label">
            Type of Complaint
          </label>
          {false ? (
            <Field
              name="type"
              as="select"
              className="form__input"
              value={values.type}
            >
              <option value="" label="Select a complaint type" />
              <option value="electric" label="Electric" />
              <option value="carpenter" label="Carpenter" />
            </Field>
          ) : (
            <Field
              name="type"
              as="select"
              className="form__input"
              value={values.type}
            >
              <option value="" label="Select a complaint type" />
              <option value="electric" label="Electric" />
              <option value="carpenter" label="Carpenter" />
              <option value="electric" label="Electric" />
              <option value="carpenter" label="Carpenter" />
              <option value="electric" label="Electric" />
              <option value="carpenter" label="Carpenter" />
              <option value="electric" label="Electric" />
              <option value="carpenter" label="Carpenter" />
            </Field>
          )}
          {errors.type && touched.type && (
            <div className="form__error">{errors.type}</div>
          )}
        </div>
      </div>

      <div className="form__side-wrapper">
        <div className="form__wrapper">
          <label htmlFor="complaint" className="form__label">
            Complaint
          </label>
          <Field
            name="complaint"
            as="textarea"
            className="form__input"
            placeholder="Description about complaint"
            style={{ height: "12rem", resize: "none" }}
          />
          {touched.complaint && errors.complaint && (
            <div className="form__error">{errors.complaint}</div>
          )}
        </div>
      </div>
      <button
        disabled={isSubmitting}
        type="submit"
        className="login-form__submit"
      >
        Register Complaint
      </button>
    </Form>
  </div>
);

const FormikEnhance = withRouter(
  withFormik({
    mapPropsToValues: ({ type, complaint }) => {
      return {
        type: type || "",
        complaint: complaint || ""
      };
    },
    validationSchema: Yup.object().shape({
      type: Yup.string().required("Type must be required"),
      complaint: Yup.string()
        .required("Complaint must be required")
        .max(150, "Complint must be less than 150 charactures")
    }),
    handleSubmit: (
      values,
      { resetForm, setSubmitting, setErrors, ...formikBag }
    ) => {
      //   console.log(values, formikBag.props.user);
      const { sID, name, wing, room } = formikBag.props.user;
      const { type, complaint } = values;
      axios
        .post("http://localhost:5000/complaint/add", {
          sID,
          name,
          wing,
          room,
          type,
          complaint
        })
        .then(res => {
          resetForm();
          setSubmitting(false);
          toast.info(`${res.data.message}`);
        })
        .catch(err => {
          if (typeof err.response !== undefined) {
            toast.error(`Unable to add the complaint!..`);
          } else {
            toast.error(`${err.response.data.message}`);
          }
        });
    }
  })(SignUp)
);

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(FormikEnhance);
