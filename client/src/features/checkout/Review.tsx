import {
  Box,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import React from "react";
import { currencyFormat } from "../../app/util/util";
import QuantityStepper from "../../app/components/QuantityStepper";
import {
  addBasketItemAsync,
  removeBasketItemAsync,
} from "../../app/slices/basketSlice";

export default function Review() {
  const { basket, status } = useAppSelector((state) => state.basket);
  const subtotal =
    basket?.items.reduce((sum, item) => sum + item.quantity * item.price, 0) ??
    0;
  const dispatch = useAppDispatch();
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      {basket && (
        <List>
          {basket.items.map((item) => (
            <ListItem key={item.productId} sx={{ mb: 0 }}>
              <Grid container spacing={2} rowSpacing={0}>
                <Grid
                  md={2}
                  xs={0}
                  item
                  sx={{ overflow: "hidden" }}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Box
                    component={"img"}
                    src={item.pictureUrl}
                    alt={item.name}
                    sx={{
                      height: "50px",
                      width: "50px",
                      objectFit: "contain",
                      objectPosition: "center",
                    }}
                  />
                </Grid>

                <Grid
                  item
                  md={5}
                  xs={8}
                  display={"flex"}
                  alignItems={"flex-start"}
                  justifyContent={"center"}
                  flexDirection={"column"}
                  columnGap={3}
                >
                  <Typography variant={"caption"}>{item.category}</Typography>
                  <Typography variant={"subtitle1"}>{item.name}</Typography>
                </Grid>

                <Grid
                  item
                  md={3}
                  xs={6}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <QuantityStepper
                    quantity={item.quantity}
                    increase={() =>
                      dispatch(
                        addBasketItemAsync({ productId: item.productId })
                      )
                    }
                    decrease={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: 1,
                          name: "rem",
                        })
                      )
                    }
                    isRow={true}
                    minValue={1}
                    loading={status.includes("pending")}
                  />
                </Grid>

                <Grid
                  item
                  md={2}
                  xs={6}
                  sx={{ overflow: "hidden" }}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Typography textAlign={"center"}>
                    {currencyFormat(item.price * item.quantity, "$")}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      )}

      <Divider />

      <Grid container>
        <Grid item md={6} xs={0} />
        <Grid item xs={12} md={6}>
          <Container>
            <List dense>
              <ListItem>
                <Stack
                  width={"100%"}
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography variant="caption">Subtotal</Typography>
                  <Typography variant="subtitle1">
                    {currencyFormat(subtotal, "$")}
                  </Typography>
                </Stack>
              </ListItem>
              <ListItem>
                <Stack
                  width={"100%"}
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography variant="caption">Delivery Cost</Typography>
                  <Typography variant="subtitle1">
                    {currencyFormat(30, "$")}
                  </Typography>
                </Stack>
              </ListItem>
              <ListItem>
                <Stack
                  width={"100%"}
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography variant="caption">Total</Typography>
                  <Typography variant="subtitle1">
                    {currencyFormat(subtotal + 30, "$")}
                  </Typography>
                </Stack>
              </ListItem>
            </List>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}
