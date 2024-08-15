import { createSlice } from "@reduxjs/toolkit"

const initialState: number[] = [26, 2, 1996]

const guestSlice = createSlice({
    name: "guest",
    initialState,
    reducers: {
        show: (state, action) => {
            console.log(
                `ini dari action ${state[action.payload]} dalam reducer`
            )
        }
    }
})

export const { show } = guestSlice.actions
export default guestSlice.reducer
