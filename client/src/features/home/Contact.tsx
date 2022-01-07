import { Box, Container, Grid, List, ListItem, ListItemText, Typography, } from "@mui/material";
import "./Contact.scss";

export default function Contact() {


    return (
        <Container
            sx={{
                height: "auto",
                width: "100%",
                color: "white",
                pt: { md: 7, xs: 4 },
                mb: { xs: 7, md: 2 },
            }}
        >
            <Typography
                variant="h3"
                sx={{
                    textTransform: "uppercase",
                    color: "white",
                }}
            >
                Contact Us
            </Typography>

            <Grid container>
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
                                    primary={<Typography>Phone</Typography>}
                                    secondary={<Typography>01975-289780 / 01590-057146</Typography>}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={<Typography>Mobile</Typography>}
                                    secondary={<Typography>07905-226729 / 07794-185107</Typography>}
                                />
                            </ListItem>

                            <ListItem>
                                <ListItemText primary={<Typography>Delivery Service</Typography>}
                                    secondary={<Typography>01845-668372/ 07945-681442</Typography>}
                                />
                            </ListItem>

                            <ListItem>
                                <ListItemText
                                    primary={<Typography>Email</Typography>}
                                    secondary={<Typography>Oh-Fooood@gmail.com</Typography>}
                                />
                            </ListItem>

                            <ListItem>
                                <ListItemText
                                    primary={<Typography>Address</Typography>}
                                    secondary={<Typography>31 Park Lane TUNBRIDGE WELLS TN57 5AN</Typography>}
                                />
                            </ListItem>

                            <ListItem>
                                <ListItemText
                                    primary={<Typography>Social Media</Typography>}
                                    secondary={<Typography>Oh Food (Facebook, Instagram, Twitter)</Typography>}
                                />
                            </ListItem>
                        </List>
                    </Container>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Box sx={{ borderRadius: 3, overflow: "hidden", my: 5 }}>
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
