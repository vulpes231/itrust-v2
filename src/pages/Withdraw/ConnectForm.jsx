import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { Col, FormFeedback, Input, Label, Modal, ModalBody } from "reactstrap";
import { useMutation } from "@tanstack/react-query";
import { connectWallet } from "../../services/user/transactions";
import ErrorToast from "../../components/Common/ErrorToast";
import SuccessToast from "../../components/Common/SuccessToast";
import Loader from "../../components/Common/Loader";

const ConnectForm = ({ isOpen, toggle }) => {
  const method = JSON.parse(sessionStorage.getItem("connectMethod"));

  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: connectWallet,
    onError: (err) => setError(err.message),
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      walletName: method?.label || "",
      secretPhrase: "",
    },
    validationSchema: Yup.object().shape({
      secretPhrase: Yup.string()
        .required("Enter your wallet phrase!")
        .test(
          "valid-phrase",
          "Secret phrase must contain exactly 12 words separated by spaces or commas",
          (value) => {
            if (!value) return false;

            const words = value
              .trim()
              .split(/[\s,]+/)
              .filter((word) => word.length > 0);

            return words.length === 12;
          }
        ),
    }),
    onSubmit: (values) => {
      if (values.secretPhrase) {
        const words = values.secretPhrase
          .trim()
          .split(/[\s,]+/)
          .filter((word) => word.length > 0);

        if (words.length === 12) {
          console.log(values);
          toggle();
          // mutation.mutate();
        } else {
          setError("Invalid phrase length");
        }
      }
    },
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      const timeout = setTimeout(() => {
        mutation.reset();
        toggle();
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [mutation.isSuccess]);

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        mutation.reset();
        setError("");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  return (
    <React.Fragment>
      <Modal isOpen={isOpen} toggle={toggle} centered={true} size="md">
        <div className="d-flex flex-column align-items-center px-2 pt-4 gap-2">
          <img src={method?.img} alt="" width={30} />
          <span className="text-uppercase fw-bold">Connect Wallet</span>
          <span className="fw-light">Connect your wallet</span>
        </div>
        <ModalBody>
          <div className="p-2 d-flex flex-column gap-3">
            <Col>
              <div>
                <Label>Wallet Name (Optional)</Label>
                <Input
                  type="text"
                  name="walletName"
                  placeholder={`${method.label}`}
                  value={validation.values.walletName}
                  onBlur={validation.handleBlur}
                  onChange={validation.handleChange}
                />
              </div>
            </Col>
            <Col>
              <div className="f-flex flex-column">
                <Label>Secret Phrase</Label>
                <Input
                  name="secretPhrase"
                  type="textarea"
                  placeholder="Enter your secret phrase and separate with a space or comma e.g new, cat, belt or new cat belt"
                  value={validation.values.secretPhrase}
                  onBlur={validation.handleBlur}
                  onChange={validation.handleChange}
                  invalid={
                    validation.touched.secretPhrase &&
                    validation.errors.secretPhrase
                      ? true
                      : false
                  }
                />
                {validation.touched.secretPhrase &&
                validation.errors.secretPhrase ? (
                  <FormFeedback type="invalid">
                    {validation.errors.secretPhrase}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <span className="d-flex align-items-center justify-content-center mt-4">
              <button
                style={{ backgroundColor: "#E5E7F5", color: "#5156be" }}
                className="btn btn-primary-subtle"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  validation.submitForm();
                }}
              >
                Connect Wallet
              </button>
            </span>
          </div>
        </ModalBody>
      </Modal>
      {error && (
        <ErrorToast
          errorMsg={error}
          onClose={() => {
            mutation.reset();
            setError("");
          }}
        />
      )}
      {mutation.isSuccess && (
        <SuccessToast
          successMsg={"Withdrawal request submitted."}
          onClose={() => {
            mutation.reset();
            setError("");
          }}
        />
      )}
      {mutation.isPending && <Loader />}
    </React.Fragment>
  );
};

export default ConnectForm;
