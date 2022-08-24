import { configureStore } from "@reduxjs/toolkit";

import flashcardItemsReducer from './flashcardsItems-slice'

const store = configureStore({
    reducer:{
        items: flashcardItemsReducer
    }
})
export default store;