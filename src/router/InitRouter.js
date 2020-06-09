import React, {useEffect, useState} from 'react'
import { View, Text } from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import { login } from '../redux/actions'

import AuthRouter from './AuthRouter'
import MainRouter from './MainRouter'
import AsyncStorage from '@react-native-community/async-storage'
import { Spinner } from 'native-base'

export default function index() {

    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const username = useSelector((state) => state.auth.username)

    
    useEffect(() => {
        AsyncStorage.getItem("user").then((res) => {
            if(res) {
                const data = JSON.parse(res)
                // console.log(data)
                dispatch(login((data)))
            }
            setLoading(false)   
        })
        .catch(err => console.log({err}))
    }, [])

    if(loading) {
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Spinner color='purple' />
            </View>
            
        )
    }
    // jika sudah login akan membuka app utama (MainRouter)
   // jika belum akan membuka halaman signin (AuthRouter)
    return username ? <MainRouter/> : <AuthRouter/>
}


/*
   - Cek di asyncstorage, apakah ada data user login disana ?
      - jika ada, ambil username dan tokennya
      - simpan username dan token ke redux state
   - useEffect, useSelector, useDispatch
   - optional
      - Tampilkan efek loading spinner saat 
      - import { Spinner } from 'native-base'
*/