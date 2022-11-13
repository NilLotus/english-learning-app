import { createSlice } from "@reduxjs/toolkit";

export const storySlice = createSlice({
    name: 'story',
    initialState:{ stories: [], isLoading: true },
    reducers: {
        replace(state, action){
            state.stories = action.payload.data;
            state.isLoading = action.payload.isLoading;
        },
        update(state, action){
            const index = state.stories.findIndex(story => story.id === action.payload.id);
            state.stories[index].read = !state.stories[index].read;
        }
    }
})

export default storySlice.reducer;
export const storyAction = storySlice.actions;