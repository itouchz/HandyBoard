import React from 'react';
import { StyleSheet, View, Text, useWindowDimensions, TouchableHighlight } from 'react-native';

export default Keys = props => {
    const { width, height } = useWindowDimensions();
    const char = props.isCaptial ? props.char.toUpperCase() : props.char.toLowerCase()
    return props.char === 'spacebar' ?
        <TouchableHighlight style={{ width: props.for === 'QWERTY' ? width * 0.8 : width * 0.4, ...styles.spaceKey }} onPress={() => props.onType(' ')} underlayColor="grey" >
            <View>
                <Text style={styles.keyText}> </Text>
            </View>
        </TouchableHighlight> :
        <TouchableHighlight style={{ minWidth: width / 13, margin: 1, ...styles.key }} onPress={() => props.onType(char)} underlayColor="grey" >
            <View>
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
        backgroundColor: '#222',
        borderRadius: 8,
        borderColor: 'black',
        borderWidth: 1,
    },

    spaceKey: {
        alignItems: 'center',
        backgroundColor: '#222',
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