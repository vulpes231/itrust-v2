import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
  Form,
  FormFeedback,
  Alert,
  Spinner,
} from "reactstrap";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { logo } from "../../assets";
import { loginUser } from "../../services/auth/login";
import withRouter from "../../Components/Common/withRouter";

const Login = (props) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);

  const mutation = useMutation({
    mutationFn: loginUser,
    onError: (err) => {
      console.log(err);
      setError(err.message);
    },
  });

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: form.email || "",
      password: form.password || "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  useEffect(() => {
    if (!mutation.isSuccess || !mutation.data) return;

    const user = mutation.data.user;
    const token = mutation.data.token;
    const d = new Date();

    const loginTime = `Updated ${d.toLocaleDateString(
      "en-GB",
    )} at ${d.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}`;

    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("lastLogin", JSON.stringify(loginTime));
    localStorage.setItem("loginType", JSON.stringify(user?.loginType));

    const isSuperUser = user?.loginType === "superuser";

    if (isSuperUser) {
      window.location.href = "/dashboard";
      return;
    }

    const timeout = setTimeout(() => {
      if (user?.accountStatus) {
        if (!user.accountStatus.emailVerified) {
          sessionStorage.setItem("email_registered", validation.values.email);
          window.location.href = "/verifyemail";
        } else if (user.accountStatus.banned) {
          window.location.href = "/appeal";
        } else if (user.accountStatus.twoFaActivated) {
          sessionStorage.setItem("email_registered", validation.values.email);
          window.location.href = "/twofactor";
        } else if (!user.accountStatus.isProfileComplete) {
          window.location.href = "/contact";
        } else {
          window.location.href = "/dashboard";
        }
      } else {
        console.log("No accountStatus found", user);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [mutation.isSuccess, mutation.data]);

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  document.title = "Login - Itrust Investments";
  return (
    <React.Fragment>
      <ParticlesAuth>
        <Container className="d-flex flex-column align-items-center justify-content-center auth-page-content mt-5">
          <Col className="w-100 mt-3">
            <Card style={{ maxWidth: "500px", margin: "0 auto" }}>
              <CardBody className="p-4">
                <div className="mt-2 d-flex flex-column gap-4 align-items-center justify-content-center">
                  <div>
                    <Link to="/" className="d-inline-block auth-logo">
                      <img src={logo} alt="" height="36" width={"112"} />
                    </Link>
                  </div>
                  <div className="d-flex flex-column align-items-center justify-content-center">
                    <h5 className="text-primary lh-1">Welcome Back!</h5>
                    <p className="text-muted lh-1">Sign in to continue</p>
                  </div>
                </div>
                {error && error ? (
                  <Alert color="danger"> {error} </Alert>
                ) : null}
                <div className="p-2 mt-4">
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}
                    action="#"
                  >
                    <div className="mb-3">
                      <Label htmlFor="email" className="form-label">
                        Email
                      </Label>
                      <Input
                        name="email"
                        className="form-control"
                        placeholder="Enter email"
                        type="email"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.email || ""}
                        invalid={
                          validation.touched.email && validation.errors.email
                            ? true
                            : false
                        }
                        autoComplete="off"
                      />
                      {validation.touched.email && validation.errors.email ? (
                        <FormFeedback type="invalid">
                          {validation.errors.email}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-3">
                      <div className="float-end">
                        <Link to="/forgot-password" className="text-muted">
                          Forgot password?
                        </Link>
                      </div>
                      <Label className="form-label" htmlFor="password-input">
                        Password
                      </Label>
                      <div className="position-relative auth-pass-inputgroup mb-3">
                        <Input
                          name="password"
                          value={validation.values.password || ""}
                          type={passwordShow ? "text" : "password"}
                          className="form-control pe-5"
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.password &&
                            validation.errors.password
                              ? true
                              : false
                          }
                        />
                        {validation.touched.password &&
                        validation.errors.password ? (
                          <FormFeedback type="invalid">
                            {validation.errors.password}
                          </FormFeedback>
                        ) : null}
                        <button
                          className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                          type="button"
                          id="password-addon"
                          onClick={() => setPasswordShow(!passwordShow)}
                        >
                          <i className="ri-eye-fill align-middle"></i>
                        </button>
                      </div>
                    </div>

                    <div className="form-check">
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="auth-remember-check"
                      />
                      <Label
                        className="form-check-label"
                        htmlFor="auth-remember-check"
                      >
                        Remember me
                      </Label>
                    </div>
                    <div className="mt-4">
                      <Button
                        disabled={
                          error ? null : mutation.isPending ? true : false
                        }
                        color="primary"
                        className="btn btn-secondary w-100"
                        type="submit"
                      >
                        {mutation.isPending ? (
                          <Spinner size="sm" className="me-2">
                            {" "}
                            Logging in...
                          </Spinner>
                        ) : null}
                        Sign In
                      </Button>
                    </div>
                  </Form>
                </div>
              </CardBody>
            </Card>

            <div className="mt-4 text-center">
              <p className="mb-0 d-flex align-itesm-center gap-4 justify-content-center">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="fw-semibold text-primary text-decoration-underline"
                >
                  {" "}
                  Signup{" "}
                </Link>{" "}
              </p>
            </div>
          </Col>
        </Container>
      </ParticlesAuth>
    </React.Fragment>
  );
};

export default withRouter(Login);
