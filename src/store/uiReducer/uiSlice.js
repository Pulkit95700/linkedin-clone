import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showAddFormVideoBox: false,
    showAddFormImageBox: false,
    showModal: false,
    postRefresh: false,
}

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        toggleImageBox(state){
            state.showAddFormImageBox = !state.showAddFormImageBox;
        },
        toggleVideoBox(state){
            state.showAddFormVideoBox = !state.showAddFormVideoBox;
        },
        closeModal(state){
            state.showModal = false;
            state.showAddFormImageBox = false;
            state.showAddFormVideoBox = false;
        },
        openModal(state){
            state.showModal = true;
        },
        setPostRefresh(state){
            state.postRefresh = !state.postRefresh;
        }
    }
})


export default uiSlice;

export const {toggleImageBox, toggleVideoBox, closeModal, openModal, setPostRefresh} = uiSlice.actions;

export const uiReducer = uiSlice.reducer; 