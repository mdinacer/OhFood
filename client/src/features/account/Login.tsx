import {useLocation, useNavigate} from "react-router-dom";
import {FieldValues, useForm} from "react-hook-form";
import {useAppDispatch} from "../../app/store/configureStore";
import {signInUser} from "./accountSlice";
import {useEffect} from "react";
import {Button, Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import "./Account.scss"
import {LinkContainer} from "react-router-bootstrap";

export default function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        setValue,
        formState: {isSubmitting, errors, isValid},
    } = useForm({mode: "all"});

    async function submitForm(data: FieldValues) {
        try {
            console.log(data);

            await dispatch(signInUser(data));
            const from = location.state?.from?.pathname || "/";
            navigate(from);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const login = location.state?.login;
        if (login) {
            setValue("username", login.username);
            setValue("password", login.password);
        }
    }, [location.state?.login, setValue]);

    return (
        <div className={"login-form d-block d-md-flex align-items-center justify-content-md-center"}>
            <Card className={" bg-light shadow-sm "}>
                <Row>
                    <Col className={"d-none d-md-block "} xs={12} md={6}>
                        <Image className={"img"}
                               src={"/images/backgrounds/login_bg.jpg"}/>
                    </Col>
                    <Col xs={12} md={6} className={" py-5 d-flex align-items-center"}>
                        <Container>
                            <h3 className={"text-uppercase text-center pb-3"}>Identification</h3>
                            <Form
                                onSubmit={handleSubmit(submitForm)}
                                className="bg-light"
                                noValidate
                                validated={isValid}
                            >
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>User Name</Form.Label>
                                    <Form.Control
                                        isValid={!errors.username}
                                        type="text"
                                        placeholder="Enter username"
                                        {...register("username", {
                                            required: "Username is required",
                                            minLength: 3,
                                        })}
                                        className={`${!!errors.username ? 'is-invalid' : 'isValid'}`}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors?.username?.message}
                                    </Form.Control.Feedback>

                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        isValid={!errors.password}
                                        type="password"
                                        placeholder="Password"
                                        className={`${!!errors.username ? 'is-invalid' : 'isValid'}`}
                                        {...register("password", {required: "Password is required"})}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors?.username?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Button disabled={isSubmitting || !isValid} variant="dark" type="submit"
                                        className={"w-100 mt-3"}>
                                    Se connecter
                                </Button>

                                <LinkContainer to={"/register"}>
                                    <Button variant="outline-dark" className={"w-100 mt-3"}>
                                        Créer un compte
                                    </Button>
                                </LinkContainer>
                            </Form>
                        </Container>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}
