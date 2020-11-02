import React from 'react';
import { StyleSheet, View, Text } from 'react-native'

export default Display = props => {

    return (
        <View style={props.style}>
            <Text style={{color: props.textColor, fontSize: props.fontSize, fontWeight: props.isBold ? '900' : '300'}}>{props.text}</Text>
        </View>
    )
}