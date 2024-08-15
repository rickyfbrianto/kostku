import { View, Text, TouchableOpacity } from "react-native"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { show } from "@/redux/slice/guestSlice"
import { RootState } from "@/redux/store"

export default function index() {
    const dispatch = useDispatch()
    const data = useSelector((state: RootState) => state.guest)

    const showSaya = () => {
        dispatch(show(2))
    }

    return (
        <View className="items-center justify-center">
            <TouchableOpacity
                className="mt-6 p-2 bg-slate-300"
                onPress={showSaya}>
                <Text>Click saya</Text>
            </TouchableOpacity>
        </View>
    )
}
