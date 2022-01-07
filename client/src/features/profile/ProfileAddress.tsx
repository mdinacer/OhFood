import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { Box, Button, Container, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { ShippingAddress } from "../../app/models/shippingAddress";
import { Link } from "react-router-dom";

export default function ProfileAddress() {
  const [address, setAddress] = useState<ShippingAddress | null>(null);
  const [loading, setLoading] = useState(false);

  const showMessage = (message: string = "Loading") => (
    <Box
      height={"100%"}
      width={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Typography variant={"caption"}>{message}</Typography>
    </Box>
  );

  useEffect(() => {
    setLoading(true);
    if (!address) {
      agent.Profile.fetchDefaultAddress()
        .then((response) => {
          setAddress(response);
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [address]);

  if (loading && !address) return showMessage("Loading Shipping Address");
  if (!loading && !address) return showMessage("Shipping address not set");

  return (
    <Box>
      {address && (
        <Container>
          <Typography variant={"h5"} component={"h2"} gutterBottom>
            Delivery Address
          </Typography>
          <Typography variant={"caption"}>Name</Typography>
          <Typography variant={"subtitle1"} gutterBottom>
            {address.fullName}
          </Typography>
          <Typography variant={"caption"}>Address</Typography>
          <Typography variant={"body2"} gutterBottom>
            {address.address1} - {address.city}
          </Typography>
          <Button
            size={"small"}
            color={"inherit"}
            variant={"text"}
            startIcon={<Edit />}
            component={Link}
            to={"/profile/addresses"}
          >
            Edit
          </Button>
        </Container>
      )}
    </Box>
  );
}
