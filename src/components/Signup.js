import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as Yup from "yup";



const getDatafromLS=()=>{
  const data = localStorage.getItem('records');
  if(data){
    return JSON.parse(data);
  }
  else{
    return []
  }
}
export const Signup = () => {
  const [records, setRecords] = useState(getDatafromLS());

  const validate = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirm password is required"),
  });


  useEffect(() => {
    console.log(records);
    if (records.length) {
      localStorage.setItem("records", JSON.stringify(records));
    }
  }, [records]);
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        // alert(JSON.stringify(values, null, 2));
        console.log(values);

        const newRecord = {
          ...values,
          // id: new Date().getTime().toString(),
        };

        // console.log(records);
        setRecords([...records, newRecord]);
        // localStorage.setItem("records", JSON.stringify(records));
      }}
    >
      {(formik) => (
        <div>
          <h1 className="my-4 font-weight-bold .display-4">Sign Up</h1>
          <Form>
            <TextField label="First Name" name="firstName" type="text" />
            <TextField label="last Name" name="lastName" type="text" />
            <TextField label="Email" name="email" type="email" />
            <TextField label="password" name="password" type="password" />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
            />
            <button className="btn btn-dark mt-3" type="submit">
              Register
            </button>
            <button className="btn btn-danger mt-3 ml-3" type="reset">
              Reset
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};
