import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container component={Paper}>
      <Typography gutterBottom variant="h3">
        Content not found
      </Typography>
      <Divider />
      <Button fullWidth component={Link} to="/catalog">
        Back to shop
      </Button>
    </Container>
  );
}
