import React from 'react'
import { BrowserRouter as Router , Routes , Route, Navigate } from 'react-router-dom'
import MyAppBar from './components/MyAppBar';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Products from './components/Products';
import ProductDetails from './components/ProductInfo';
import AddProduct from './components/Addproducts';
import { isLoggedIn,isAdmin } from './service/Auth';
import Cart from './components/Cart';
function PrivateRoute({children}){
  const auth=isLoggedIn();
  return auth ?children :<Navigate to="/" />;
}
function AdminPrivateRoute({children}){
  const auth=isLoggedIn();
  const admin=isAdmin();
  return auth && admin ?children :<Navigate to="/" />;
}
export default function App() {
  return (
    <>
      <Router>
        <MyAppBar/>
        <section>
          <Routes>
              <Route path="/" element={<Login/>}/>
              <Route path="/signup" element={<SignUp/>}/>
              <Route path="/products" element={<PrivateRoute>
                <Products/>
              </PrivateRoute>}/>
              <Route path="/addproduct" element={<AdminPrivateRoute>
                <AddProduct/>
              </AdminPrivateRoute>}/>
              <Route path="/product-details/:id" element={<PrivateRoute>
                <ProductDetails/>
              </PrivateRoute>}/>
              <Route path="/cart" element={<PrivateRoute>
                <Cart/>
              </PrivateRoute>}/>

          </Routes>
        </section>
      </Router>
    </>
  )
}
