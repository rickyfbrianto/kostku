import { View, Text, TextInput, TouchableOpacity } from "react-native"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { Input } from "@ui-kitten/components"
import { SignedIn, useSignIn } from "@clerk/clerk-expo"
import { useRouter } from "expo-router"

export default function login() {
    const { signIn, setActive, isLoaded } = useSignIn()
    const router = useRouter()

    const form = useForm({
        defaultState: {
            email: "",
            password: ""
        }
    })

    const handleSubmit = async (data) => {
        if (!isLoaded) return

        try {
            const signInAttempt = await signIn.create({
                identifier: data.email,
                password: data.password
            })

            if (signInAttempt.status === "complete") {
                await setActive({ session: signInAttempt.createdSessionId })
                router.replace("/")
            } else {
                console.error(JSON.stringify(signInAttempt, null, 2))
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2))
        }
    }

    return (
        <View className="flex-1 justify-center bg-slate-200">
            <Text>Login</Text>
            <View className="w-full px-8 py-4 bg-slate-100">
                <Controller
                    name="email"
                    control={form.control}
                    render={({ field: { value, onChange } }) => (
                        <Input
                            label="Email"
                            placeholder="Email"
                            value={value}
                            onChangeText={(e) => onChange(e)}
                        />
                    )}
                />
                <Controller
                    name="password"
                    control={form.control}
                    render={({ field: { value, onChange } }) => (
                        <Input
                            label="Password"
                            placeholder="Password"
                            value={value}
                            onChangeText={(e) => onChange(e)}
                        />
                    )}
                />
                <TouchableOpacity
                    className="my-2 p-2 bg-green-500 rounded-md"
                    onPress={form.handleSubmit(handleSubmit)}>
                    <Text>Sign In</Text>
                </TouchableOpacity>
                <View>
                    <TouchableOpacity
                        onPress={() =>
                            router.replace({ pathname: "/(public)/register" })
                        }>
                        <Text>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
