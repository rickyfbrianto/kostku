import { View, Text, TouchableOpacity } from "react-native"
import React, { useState } from "react"
import { useRouter } from "expo-router"
import { useSignUp } from "@clerk/clerk-expo"
import { Controller, useForm } from "react-hook-form"
import { Input } from "@ui-kitten/components"

export default function register() {
    const { isLoaded, signUp, setActive } = useSignUp()
    const router = useRouter()
    const [pendingVerification, setPendingVerification] = useState(false)

    const form = useForm({
        defaultState: {
            email: "",
            password: "",
            code: ""
        }
    })

    const handleSubmit = async (data) => {
        if (!isLoaded) return

        try {
            await signUp.create({
                emailAddress: data.email,
                password: data.password,
                username: "ricky"
            })

            await signUp.prepareEmailAddressVerification({
                strategy: "email_code"
            })

            setPendingVerification(true)
        } catch (err) {
            console.error(JSON.stringify(err, null, 2))
        }
    }

    const onPressVerify = async (data) => {
        if (!isLoaded) return

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification(
                { code: data.code }
            )

            if (completeSignUp.status === "complete") {
                await setActive({ session: completeSignUp.createdSessionId })
                router.replace("(auth)/home")
            } else {
                console.error(JSON.stringify(completeSignUp, null, 2))
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2))
        }
    }

    return (
        <View className="flex-1 justify-center bg-slate-200">
            <Text>register</Text>
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
                    <Text>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() =>
                        router.replace({ pathname: "(public)/login" })
                    }>
                    <Text>Login</Text>
                </TouchableOpacity>
            </View>

            {pendingVerification && (
                <>
                    <Controller
                        name="code"
                        control={form.control}
                        render={({ field: { value, onChange } }) => (
                            <Input
                                value={value}
                                placeholder="Code..."
                                onChangeText={(val) => onChange(val)}
                            />
                        )}
                    />

                    <TouchableOpacity
                        onPress={form.handleSubmit(onPressVerify)}>
                        <Text>Login</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    )
}
