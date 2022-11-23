import { createSlice } from "@reduxjs/toolkit";

export const storySlice = createSlice({
    name: 'story',
    initialState:{ stories: [],detailPerUser:[], isLoading: true },
    reducers: {
        replace(state, action){
            state.stories = action.payload.data;
            state.isLoading = action.payload.isLoading;
        },
        replaceDetail(state, action){
            state.detailPerUser = action.payload.data;
            state.isLoading = action.payload.isLoading;
        },
        addDetail(state, action){
            state.detailPerUser.push(action.payload);
        },
        updateDetail(state, action){
            const index = state.detailPerUser.findIndex(detail => detail.id === action.payload.id);
            state.detailPerUser[index].read = action.payload.read;
        }
    }
})

export default storySlice.reducer;
export const storyAction = storySlice.actions;