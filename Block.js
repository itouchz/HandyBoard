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
                    <TouchableHighlight style={{ ...styles.button }} underlayColor='#eee' onPress={() => props.onStartBlock(props.currentBlockNo, props.currentBlockIndex, "next")}>
                        <Text style={{ ...styles.buttonText }}>START</Text>
                    </TouchableHighlight>
                </View>
                : <View style={styles.container}>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableHighlight style={{ ...styles.buttonNext }} underlayColor='#eee' onPress={() => props.onStartBlock(props.currentBlockNo, props.currentBlockIndex,"back")}>
                            <Text style={{ ...styles.buttonText }}>BACK</Text>
                        </TouchableHighlight>

                        <TouchableHighlight style={{ ...styles.buttonNext }} underlayColor='#eee' onPress={() => props.onStartBlock(props.currentBlockNo, props.currentBlockIndex,"home")}>
                            <Text style={{ ...styles.buttonText }}>HOME</Text>
                        </TouchableHighlight>

                        <TouchableHighlight style={{ ...styles.buttonNext }} underlayColor='#eee' onPress={() => props.onStartBlock(props.currentBlockNo, props.currentBlockIndex+1,"next")}>
                            <Text style={{ ...styles.buttonText }}>NEXT</Text>
                        </TouchableHighlight>
                    </View>                
                    
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

    buttonNext: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderRadius: 4,
        paddingHorizontal: 72,
        paddingVertical: 16,
        shadowOffset: { width: 1, height: 6 },
        shadowColor: 'grey',
        shadowOpacity: 0.3,
        alignItems: 'flex-start',
    },

    buttonText: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});