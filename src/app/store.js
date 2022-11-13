import { configureStore } from "@reduxjs/toolkit";

import flashcardItemsReducer from './flashcardsItems-slice';
import storyReducer from './story-slice';

const store = configureStore({
    reducer:{
        items: flashcardItemsReducer,
        story: storyReducer
    }
})
export default store;