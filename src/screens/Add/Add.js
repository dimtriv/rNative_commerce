import React, {useState, useCallback, useEffect} from 'react'
import { View, Text } from 'react-native'
import {useFocusEffect} from '@react-navigation/native'

const Add = () => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>Add component</Text>
        </View>
    )
}

export default Add
