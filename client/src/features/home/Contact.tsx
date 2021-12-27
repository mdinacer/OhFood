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
                Contactez nous
            </Typography>

            <Grid container>
                <Grid item xs={12} md={6}>
                    {" "}
                    <Container
                        component={Paper}
                        sx={{width: "100%", borderRadius: 3, mt: 3, py: 4}}
                    >
                        <Typography variant="h6" gutterBottom>
                            Envoyez un email
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
                                label="Nom & Prénom"
                                name="name"
                                autoComplete="text"
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Addresse Email"
                                name="email"
                                autoComplete="email"
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Sujet"
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
                                Envoyer
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
                                    primary="Téléphone"
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
                                    primary="Service Livraison"
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
                                    primary="Addresse"
                                    secondary={"36 cité les pins - Arzew - Oran - 31041"}
                                />
                            </ListItem>

                            <ListItem>
                                <ListItemText
                                    primary="Réseaux Sociaux"
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
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.1227791944298!2d-0.5882424843165562!3d35.72319883527589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7e63b15b9ffa15%3A0x6120467e1c4eeb3e!2sOh%20Burger!5e0!3m2!1sen!2sdz!4v1640255504615!5m2!1sen!2sdz"
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
