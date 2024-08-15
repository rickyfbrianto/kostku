import { View, Text, TouchableOpacity } from "react-native"
import React from "react"
import { useAuth, useClerk, useUser } from "@clerk/clerk-expo"

export default function home() {
    const { isLoaded, user } = useUser()
    const { signOut } = useAuth()

    console.log(user?.username)

    if (!isLoaded) return

    const handleLogout = () => {
        signOut()
    }

    return (
        <View className="flex-1 items-center justify-center">
            <Text>Selamat datang user {user?.username}</Text>
            <TouchableOpacity
                className="p-2 bg-red-400 rounded-md"
                onPress={handleLogout}>
                <Text>Sign Out</Text>
            </TouchableOpacity>
        </View>
    )
}
