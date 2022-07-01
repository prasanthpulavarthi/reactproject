import React, { useEffect, useState } from "react";
import { getProductsbyId } from "../service/Product";
import { useParams } from "react-router-dom";
import { Container } from "@mui/system";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { cartActions } from "../redux/Counter";
import { isAdmin } from "../service/Auth";

export default function ProductInfo() {
  const [proInfo, setProinfo] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    getProductsbyId(id)
      .then((res) => {
        setProinfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addItemHandler = (item) => {
    dispatch(cartActions.addItemToCart(item));
    alert("product added to cart");
  };

  return (
    <Container>
      <Card sx={{ maxWidth: 345, margin: "40px auto" }}>
        <CardMedia
          component="img"
          height="300"
          image={proInfo.imageURL}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {proInfo.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {proInfo.description}
          </Typography>
          <br />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: "bold" }}
          >
            Price: {proInfo.price}/-
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: "bold" }}
          >
            Available Quantity: {proInfo.availableItems}
          </Typography>
        </CardContent>
        {!isAdmin() && (
          <CardActions>
            <Button size="small" onClick={() => addItemHandler(proInfo)}>
              Add to cart
            </Button>
          </CardActions>
        )}
      </Card>
    </Container>
  );
}
