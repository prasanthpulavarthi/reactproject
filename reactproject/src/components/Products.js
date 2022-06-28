import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import {
  getProducts,
  deleteProduct,
  searchProducts,
  getProductsbyId,
} from "../service/Product";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { updateCart } from "../redux/Counter";
import { isAdmin } from "../service/Auth";

import Pagination from "@mui/material/Pagination";

export default function Products() {
  const [proData, setData] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageRecords, setPageRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const location = useLocation();

  const itemPerPage = 3;

  const pagesCount = Math.ceil(proData.length / itemPerPage);

  useEffect(() => {
    location.search && searchProducts(location.search).then((res) => {
      if (res.data.err == 0) {
        setData(res.data.prodata);
      }
    });
  }, [location.search]);

  useEffect(() => {
    getProducts().then((res) => {
      setData(res.data.prodata);
    });
  }, []);

  useEffect(() => {
    getPageRecords(currentPage);
  }, [proData]);

  const delPro = (id) => {
    if (window.confirm("Do u want to delete ?")) {
      deleteProduct(id).then((res) => {
        if (res.data) {
          alert("Product Deleted");
          let data = proData.filter((pro) => pro._id != id);
          setData(data);
        }
      });
    }
  };

  const getPageRecords = (_currentPage) => {
    const begin = (_currentPage - 1) * itemPerPage;
    const end = begin + itemPerPage;
    setCurrentPage(_currentPage);
    setPageRecords(proData.slice(begin, end));
  };

  const handleChange = (e, pageNumber) => {
    getPageRecords(pageNumber);
  };

  const addToCart = (id) => {
    getProductsbyId(id)
      .then((res) => {
        if (res) {
          if (localStorage.getItem("product") != undefined) {
            let arr = JSON.parse(localStorage.getItem("product"));
            if (arr.some((item) => id == item._id)) {
              alert("product already exist in cart");
            } else {
              arr.push(res.data);
              localStorage.setItem("product", JSON.stringify(arr));
              alert("product added to cart");
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
      <h2>Products</h2>
      <Grid container spacing={2}>
        {pageRecords.map((item) => (
          <Grid item xs={4} key={item._id}>
            <Card sx={{ maxWidth: 345, marginTop: "10px" }}>
              <CardMedia
                component="img"
                height="250"
                image={item.imageURL}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: {item.price}/-
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => navigate(`/product-details/${item._id}`)}
                >
                  Info
                </Button>

                {isAdmin() ? (
                  <Button size="small" onClick={() => delPro(item._id)}>
                    Delete
                  </Button>
                ) : (
                  <Button size="small" onClick={() => addToCart(item._id)}>
                    Add to cart
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div style={{'display':'flex', 'justifyContent': 'center'}}>
        <Pagination count={pagesCount} onChange={handleChange}></Pagination>
      </div>
    </Container>
  );
}
