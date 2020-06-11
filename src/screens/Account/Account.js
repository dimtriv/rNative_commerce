import React, {useState,  useCallback} from 'react'
import { View, Image, Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import {useDispatch, useSelector} from 'react-redux'
import {
    Button, Text, Container, Header, Content, ListItem,
    Card, CardItem, Thumbnail, Left, Body, Right
} from 'native-base'
import axios from '../../config/api'
import { useFocusEffect } from '@react-navigation/native'
import Loading from '../Loading/Loading'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { btn, bg } from '../../styles'


const Account = ({navigation}) => {

    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const [avatarlink, setAvatarlink] = useState('')
    const [user, setUser] = useState({})
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
            const config ={headers: {Authorization: token}}
            axios.get(`/user`, config)
            // data ada ditempat yg berbeda dengan d web
            .then(res => {
                setUser(res.data.user)
                setAvatarlink(`${res.data.avatarlink}?unq=${new Date()}`)
        }) 
            .catch(err => console.log(err))
        }, [])
    )

    return avatarlink ?  
    <Container style={{backgroundColor: '#e0d7e2' }} >
        <Content>

            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={{uri: avatarlink}} />
                        <Body>
                            <Text>{user.name}</Text>
                            <Text note>{user.email}</Text>
                        </Body>
                    </Left>
                        <Icon size={25} name="dots-horizontal" onPress={() => navigation.openDrawer()} />
                </CardItem>
                <Button block style={[btn, bg.purplesoft, {height: 25}]} onPress={() => navigation.navigate('EditAccount')} >
                    <Text>Edit Profile</Text>
                </Button>
            </Card>

            <Card style={{marginTop: 20}} >
            <ListItem icon onPress={() => Alert.alert("", "List")}>
                <Left>
                    <Button style={{ backgroundColor: "#7bb9fc" }}>
                        <Icon size={23} name="view-list" />
                    </Button>
                </Left>
                <Body>
                    <Text>Products</Text>
                </Body>
            </ListItem>
            <ListItem icon onPress={() => Alert.alert("", "List")}>
                <Left>
                    <Button style={{ backgroundColor: "#8af96b" }}>
                        <Icon size={23} name="cart-outline" />
                    </Button>
                </Left>
                <Body>
                    <Text>Transaction</Text>
                </Body>
            </ListItem>
            <ListItem icon onPress={() => Alert.alert("", "List")}>
                <Left>
                    <Button style={{ backgroundColor: "#f96b6d" }}>
                        <Icon size={23} name="logout" />
                    </Button>
                </Left>
                <Body>
                    <Text>Sign Out</Text>
                </Body>
            </ListItem>
            </Card>

        </Content>
    </Container>
    :   
        <Loading />
}

export default Account

// Tampilkan avatar di antara title dan tombol sign out
// import { Image } from 'react-native'
// useFocusEffect, useState
// axios 