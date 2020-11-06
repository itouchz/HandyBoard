import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native'
import Display from './Display'
import Keyboard from './Keyboard'

export default Block = props => {
    return <View style={styles.container}>
        {
            props.currentBlockState === 'start'
                ? <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 72, marginBottom: 16, fontStyle: 'italic' }}>Block No.{props.currentBlockNo}</Text>
                    <TouchableHighlight style={{ ...styles.button }} underlayColor='#eee' onPress={() => props.onStartBlock(props.currentBlockNo)}>
                        <Text style={{ ...styles.buttonText }}>START</Text>
                    </TouchableHighlight>
                </View>
                : <View style={styles.container}>
                    <Display style={styles.display} textColor='black' fontSize={24} text={props.targetText} />
                    <Display style={styles.preview} textColor='white' fontSize={22} isBold={true} text={props.currentText + '_'} />
                    <Keyboard keyboard={props.currentKeyboard} onType={props.onType} isCaptial={props.isCaptial} />
                </View>
        }
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    display: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        paddingLeft: 16,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },

    preview: {
        width: '100%',
        backgroundColor: '#999',
        paddingLeft: 16,
        paddingTop: 16,
        paddingBottom: 16,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
    },

    button: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderRadius: 4,
        paddingHorizontal: 72,
        paddingVertical: 16,
        shadowOffset: { width: 1, height: 6 },
        shadowColor: 'grey',
        shadowOpacity: 0.3
    },

    buttonText: {
        fontSize: 36,
        fontWeight: 'bold'
    }
});