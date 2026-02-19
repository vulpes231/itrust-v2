import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, FormFeedback, Input, Label, Row } from "reactstrap";
import ErrorToast from "../../../components/Common/ErrorToast";
import * as Yup from "yup";

const EditPassword = ({ onClose }) => {
  const [error, setError] = useState("");

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Password required"),
      newPassword: Yup.string().required("New Password required"),
      confirmNewPassword: Yup.string().required("Confirm Password required"),
    }),
    onSubmit: (values) => {
      if (values.password === values.newPassword) {
        setError("Old and new passwords cannot be the same!");
        return;
      }
      if (values.newPassword !== values.confirmNewPassword) {
        setError("Passwords does not match!");
        return;
      }
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
    <div className=" d-flex flex-column gap-2">
      <Row>
        <Col className="d-flex flex-column gap-1">
          <Label className="fw-normal fs-14 text-capitalize">
            old password*
          </Label>
          <Input
            type="password"
            onChange={validation.handleChange}
            value={validation.values.password}
            onBlur={validation.handleBlur}
            invalid={
              validation.touched.password && validation.errors.password
                ? true
                : false
            }
            name="password"
            placeholder="***********"
          />
          {validation.touched.password && validation.errors.password && (
            <FormFeedback>{validation.errors.password}</FormFeedback>
          )}
        </Col>
        <Col className="d-flex flex-column gap-1">
          <Label className="fw-normal fs-14 text-capitalize">
            new password*
          </Label>
          <Input
            type="password"
            onChange={validation.handleChange}
            value={validation.values.newPassword}
            onBlur={validation.handleBlur}
            invalid={
              validation.touched.newPassword && validation.errors.newPassword
                ? true
                : false
            }
            name="newPassword"
            placeholder="***********"
          />
          {validation.touched.newPassword && validation.errors.newPassword && (
            <FormFeedback>{validation.errors.newPassword}</FormFeedback>
          )}
        </Col>
        <Col className="d-flex flex-column gap-1">
          <Label className="fw-normal fs-14 text-capitalize">
            confirm password*
          </Label>
          <Input
            type="password"
            onChange={validation.handleChange}
            value={validation.values.confirmNewPassword}
            onBlur={validation.handleBlur}
            invalid={
              validation.touched.confirmNewPassword &&
              validation.errors.confirmNewPassword
                ? true
                : false
            }
            name="confirmNewPassword"
            placeholder="***********"
          />
          {validation.touched.confirmNewPassword &&
            validation.errors.confirmNewPassword && (
              <FormFeedback>
                {validation.errors.confirmNewPassword}
              </FormFeedback>
            )}
        </Col>
      </Row>
      <Col>
        <Link className="text-capitalize text-decoration-underline ">
          forgot password?
        </Link>
        <Col className="d-flex align-items-center justify-content-end gap-3">
          <button className="btn btn-light" type="button" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            onClick={validation.handleSubmit}
            className="btn btn-primary text-capitalize"
          >
            change password
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

export default EditPassword;
