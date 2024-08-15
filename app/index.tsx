import { View, Text, TouchableOpacity } from "react-native"
import React from "react"
import useStore from "../store/store"

export default function index() {
    const data = useStore((state) => state.data)
    console.log(data)

    return (
        <View className="items-center justify-center">
            <Text>Hello world {data}</Text>
        </View>
    )
}
