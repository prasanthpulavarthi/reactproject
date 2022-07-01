import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, CardMedia, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useSelector } from "react-redux";
import { cartActions } from "../redux/Counter";

export default function Cart(props) {
  const cartPrice = useSelector((state) => state.cart.totalPrice);
  const totalCartItems = useSelector((state) => state.cart.totalQuantity);
  const cartItems = useSelector((state) => state.cart.items);

  let dispatch = useDispatch();

  const removeItemHandler = (item) => {
    dispatch(cartActions.reduceItemInCart(item.id));
  };

  const addItemHandler = (item) => {
    dispatch(cartActions.addItemToCart(item));
  };

  useEffect(() => {}, []);

  const deleteItem = (item) => {
    dispatch(cartActions.deleteItemFromCart(item.id));
  };
  return (
    <Container sx={{ mt: 5 }}>
      <h2>Cart</h2>
      {totalCartItems == 0 ? (
        <h2 style={{ textAlign: "center" }}>Cart is Empty</h2>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              {cartItems.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    width="200"
                    height="100"
                  >
                    <CardMedia
                      component="img"
                      image={row.imageURL}
                      alt="green iguana"
                    />
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right" width="20">
                    <button type="button" onClick={() => addItemHandler(row)}>
                      +
                    </button>
                  </TableCell>

                  <TableCell width="80" align="center">
                    {row.quantity}
                  </TableCell>
                  <TableCell align="left" width="20">
                    <button
                      type="button"
                      onClick={() => removeItemHandler(row)}
                    >
                      -
                    </button>
                  </TableCell>

                  <TableCell align="right">
                    <Button type="button" onClick={() => deleteItem(row)}>
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell align="right">Price:{row.totalPrice}/-</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", fontSize: "20px" }}>
                  Total Amount: {cartPrice}/-
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
