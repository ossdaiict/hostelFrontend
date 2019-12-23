import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

const AddSnail = ({ errors, touched, handleSubmit, isSubmitting }) => (
  <div className="form">
    <Form onSubmit={handleSubmit} className="login-form">
      <h1 style={{ textAlign: "center", margin: "2.5rem" }}>Add New Snail</h1>
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
        <div className="form__wrapper">
          <label htmlFor="studentName" className="form__label">
            Student Name
          </label>
          <Field
            type="text"
            name="name"
            placeholder="Student Name"
            className="form__input"
          />
          {touched.name && errors.name && (
            <div className="form__error">{errors.name}</div>
          )}
        </div>
      </div>
      <div className="form__side-wrapper">
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
        <div className="form__wrapper">
          <label htmlFor="cdate" className="form__label">
            Date
          </label>
          <Field type="date" name="cdate" className="form__input" />
          {touched.cdate && errors.cdate && (
            <div className="form__error">{errors.cdate}</div>
          )}
        </div>
      </div>
      <div className="form__side-wrapper">
        <div className="form__wrapper">
          <label htmlFor="service" className="form__label">
            Courier Service
          </label>
          <Field
            type="text"
            name="service"
            placeholder="Courier Service"
            className="form__input"
          />
          {touched.service && errors.service && (
            <div className="form__error">{errors.service}</div>
          )}
        </div>
        <div className="form__wrapper">
          <label htmlFor="cID" className="form__label">
            Courier ID
          </label>
          <Field
            type="text"
            name="cID"
            placeholder="Courier ID"
            className="form__input"
          />
          {touched.cID && errors.cID && (
            <div className="form__error">{errors.cID}</div>
          )}
        </div>
      </div>
      <div className="form__side-wrapper">
        <div className="form__wrapper">
          <label htmlFor="givenBy" className="form__label">
            Given By
          </label>
          <Field
            type="text"
            name="givenBy"
            placeholder="Given By"
            className="form__input"
          />
          {touched.givenBy && errors.givenBy && (
            <div className="form__error">{errors.givenBy}</div>
          )}
        </div>
        <div className="form__wrapper">
          <label htmlFor="type" className="form__label">
            Type
          </label>
          <Field
            type="text"
            name="type"
            placeholder="Type"
            className="form__input"
          />
          {touched.type && errors.type && (
            <div className="form__error">{errors.type}</div>
          )}
        </div>
      </div>
      <button
        disabled={isSubmitting}
        type="submit"
        className="login-form__submit"
      >
        Add New Snail
      </button>
    </Form>
  </div>
);

const FormikEnhance = withFormik({
  mapPropsToValues: ({
    studentId,
    name,
    room,
    cdate,
    service,
    cID,
    givenBy,
    type
  }) => {
    return {
      studentId: studentId || "",
      name: name || "",
      room: room || "",
      cdate: cdate || "",
      service: service || "",
      cID: cID || "",
      givenBy: givenBy || "",
      type: type || ""
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
    name: Yup.string().required("Student name is required"),
    room: Yup.string()
      .required("Room No. is required")
      .uppercase(),
    cdate: Yup.string().required("Date is required"),
    service: Yup.string(),
    cID: Yup.string().required("Courier ID is required"),
    givenBy: Yup.string(),
    type: Yup.string()
  }),
  handleSubmit: (values, { resetForm, setSubmitting, setErrors }) => {
    setTimeout(() => {
      console.log(values);
      resetForm();
      setSubmitting(false);
    }, 2000);
  }
})(AddSnail);

export default FormikEnhance;
