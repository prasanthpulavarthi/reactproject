import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, CardMedia, TextField } from '@mui/material';
import { Container } from '@mui/system';
import { useDispatch } from 'react-redux/es/hooks/useDispatch'
import { updateCart } from '../redux/Counter'
import { useSelector } from 'react-redux';

export default function Cart() {
    const[cartInfo,setCartinfo]=useState([])
    const[istrue,setIstrue]=useState(true)
    const price=useSelector(state=>state.cart.total)
    let dispatch=useDispatch();

    useEffect(()=>{
        if(localStorage.getItem('product')!=undefined){
            let arr=JSON.parse(localStorage.getItem("product"))
            setCartinfo(arr)
            if(arr.length===0){
                setIstrue(true)
            }else{
                setIstrue(false)
            }
        }
    },[])
    const deleteItem=(id)=>{
        if(localStorage.getItem("product")!=undefined){
            let newFilter=cartInfo.filter(items=>id!==items._id)
            localStorage.setItem('product',JSON.stringify(newFilter))
            setCartinfo(newFilter)
            dispatch(updateCart())
        }
    }
  return (
    <Container sx={{mt:5}}>
        <h2>Cart</h2>
        {istrue?(<h2 style={{textAlign:"center"}}>Cart is Empty</h2>):(
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650}} aria-label="simple table">
            <TableBody>
                {cartInfo.map((row) => (
                <TableRow
                    key={row._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row" width="200" height="100">
                    <CardMedia
                        component="img"
                        image={row.imageURL}
                        alt="green iguana"
                    />
                    </TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align='right'>
                    {/* <TextField
                    margin="normal"
                    fullWidth
                    name="quantity"
                    label="Add quantity"
                    type="number"
                    id="quantityId"
                    autoComplete="quantity"
                    /> */}
                    </TableCell>
                    <TableCell align="right">
                        <Button onClick={()=>deleteItem(row._id)}>Delete</Button>
                    </TableCell>
                    <TableCell align="right">Price:{row.price}/-</TableCell>
                </TableRow>
                ))}
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell align='right' sx={{fontWeight:"bold",fontSize:"20px"}}>Total Amount: {price}/-</TableCell>
                </TableRow>
            </TableBody>
            </Table>
            </TableContainer>
        )}
  </Container>
  )
}
