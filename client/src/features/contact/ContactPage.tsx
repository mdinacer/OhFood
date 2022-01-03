import {Box, Container, Grid, List, ListItem, ListItemText, Paper, TextField, Typography} from "@mui/material";
import {FieldValues, useForm} from "react-hook-form";
import agent from "../../app/api/agent";
import {MailRequest} from "../../app/models/mailRequest";
import {LoadingButton} from "@mui/lab";
import "./ContactPage.scss";

export default function ContactPage(){
    const {
        register,
        handleSubmit,
        reset,
        formState: {isSubmitting, errors, isValid},
    } = useForm({mode: "all"});

    async function submitForm(data: FieldValues) {
        try {
            await agent.Account.sendMail(data);
            reset(new MailRequest());
        } catch (error) {
            console.log(error);
        }
    }
    return(
     <Box className={"contact-page"}>
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
                 Contact Information
             </Typography>

             <Grid container>
                 <Grid item xs={12} md={6}>

                     <Container
                         component={Paper}
                         sx={{width: "100%", borderRadius: 3, mt: 3, py: 4}}
                     >
                         <Typography variant="h6" gutterBottom>
                             Send an email
                         </Typography>
                         <Box
                             component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{mt: 1}}
                         >
                             <TextField
                                 margin="normal"
                                 fullWidth
                                 label="Full Name"
                                 autoComplete={"off"}
                                 {...register('displayName', {required: 'Full Name is required'})}
                                 error={!!errors.displayName}
                                 helperText={errors?.displayName?.message}
                             />
                             <TextField
                                 margin="normal"
                                 fullWidth
                                 label="Email Address"
                                 autoComplete={"email"}
                                 {...register('from', {required: 'Email is required'})}
                                 error={!!errors.from}
                                 helperText={errors?.from?.message}
                             />
                             <TextField
                                 margin="normal"
                                 fullWidth
                                 label="Subject"
                                 autoComplete={"off"}
                                 {...register('subject', {required: 'Subject is required'})}
                                 error={!!errors.subject}
                                 helperText={errors?.subject?.message}
                             />
                             <TextField
                                 margin="normal"
                                 fullWidth
                                 label="Message"
                                 autoComplete={"off"}
                                 multiline
                                 rows={3}
                                 {...register('body', {required: 'Message is required', minLength: 10})}
                                 error={!!errors.body}
                                 helperText={errors?.body?.message}
                             />

                             <LoadingButton
                                 loading={isSubmitting}
                                 disabled={!isValid}
                                 type="submit"
                                 fullWidth
                                 variant="outlined"
                                 sx={{mt: 3, mb: 2}}
                             >
                                 Send
                             </LoadingButton>
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
                                     secondary={<Typography >31 Park Lane TUNBRIDGE WELLS TN57 5AN</Typography>}
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
             </Grid>
         </Container>
     </Box>
    )
}