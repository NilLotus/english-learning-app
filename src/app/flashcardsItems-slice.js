import { createSlice } from "@reduxjs/toolkit";

export const flashcardsItemsSlice = createSlice({
  name: "items",
  initialState: {words : []},
  reducers: {
    add(state, action) {
      const itemIndex = state.words.findIndex((item) => {
        return item.id === action.payload.id;
      });
      if (itemIndex >= 0) {
        /// add an error message
        console.log('repeatitive');
        return;
      } else {
        state.words.push(action.payload);
      }
    },
    replace(state, action) {
      state.words = action.payload;
    },
    // remove() {},
    // improve() {},
  },
});

export default flashcardsItemsSlice.reducer;
export const flashcardsActions = flashcardsItemsSlice.actions;
