import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import { Form as BootstrapForm, Button, Alert, Toast, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../app/services/UserApi";

interface LoginFormValues {
  username: string;
  email: string;
  password: string;
  rememberMe: boolean;
  showError: boolean;
}
const authImage = require('../assets/authImage.jpg'); 

const Register: React.FC = () => {
  const [submit, setSubmit] = useState<string | false>(false);
  const [error, setError] = useState<string | false>(false);
  const navigate = useNavigate();

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting, setFieldError }: any
  ) => {
    await delay(500);
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("email", values.email);
    formData.append("password", values.password);

    registerUser(formData)
      .then((response) => {
        setSubmit(response?.data?.message);
        localStorage.setItem("userToken", response?.data?.token);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      })
      .catch((error) => {
        setError(error?.response?.data?.error);
      });
    setSubmitting(false);
  };

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <>
      <Row>
        <Col>
          <div style={{backgroundImage: `url(${authImage})`, height: "100vh", backgroundSize: "cover"}}></div>
        </Col>
        <Col>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <div style={{ width: "24rem", maxWidth: "90%", zIndex: 1 }}>
              <Formik<LoginFormValues>
                initialValues={{
                  username: "",
                  email: "",
                  password: "",
                  rememberMe: false,
                  showError: false,
                }}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="shadow p-4 bg-white rounded">
                    <div className="h4 mb-2 text-center">Create Account</div>
                    {error && (
                      <Alert variant="danger" className="py-2">
                        {error}
                      </Alert>
                    )}
                    {submit && (
                      <Alert variant="success" className="py-2">
                        {submit}
                      </Alert>
                    )}
                    <Field
                      name="showError"
                      render={({ field }: any) =>
                        field.value && (
                          <Alert
                            className="mb-2"
                            variant="danger"
                            onClose={() => field.onChange(false)}
                            dismissible
                          >
                            Incorrect username or password.
                          </Alert>
                        )
                      }
                    />

                    <BootstrapForm.Group className="mb-2" controlId="password">
                      <BootstrapForm.Label className="d-flex">
                        Username
                      </BootstrapForm.Label>
                      <Field
                        type="text"
                        name="username"
                        as={BootstrapForm.Control}
                        placeholder="Username"
                        required
                      />
                    </BootstrapForm.Group>

                    <BootstrapForm.Group className="mb-2" controlId="email">
                      <BootstrapForm.Label className="d-flex">
                        Email
                      </BootstrapForm.Label>
                      <Field
                        type="email"
                        name="email"
                        as={BootstrapForm.Control}
                        placeholder="Email"
                        required
                      />
                    </BootstrapForm.Group>

                    <BootstrapForm.Group className="mb-2" controlId="password">
                      <BootstrapForm.Label className="d-flex">
                        Password
                      </BootstrapForm.Label>
                      <Field
                        type="password"
                        name="password"
                        as={BootstrapForm.Control}
                        placeholder="Password"
                        required
                      />
                    </BootstrapForm.Group>

                    <Button
                      className="w-100 mt-3"
                      variant="primary"
                      type="submit"
                      disabled={isSubmitting}
                      style={{backgroundColor: "#91cecf", borderWidth:0}}
                    >
                      {isSubmitting ? "Signing up..." : "Sign up"}
                    </Button>

                    <div className="d-grid justify-content-end">
                      <Link to="/login">
                        <Button className="text-muted px-0" variant="link">
                          Login
                        </Button>
                      </Link>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Register;
