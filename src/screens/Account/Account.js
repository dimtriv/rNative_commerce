import React, {useState,  useCallback} from 'react'
import { View, Image } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Text} from 'native-base'
import axios from '../../config/api'
import { useFocusEffect } from '@react-navigation/native'
import Loading from '../Loading/Loading'


const Account = () => {

    const dispatch = useDispatch()
    const username = useSelector(state => state.auth.username)
    const [image, setImage] = useState('')
    // console.log(image)

    const onSignOut = () => {
        // hapus data async storage
        AsyncStorage.removeItem("user")
        .then(res => {
            // hapusdata di redux state
            dispatch({type: "LOGOUT"})
        }, [])
    }

    useFocusEffect(
        useCallback(() => {
            
            axios.get(`/user/avatar/${username}`)
            // data ada ditempat yg berbeda dengan d web
            .then(res => setImage(res.request.responseURL)) 
            .catch(err => console.log(err))
        }, [])
    )

    return image ?  
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>Account component</Text>
            {/* Tampilkan foto avatar */}
            {/* wajib pakai style, kalau tidak, tidak keluar */}
            <Image 
                style={{ width: 150, height: 150}}
                source={{
                    uri: `${image}`,
                }}
            />

            <Button block onPress={onSignOut} >
                <Text>Sign Out</Text>
            </Button>
        </View>
    :   
        <Loading />
}

export default Account

// Tampilkan avatar di antara title dan tombol sign out
// import { Image } from 'react-native'
// useFocusEffect, useState
// axios 