import { createSlice } from "@reduxjs/toolkit";

export const flashcardsItemsSlice = createSlice({
  name: "items",
  initialState: { words: [], userId: null, isLoading: true },
  reducers: {
    add(state, action) {
      const itemIndex = state.words.findIndex((item) => {
        return item.id === action.payload.id;
      });

      if (itemIndex >= 0) {
        // TODO: add an error message
        console.log("repeatitive");
        return;
      } else {
        state.userId = localStorage.getItem("userName").split(".")[0];
        state.words.push(action.payload);
      }
    },
    replace(state, action) {
      state.words = action.payload.data;
      state.isLoading = action.payload.isLoading;
    },
    clear(state) {
      state.words = [];
      state.userId = null;
    },
    correct(state, action) {
      const itemIndex = state.words.findIndex((item) => {
        return item.id === action.payload;
      });
      state.words[itemIndex] = {
        ...state.words[itemIndex],
        correct: ++state.words[itemIndex]["correct"],
        level:
          state.words[itemIndex]["correct"] > 0 &&
          state.words[itemIndex]["correct"] % 2 === 0
            ? ++state.words[itemIndex]["level"]
            : state.words[itemIndex]["level"],
        view:
          state.words[itemIndex]["wrong"] + state.words[itemIndex]["correct"],
      };
    },
    wrong(state, action) {
      const itemIndex = state.words.findIndex((item) => {
        return item.id === action.payload;
      });
      state.words[itemIndex] = {
        ...state.words[itemIndex],
        wrong: ++state.words[itemIndex]["wrong"],
        level:
          state.words[itemIndex]["level"] > 0
            ? --state.words[itemIndex]["level"]
            : state.words[itemIndex]["level"],
        view:
          state.words[itemIndex]["wrong"] + state.words[itemIndex]["correct"],
      };
    },
  },
});

export default flashcardsItemsSlice.reducer;
export const flashcardsActions = flashcardsItemsSlice.actions;
