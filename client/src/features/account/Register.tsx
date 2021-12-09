import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {Button, Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import agent from "../../app/api/agent";
import {toast} from "react-toastify";
import "./Account.scss"

export default function Register() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setError,
        formState: {isSubmitting, errors, isValid},
    } = useForm({mode: "all"});

    function handleApiErrors(errors: any) {
        if (errors) {
            errors.forEach((error: string) => {
                if (error.includes("Password")) {
                    setError("password", {message: error});
                } else if (error.includes("Email")) {
                    setError("email", {message: error});
                } else if (error.includes("Username")) {
                    setError("username", {message: error});
                }
            });
        }
        console.log(errors);
    }

    return (
        <div className={"register-form d-block d-md-flex align-items-center justify-content-md-center"}>
            <Card className={"bg-light shadow-sm "}>

                <Row>
                    <Col className={"d-none d-md-block "} xs={12} md={6}>
                        <Image className={"img"}
                               src={"/images/backgrounds/register_bg.jpg"}/>
                    </Col>
                    <Col xs={12} md={6} className={" py-5 d-flex align-items-center"}>
                        <Container>
                            <h3 className={"text-uppercase text-center pb-3"}>Inscription</h3>
                            <Form className="h-100 my-auto " validated={isValid} onSubmit={handleSubmit((data) =>
                                agent.Account.register(data)
                                    .then(() => {
                                        toast.success("Registration successful - you can now login.");
                                        navigate("/login", {state: {login: data}});
                                    })
                                    .catch((error) => handleApiErrors(error))
                            )}
                                  noValidate>
                                <Form.Group className="mb-3" controlId="formBasicUsername">
                                    <Form.Label>User name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter username"
                                        {...register("username", {
                                            required: "Username is required",
                                            minLength: 3,
                                        })}
                                        isValid={!!errors.username}
                                        className={`${!!errors.username ? 'is-invalid' : 'isValid'}`}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors?.username?.message}
                                    </Form.Control.Feedback>

                                </Form.Group>
                                <Form.Group className="mb-3 " controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value:
                                                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                                                message: "Please enter a valid Email address",
                                            },
                                            minLength: 3,
                                        })}
                                        isValid={!!errors.email}
                                        className={!!errors.email ? 'is-invalid' : 'isValid'}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors?.email?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        {...register("password", {
                                            required: "Password is required",
                                            pattern: {
                                                value: /^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/,
                                                message:
                                                    "Password should be at least one capital letter, one small letter, one number and 8 character length",
                                            },
                                        })}
                                        isValid={!!errors.password}
                                        className={!!errors.password ? 'is-invalid' : 'isValid'}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors?.password?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Button disabled={isSubmitting || !isValid} variant="dark" type="submit"
                                        className={"w-100 mt-3"}>
                                    S'inscrire
                                </Button>
                            </Form>
                        </Container>
                    </Col>
                </Row>
            </Card>
        </div>

    );
}
