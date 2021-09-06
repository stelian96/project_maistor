import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { LoginToApp } from "../../global";

const SignupSchema = Yup.object().shape({
  email: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

export const Login = () => (
  <div>
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        console.log(values);
        LoginToApp(values);
      }}
    >
      {({ setFieldValue, errors, touched }) => (
        <Form>
          <label htmlFor="email">Потребител</label>
          <Field name="email" type="email" />
          <ErrorMessage name="email" />

          <label htmlFor="password">Парола</label>
          <Field name="password" type="password" />
          <ErrorMessage name="password" />

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
);
