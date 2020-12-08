import React from 'react';
import { StyleSheet, View, Text } from 'react-native'

export default Display = props => {

    return (
        <View style={props.style}>
            <Text style={{ color: 'grey', position: 'absolute', right: 16, top: 16, fontSize: 10 }}>{props.statusText}</Text>
            <Text style={{ color: props.textColor, fontSize: props.fontSize, fontWeight: props.isBold ? '900' : '300' }}>{props.text}</Text>
        </View>
    )
}