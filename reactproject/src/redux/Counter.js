import { createSlice } from "@reduxjs/toolkit";

function setDataInStorage(state) {
  localStorage.setItem("products", JSON.stringify(state.items));
  localStorage.setItem("totalQuantity", state.totalQuantity);
  localStorage.setItem("totalPrice", state.totalPrice);
}

export function clearDataInStorage() {
  localStorage.setItem("products", "[]");
  localStorage.setItem("totalQuantity", 0);
  localStorage.setItem("totalPrice", 0);
}

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: JSON.parse(localStorage.getItem("products")) || [],
    totalQuantity: localStorage.getItem("totalQuantity") || 0,
    totalPrice: localStorage.getItem("totalPrice") || 0,
  },
  reducers: {
    addItemToCart(state, action) {
      // console.log(action.payload);
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === (newItem._id ?? newItem.id)
      );
      state.totalQuantity++;

      if (!existingItem) {
        state.items.push({
          id: newItem._id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.name,
          imageURL: newItem.imageURL,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }

      state.totalPrice = state.items.reduce(
        (acc, item) => acc + item.totalPrice,
        0
      );

      setDataInStorage(state);
    },
    reduceItemInCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }

      state.totalQuantity = state.items.reduce(
        (acc, item) => acc + item.quantity,
        0
      );

      state.totalPrice = state.items.reduce(
        (acc, item) => acc + item.totalPrice,
        0
      );

      setDataInStorage(state);
    },
    deleteItemFromCart(state, action) {
      const id = action.payload;

      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity = state.totalQuantity - existingItem.quantity;
      state.items = state.items.filter((item) => item.id !== id);

      state.totalPrice = state.items.reduce(
        (acc, item) => acc + item.totalPrice,
        0
      );

      setDataInStorage(state);
    },
    clearCart(state, action) {
      state.items = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;

      setDataInStorage(state);
    },
  },
});
export const cartActions = cartSlice.actions;

export default cartSlice;
