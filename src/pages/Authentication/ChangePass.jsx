import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Card,
  CardBody,
  Form,
  FormFeedback,
  Label,
  Input,
  Spinner,
} from "reactstrap";
import * as Yup from "yup";
import { changeAccountPassword } from "../../services/resetAccountPass";
import { useNavigate } from "react-router-dom";

const ChangePass = ({ handleStep }) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const changePassWord = useMutation({
    mutationFn: changeAccountPassword,
    onError: (err) => setError(err.message || "Something went wrong"),
    onSuccess: () => {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("email_registered");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    },
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      newPass: "",
      oldPass: "",
      confirmPass: "",
    },
    validationSchema: Yup.object({
      oldPass: Yup.string().required("Please enter your old password"),
      newPass: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Please enter your new password"),
      confirmPass: Yup.string()
        .oneOf([Yup.ref("newPass"), null], "Passwords must match")
        .required("Please confirm your password"),
    }),

    onSubmit: (values) => {
      //   console.log(values);
      changePassWord.mutate(values);
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
    <div>
      <Card className="mt-4">
        <CardBody className="p-4">
          <div className="text-center mt-2">
            <h5 className="text-primary">Update Account Password?</h5>
            <p className="text-muted">Reset password with itrust</p>

            <lord-icon
              src="https://cdn.lordicon.com/rhvddzym.json"
              trigger="loop"
              colors="primary:#0ab39c"
              className="avatar-xl"
              style={{ width: "120px", height: "120px" }}
            ></lord-icon>
          </div>
          {error && <Alert color="danger">{error}</Alert>}
          {changePassWord.isSuccess && (
            <Alert color="success">Password updated.</Alert>
          )}
          <div className="p-2">
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
              }}
            >
              <div className="mb-4">
                <Label className="form-label">Old Password</Label>
                <Input
                  name="oldPass"
                  className="form-control"
                  placeholder="Enter oldPass"
                  type="password"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.oldPass || ""}
                  autoSave="off"
                  invalid={
                    validation.touched.oldPass && validation.errors.oldPass
                      ? true
                      : false
                  }
                />
                {validation.touched.oldPass && validation.errors.oldPass ? (
                  <FormFeedback type="invalid">
                    <div>{validation.errors.oldPass}</div>
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-4">
                <Label className="form-label">New Password</Label>
                <Input
                  name="newPass"
                  className="form-control"
                  placeholder="Enter newPass"
                  type="password"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.newPass || ""}
                  invalid={
                    validation.touched.newPass && validation.errors.newPass
                      ? true
                      : false
                  }
                />
                {validation.touched.newPass && validation.errors.newPass ? (
                  <FormFeedback type="invalid">
                    <div>{validation.errors.newPass}</div>
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-4">
                <Label className="form-label">Confirm New Password</Label>
                <Input
                  name="confirmPass"
                  className="form-control"
                  placeholder="Enter Password"
                  type="password"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.confirmPass || ""}
                  invalid={
                    validation.touched.confirmPass &&
                    validation.errors.confirmPass
                      ? true
                      : false
                  }
                />
                {validation.touched.confirmPass &&
                validation.errors.confirmPass ? (
                  <FormFeedback type="invalid">
                    <div>{validation.errors.confirmPass}</div>
                  </FormFeedback>
                ) : null}
              </div>

              <div className="text-center mt-4">
                <button
                  className="btn btn-secondary w-100 d-flex align-items-center gap-2 justify-content-center"
                  type="submit"
                  disabled={changePassWord.isPending}
                >
                  {changePassWord.isPending && <Spinner size={"sm"} />}{" "}
                  {changePassWord.isPending ? "Updating..." : "Change Password"}
                </button>
              </div>
            </Form>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ChangePass;
