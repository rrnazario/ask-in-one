import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

interface NavigationState {
    currentPage: number
}

const initialState : NavigationState = { 
    currentPage: 0 
}


export const NavigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        changePage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
    }
})

export const { changePage } = NavigationSlice.actions
export const selectCurrentPage = (state: RootState) => state.navigate.currentPage;

export default NavigationSlice.reducer