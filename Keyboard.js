import React from 'react';
import { View } from 'react-native';
import Keys from './Keys'
import ControlKey from './ControlKey'

export default Keyboard = props => {
    return <View>
        <View style={{ alignContent: "space-between"}}><Keys /><ControlKey /></View>
    </View>
}