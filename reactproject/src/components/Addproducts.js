import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { addProduct } from '../service/Product'
import { useNavigate } from 'react-router-dom'

export default function Addproducts() {
  const navigate=useNavigate();
    const[state,setState]=useState({name:'',category:'',price:'',description:'',imageURL:'',availableItems:""})
    function addItem(event){
        const{name,value}=event.target
        setState({...state,[name]:value})
    }
    const addProducts=(event)=>{
        event.preventDefault()
        addProduct(state).then(res=>{alert("product created successfully");
         navigate("/products")
      })
        .catch(err=>console.log(err))
    }
  return (
    <Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
    <Box component="form" onSubmit={addProducts} noValidate sx={{ mt: 1, maxWidth:"500px" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nameId"
              label="Name"
              name="name"
              autoComplete="name"
              type="text"
              autoFocus
              onChange={addItem}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="category"
              label="category"
              type="text"
              id="categoryId"
              autoComplete="category"
              onChange={addItem}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="price"
              label="price"
              type="number"
              id="priceId"
              autoComplete="price"
              onChange={addItem}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="description"
              label="description"
              type="text"
              id="descriptionId"
              autoComplete="description"
              onChange={addItem}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="imageURL"
              label="imageURL"
              type="text"
              id="imageId"
              autoComplete="imageURL"
              onChange={addItem}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="availableItems"
              label="Available Quantity"
              type="number"
              id="AvialbilityId"
              autoComplete="Avialbility"
              onChange={addItem}
            />
            
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Product
            </Button>
          </Box>
    </Box>
  )
}
