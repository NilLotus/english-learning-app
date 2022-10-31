import { createSlice } from "@reduxjs/toolkit";

export const flashcardsItemsSlice = createSlice({
  name: "items",
  initialState: { words: [], userId: null, isLoading: true },
  reducers: {
    add(state, action) {
      state.userId = localStorage.getItem("userName").split(".")[0];
      state.words.push(action.payload);
    },
    replace(state, action) {
      state.words = action.payload.data;
      state.isLoading = action.payload.isLoading;
    },
    clear(state) {
      state.words = [];
      state.userId = null;
      state.isLoading = false
    },
    remove(state,action){
      const itemIndex = state.words.findIndex((item) => {
        return item.word === action.payload;
      });
      state.words.splice(itemIndex,1)
    },
    correct(state, action) {
      const itemIndex = state.words.findIndex((item) => {
        return item.word === action.payload;
      });
      state.words[itemIndex] = {
        ...state.words[itemIndex],
        correct: ++state.words[itemIndex]["correct"],
        level: state.words[itemIndex]["level"] + 0.5,
        view:
          state.words[itemIndex]["wrong"] + state.words[itemIndex]["correct"],
      };
    },
    wrong(state, action) {
      const itemIndex = state.words.findIndex((item) => {
        return item.word === action.payload;
      });

      state.words[itemIndex] = {
        ...state.words[itemIndex],
        wrong: ++state.words[itemIndex]["wrong"],
        level:
          state.words[itemIndex]["level"] > 0
            ? Math.floor(state.words[itemIndex]["level"])
            : 0,
        view:
          state.words[itemIndex]["wrong"] + state.words[itemIndex]["correct"],
      };
    },
    updateNote(state, action){
      const index = state.words.findIndex(i => i.key ===action.payload['key']);
      const newNote = action.payload['note'];
      state.words[index]['note'] = newNote
    }
  },
});

export default flashcardsItemsSlice.reducer;
export const flashcardsActions = flashcardsItemsSlice.actions;
