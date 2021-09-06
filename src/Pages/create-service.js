import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";
import { sendServiceData } from "../global";

//Components
import { Container } from "../global/globalStyles";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(2, "Too Short!")
    .max(1000, "Too Long!")
    .required("Required"),
  price: Yup.number("Invalid price"),
});

const CreateService = () => {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  const images = files.map((file) => (
    <div key={file.name}>
      <div>
        <img src={file.preview} style={{ width: "200px" }} alt="preview" />
      </div>
    </div>
  ));

  return (
    <Container>
      <Formik
        initialValues={{
          name: "",
          description: "",
          price: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          console.log(values, files);
          sendServiceData(values, files);
        }}
      >
        {({ setFieldValue, errors, touched }) => (
          <Form>
            <label htmlFor="name">Име</label>
            <Field name="name" />
            <ErrorMessage name="name" />

            <label htmlFor="description">Описание</label>
            <Field name="description" type="text" />
            <ErrorMessage name="description" />

            <label htmlFor="price">Стартова цена</label>
            <Field name="price" type="text" />
            <ErrorMessage name="price" />

            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drop files here</p>
            </div>
            <div>{images}</div>

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default CreateService;
