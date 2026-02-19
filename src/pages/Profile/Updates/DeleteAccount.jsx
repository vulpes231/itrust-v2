import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, FormFeedback, Input, Label, Row } from "reactstrap";
import ErrorToast from "../../../components/Common/ErrorToast";
import * as Yup from "yup";

const DeleteAccount = ({ onClose }) => {
  const [error, setError] = useState("");

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email Address required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    if (error) {
      const tmt = setTimeout(() => {
        setError("");
      }, 3000);

      return () => clearTimeout(tmt);
    }
  }, [error]);

  return (
    <div className=" d-flex flex-column gap-2 mt-3">
      <Row>
        <Col className="d-flex flex-column gap-1" md={4}>
          <Input
            type="text"
            onChange={validation.handleChange}
            value={validation.values.email}
            onBlur={validation.handleBlur}
            invalid={
              validation.touched.email && validation.errors.email ? true : false
            }
            name="email"
            placeholder="example@mail.com"
          />
          {validation.touched.email && validation.errors.email && (
            <FormFeedback>{validation.errors.email}</FormFeedback>
          )}
        </Col>
      </Row>
      <Col>
        <Col className="d-flex align-items-center gap-3">
          <button
            type="button"
            onClick={validation.handleSubmit}
            className="btn bg-danger-subtle text-capitalize text-danger"
          >
            close &amp; Delete This Account
          </button>
          <button className="btn btn-light" type="button" onClick={onClose}>
            Cancel
          </button>
        </Col>
      </Col>
      {error && (
        <ErrorToast
          errorMsg={error}
          isOpen={!!error}
          onClose={() => setError("")}
        />
      )}
    </div>
  );
};

export default DeleteAccount;
