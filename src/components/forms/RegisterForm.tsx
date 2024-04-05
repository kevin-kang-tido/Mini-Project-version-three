"use client"
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Link from 'next/link';
import React from 'react';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password must match")
    .required("Confirm password is required"),
  firstName: Yup.string()
    .min(3, "First name is too short")
    .required("First name is required"),
  lastName: Yup.string()
    .min(3, "Last name is too short")
    .required("Last name is required"),
});

export default function RegisterForm() {
  const [viewPassword, setViewPassword] = React.useState(false);
  const [viewConfirmPassword, setviewConfirmPassword] = React.useState(false);

  function handleViewPassword() {
    setViewPassword(!viewPassword);
  }

  function handleViewConfirmPassword() {
    setviewConfirmPassword(!viewConfirmPassword);
  }

  return (
    <div className="flex items-center justify-center h-screen mt-12 bg-blue-700">
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
          firstName: "",
          lastName: ""
        }}
        validationSchema={validationSchema}
        // validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting ,reSetorm}) => {
          console.log(values);
          // Perform  submission logic here
        }}
      >
        {({ isSubmitting  }) => (
          <Form className="flex w-[50%] flex-col gap-4 border border-gray-300 rounded-md p-9 mt-18">
            <div>
              <Label htmlFor="email" value="Email"/>
              <Field name="email" type="email" id="email" required component={TextInput} shadow />
              <ErrorMessage name="email">
                {(msg) => <p className="text-red-600 text-sm italic">{msg}</p>}
              </ErrorMessage>
            </div>
            <div>
              <Label htmlFor="password" value="Your password" />
              <Field name="password" type="password" id="password"  component={TextInput} shadow />
              <ErrorMessage name="password">
                {(msg) => <p className="text-red-600 text-sm italic">{msg}</p>}
              </ErrorMessage>
            </div>
            <div>
              <Label htmlFor="confirmPassword" value="Repeat password" />
              <Field name="confirmPassword" type="password" id="confirmPassword"  component={TextInput} shadow />
              <ErrorMessage name="confirmPassword">
                {(msg) => <p className="text-red-600 text-sm italic">{msg}</p>}
              </ErrorMessage>
            </div>
            <div>
              <Label htmlFor="firstName" value="your firstName"/>
              <Field name="text" type="text" id="firstName"  component={TextInput} shadow />
              <ErrorMessage name="firstName">
                {(msg) => <p className="text-red-600 text-sm italic">{msg}</p>}
              </ErrorMessage>
            </div>
            <div>
              <Label htmlFor="lastName" value="your lastName"/>
              <Field name="text" type="text" id="firstName"  component={TextInput} shadow />
              <ErrorMessage name="lastName">
                {(msg) => <p className="text-red-600 text-sm italic">{msg}</p>}
              </ErrorMessage>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="agree" />
              <Label htmlFor="agree" className="flex">
                I agree with the&nbsp;
                <Link href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
                  terms and conditions
                </Link>
              </Label>
            </div>
            <Button type="submit" disabled={isSubmitting}>Register new account</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
