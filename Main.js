import React, { Component } from 'react'
import { View } from 'react-native'
import Display from './Display'
import Keyboard from './Keyboard'

// Class component for managing events 
export default class HomeScreen extends Component {

    render() {
        return <View>
            <Display />
            <Keyboard />
        </View>
    }
}