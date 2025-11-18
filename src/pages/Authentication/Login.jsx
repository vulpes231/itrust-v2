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
import withRouter from "../../Components/Common/withRouter";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

import logoLight from "../../assets/images/logo-light.png";

import { logo } from "../../assets";
import { loginUser } from "../../services/auth/login";

const Login = (props) => {
	const [form, setForm] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const [passwordShow, setPasswordShow] = useState(false);

	const mutation = useMutation({
		mutationFn: loginUser,
		onError: (err) => {
			console.log(err.message);
			setError(err.message);
		},
		onSuccess: (user) => {
			// console.log(user);
		},
	});

	const validation = useFormik({
		// enableReinitialize : use this flag when initial values needs to be changed
		enableReinitialize: true,

		initialValues: {
			email: form.email || "larou34@svk.jp" || "",
			password: form.password || "12345" || "",
		},
		validationSchema: Yup.object({
			email: Yup.string().required("Please Enter Your Email"),
			password: Yup.string().required("Please Enter Your Password"),
		}),
		onSubmit: (values) => {
			console.log(values);
			mutation.mutate(values);
		},
	});

	const signIn = (type) => {};

	//handleTwitterLoginResponse
	const twitterResponse = (e) => {};

	//for facebook and google authentication
	const socialResponse = (type) => {
		signIn(type);
	};

	useEffect(() => {
		if (mutation.isSuccess) {
			// console.log(mutation.data);
			sessionStorage.setItem("token", mutation.data.token);
			sessionStorage.setItem("user", JSON.stringify(mutation.data.user));
			const user = mutation.data.user;
			if (user && user.accountStatus) {
				if (user.accountStatus.emailVerified) {
					// window.location.href = "/2fa";
				} else if (user.accountStatus.banned) {
					// window.location.href = "/appeal";
				} else if (user.accountStatus.twoFaActivated) {
					// window.location.href = "/appeal";
				} else {
					window.location.href = "/dashboard";
				}
			}
		}
	}, [mutation.isSuccess]);

	useEffect(() => {
		if (error) {
			const timeout = setTimeout(() => {
				setError("");
			}, 3000);
			return () => clearTimeout(timeout);
		}
	}, [error]);

	document.title = "Login | Itrust Investments";
	return (
		<React.Fragment>
			<ParticlesAuth>
				<div className="auth-page-content">
					<Container>
						<Row>
							<Col lg={12}>
								<div className="text-center mt-sm-5 mb-4 text-white-50">
									<div>
										<Link to="/" className="d-inline-block auth-logo">
											<img src={logo} alt="" height="30" width={"120"} />
										</Link>
									</div>
									<p className="mt-3 fs-15 fw-medium">
										Smart Wealth Management
									</p>
								</div>
							</Col>
						</Row>

						<Row className="justify-content-center">
							<Col md={8} lg={6} xl={5}>
								<Card className="mt-4">
									<CardBody className="p-4">
										<div className="text-center mt-2">
											<h5 className="text-primary">Welcome Back !</h5>
											<p className="text-muted">
												Sign in to continue to Itrust.
											</p>
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
															validation.touched.email &&
															validation.errors.email
																? true
																: false
														}
													/>
													{validation.touched.email &&
													validation.errors.email ? (
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
													<Label
														className="form-label"
														htmlFor="password-input"
													>
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
														className="btn btn-primary w-100"
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

												<div className="mt-4 text-center">
													<div className="signin-other-title">
														<h5 className="fs-13 mb-4 title">Sign In with</h5>
													</div>
													<div>
														<Link
															to="#"
															className="btn btn-primary btn-icon me-1"
															onClick={(e) => {
																e.preventDefault();
																socialResponse("facebook");
															}}
														>
															<i className="ri-facebook-fill fs-16" />
														</Link>
														<Link
															to="#"
															className="btn btn-danger btn-icon me-1"
															onClick={(e) => {
																e.preventDefault();
																socialResponse("google");
															}}
														>
															<i className="ri-google-fill fs-16" />
														</Link>
														<Button color="dark" className="btn-icon">
															<i className="ri-github-fill fs-16"></i>
														</Button>{" "}
														<Button color="info" className="btn-icon">
															<i className="ri-twitter-fill fs-16"></i>
														</Button>
													</div>
												</div>
											</Form>
										</div>
									</CardBody>
								</Card>

								<div className="mt-4 text-center">
									<p className="mb-0">
										Don't have an account ?{" "}
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
						</Row>
					</Container>
				</div>
			</ParticlesAuth>
		</React.Fragment>
	);
};

export default withRouter(Login);
