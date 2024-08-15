import React, { useEffect } from "react"
import { Slot, useRouter, useSegments } from "expo-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo"
import * as SecureStore from "expo-secure-store"
import * as eva from "@eva-design/eva"
import { ApplicationProvider, Layout, Text } from "@ui-kitten/components"
import { View } from "react-native"

const MainLayout = () => {
    const { isLoaded, isSignedIn } = useAuth()
    const router = useRouter()
    const segments = useSegments()

    useEffect(() => {
        if (!isLoaded) return
        const isAuth = segments[0] === "(auth)"

        if (isSignedIn && !isAuth) {
            router.replace("/(auth)/home")
        } else if (!isSignedIn) {
            router.replace("/(public)/login")
        }
    }, [isSignedIn])

    return <Slot />
}

const queryClient = new QueryClient()

const tokenCache = {
    async getToken(key: string) {
        try {
            const item = await SecureStore.getItemAsync(key)
            if (item) {
                console.log(`${key} was used 🔐 \n`)
            } else {
                console.log("No values stored under key: " + key)
            }
            return item
        } catch (error) {
            console.error("SecureStore get item error: ", error)
            await SecureStore.deleteItemAsync(key)
            return null
        }
    },
    async saveToken(key: string, value: string) {
        try {
            return SecureStore.setItemAsync(key, value)
        } catch (err) {
            return
        }
    }
}

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
    throw new Error(
        "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
    )
}

function RootLayout() {
    return (
        <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
            <ClerkLoaded>
                <QueryClientProvider client={queryClient}>
                    <ApplicationProvider {...eva} theme={eva.light}>
                        <MainLayout />
                    </ApplicationProvider>
                </QueryClientProvider>
            </ClerkLoaded>
        </ClerkProvider>
    )
}

export default RootLayout
