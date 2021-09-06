import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registerToApp } from "../../global";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
  changepassword: Yup.string().when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref("password")],
      "Паролите трябва да са еднакви"
    ),
  }),
});

export const Register = () => {
  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          changepassword: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          delete values.changepassword;
          console.log(values);
          registerToApp(values);
        }}
      >
        {({ setFieldValue, errors, touched }) => (
          <Form>
            <label htmlFor="name">Име</label>
            <Field name="name" />
            <ErrorMessage name="name" />

            <label htmlFor="email">Имейл</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" />

            <label htmlFor="password">Парола</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" />

            <label htmlFor="changepassword">Потвърдете паролата</label>
            <Field name="changepassword" type="password" />
            <ErrorMessage name="changepassword" />

            <label htmlFor="avatar">Аватар</label>
            <input
              type="file"
              name="avatar"
              onChange={(event) => {
                setFieldValue("file", event.currentTarget.files[0]);
              }}
              alt="image"
            />

            <ErrorMessage name="avatar" />

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
