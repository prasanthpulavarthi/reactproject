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
import { updateCart } from "../redux/Counter";
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
  const addToCart = (id) => {
    getProductsbyId(id)
      .then((res) => {
        if (res) {
          if (localStorage.getItem("product") != undefined) {
            let arr = JSON.parse(localStorage.getItem("product"));
            if (arr.some((items) => id == items._id)) {
              alert("product already added");
            } else {
              arr.push(res.data);
              localStorage.setItem("product", JSON.stringify(arr));
              alert("product added");
              dispatch(updateCart());
            }
          } else {
            let arr = [];
            arr.push(res.data);
            localStorage.setItem("product", JSON.stringify(arr));
            alert("product added");
            dispatch(updateCart());
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
          <br/>
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
            <Button size="small" onClick={() => addToCart(proInfo._id)}>
              Add to cart
            </Button>
          </CardActions>
        )}
      </Card>
    </Container>
  );
}
