import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import AccountStack from './AccountStack'

const Drawer = createDrawerNavigator()

import Account from './Account'
import About from './About'

export default function AccountTab() {
    return (
        <Drawer.Navigator drawerPosition="right" >
            <Drawer.Screen name="Account Screen" component={AccountStack} />            
            <Drawer.Screen name="About" component={About} />
        </Drawer.Navigator>
    )
}
