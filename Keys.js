import React from 'react';
import { StyleSheet, View, Text, useWindowDimensions, TouchableHighlight } from 'react-native';

export default Keys = props => {
    const { width, height } = useWindowDimensions();
    const char = props.isCaptial ? props.char.toUpperCase() : props.char.toLowerCase()
    return props.char === 'spacebar' ?
        <TouchableHighlight style={styles.spaceKey, { width: width * 0.8 }} onPress={() => props.onType(' ')} underlayColor="black" >
            <View style={styles.spaceKey}>
                <Text style={styles.keyText}> </Text>
            </View>
        </TouchableHighlight> :
        <TouchableHighlight style={styles.key, { width: width / 14, margin: 2 }} onPress={() => props.onType(char)} underlayColor="black" >
            <View style={styles.key}>
                {
                    props.char === 'backspace' || props.char === 'shift' ? <Text style={styles.keyText}>{props.char === 'backspace' ? '⇦' : '⇪'}</Text> : <Text style={styles.keyText}>{char}</Text>
                }
            </View>
        </TouchableHighlight>
}

const styles = StyleSheet.create({
    key: {
        height: 48,
        alignItems: 'center',
        backgroundColor: '#333',
        borderRadius: 8,
        borderColor: 'black',
        borderWidth: 1,
    },

    spaceKey: {
        alignItems: 'center',
        backgroundColor: '#333',
        borderRadius: 8,
        borderColor: 'black',
        borderWidth: 1,
    },

    keyText: {
        textAlign: 'center',
        padding: 6,
        color: 'white',
        fontSize: 24,
        fontWeight: '700'
    }
});