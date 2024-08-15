import { View, Text } from "react-native"
import React from "react"
import { Slot } from "expo-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Provider } from "react-redux"
import store from "../redux/store"

const MainLayout = () => {
    return <Slot />
}

const queryClient = new QueryClient()

function RootLayout() {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <MainLayout />
            </QueryClientProvider>
        </Provider>
    )
}

export default RootLayout
