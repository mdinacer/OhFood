import {Box, Button, Container, Grid, List, ListItem, ListItemText, Paper, TextField, Typography,} from "@mui/material";
import "./Contact.scss";

export default function Contact() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get("email"),
            password: data.get("password"),
        });
    };
    return (
        <Container
            sx={{
                height: "auto",
                width: "100%",
                color: "white",
                py: 5,
            }}
        >
            <Typography
                variant="h3"
                sx={{
                    textTransform: "uppercase",
                    pt: 10,
                    mb: 2,
                    color: "white",
                }}
            >
                Contact Us
            </Typography>

            <Grid container>
                <Grid item xs={12} md={6}>
                    {" "}
                    <Container
                        component={Paper}
                        sx={{width: "100%", borderRadius: 3, mt: 3, py: 4}}
                    >
                        <Typography variant="h6" gutterBottom>
                            Send an email
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            noValidate
                            sx={{mt: 1}}
                        >
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Full name"
                                name="name"
                                autoComplete="text"
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Subject"
                                name="subject"
                                autoComplete="text"
                            />
                            <TextField
                                multiline
                                margin="normal"
                                fullWidth
                                rows={5}
                                label="Message"
                                name="message"
                                autoComplete="text"
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Send
                            </Button>
                        </Box>
                    </Container>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Container
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                        }}
                    >
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary="Phone"
                                    secondary={"041 47 15 19 / 041 47 15 20"}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Mobile"
                                    secondary={"0 661 991 735 / 0 770 455 111"}
                                />
                            </ListItem>

                            <ListItem>
                                <ListItemText
                                    primary="Delivery Service"
                                    secondary={"0 661 991 735 - 740/ 0 770 455 111 - 115"}
                                />
                            </ListItem>

                            <ListItem>
                                <ListItemText
                                    primary="Email"
                                    secondary={"Oh-Fooood@gmail.com"}
                                />
                            </ListItem>

                            <ListItem>
                                <ListItemText
                                    primary="Address"
                                    secondary={"36 cité les pins - Arzew - Oran - 31041"}
                                />
                            </ListItem>

                            <ListItem>
                                <ListItemText
                                    primary="Social Media"
                                    secondary={"Oh Food (Facebook, Instagram, Twitter)"}
                                />
                            </ListItem>
                        </List>
                    </Container>
                </Grid>

                <Grid item xs={12}>
                    <Box sx={{borderRadius: 3, overflow: "hidden", my: 5}}>
                        <iframe
                            title="Shop position"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d317718.69319292053!2d-0.3817765050863085!3d51.528307984912544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2sdz!4v1640637788861!5m2!1sen!2sdz"
                            width="100%"
                            height="450"
                            loading="lazy"
                        />

                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}
