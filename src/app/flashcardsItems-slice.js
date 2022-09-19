import { createSlice } from "@reduxjs/toolkit";

export const flashcardsItemsSlice = createSlice({
  name: "items",
  initialState: {words : [], userId:null},
  reducers: {
    add(state, action) {
      const itemIndex = state.words.findIndex((item) => {
        return item.id === action.payload.id;
      });
      // if(action.payload.user !=)

      if (itemIndex >= 0) {
        // TODO: add an error message
        console.log('repeatitive');
        return;
      } else {
        state.userId = localStorage.getItem("userName").split(".")[0];
        state.words.push(action.payload);
      }
    },
    replace(state, action) {
      // const userId = localStorage.getItem("userName").split(".")[0];
      // if(state.userId === action.payload.id){
        state.words = action.payload.data;
      // }
    },
    clear(state) {
      state.words = [];
      state.userId = null;
    },
    // improve() {},
  },
});

export default flashcardsItemsSlice.reducer;
export const flashcardsActions = flashcardsItemsSlice.actions;
