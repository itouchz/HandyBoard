import React from 'react';
import { StyleSheet, View, Text, useWindowDimensions, TouchableHighlight } from 'react-native';

export default Keys = props => {
    const { width, height } = useWindowDimensions();
    const char = props.isCaptial ? props.char.toUpperCase() : props.char.toLowerCase()
    return props.char === 'spacebar' ?
        <TouchableHighlight style={{ width: props.for === 'QWERTY' ? width * 0.85 : props.keyWidth * 5, ...styles.spaceKey }} onPress={() => props.onType(' ')} underlayColor="grey" >
            <View>
                <Text style={styles.keyText}> </Text>
            </View>
        </TouchableHighlight> :
        <TouchableHighlight style={{ width: props.for === 'QWERTY' && props.char === 'enter' ? 88 : props.for === 'QWERTY' ? width / 11 : props.char === 'enter' ? props.keyWidth * 2 : props.keyWidth, ...styles.key }} onPress={() => props.onType(char)} underlayColor="grey" >
            <View>
                {
                    props.char === 'backspace' || props.char === 'shift' ? <Text style={styles.keyText}>{props.char === 'backspace' ? '⇦' : '⇪'}</Text> : <Text style={styles.keyText}>{props.char === 'enter' ? 'ENTER' : char}</Text>
                }
            </View>
        </TouchableHighlight>
}

const styles = StyleSheet.create({
    key: {
        height: 64,
        // alignItems: 'center',
        // textAlign: 'center',
        backgroundColor: '#222',
        justifyContent: 'center',
        borderRadius: 4,
        borderColor: 'black',
        borderWidth: 1
    },

    spaceKey: {
        alignItems: 'center',
        backgroundColor: '#222',
        borderRadius: 4,
        borderColor: 'black',
        borderWidth: 1,
        height: 52
    },

    keyText: {
        textAlign: 'center',
        padding: 6,
        color: 'white',
        fontSize: 24,
        fontWeight: '700',
    }
});