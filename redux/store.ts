import { configureStore } from "@reduxjs/toolkit"
import guestReducer from "./slice/guestSlice"

const store = configureStore({
    reducer: {
        guest: guestReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
