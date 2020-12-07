import React from 'react';
import { StyleSheet, View, Text, Modal, TouchableHighlight } from 'react-native'
import Display from './Display'
import Keyboard from './Keyboard'

export default Block = props => {
    return <View style={styles.container}>
        <Modal animationType="fade" transparent={true} visible={props.showCompleteModal} supportedOrientations={['portrait', 'landscape']}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{props.resultText}</Text>
                    <TouchableHighlight style={{ ...styles.button, backgroundColor: 'black', borderWidth: 0 }} underlayColor='#777' onPress={() => { props.onNextPhrase(); }} >
                        <Text style={{ ...styles.buttonText, color: 'white' }}>NEXT</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </Modal>
        {
            props.currentBlockState === 'start'
                ? <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 72, marginBottom: 16, fontStyle: 'italic' }}>Adjustment Block</Text>
                    <TouchableHighlight style={{ ...styles.button }} underlayColor='#eee' onPress={props.onStartBlock}>
                        <Text style={{ ...styles.buttonText }}>START</Text>
                    </TouchableHighlight>
                </View>
                : props.currentBlockState === 'practice' ?
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 72, marginBottom: 16, fontStyle: 'italic' }}>Practice Block</Text>
                        <TouchableHighlight style={{ ...styles.button }} underlayColor='#eee' onPress={props.onStartBlock}>
                            <Text style={{ ...styles.buttonText }}>START</Text>
                        </TouchableHighlight>
                    </View>
                    : props.currentBlockState === 'task' ?
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 72, marginBottom: 16, fontStyle: 'italic' }}>Block No.{props.currentBlockNo - 2}</Text>
                            <TouchableHighlight style={{ ...styles.button }} underlayColor='#eee' onPress={props.onStartBlock}>
                                <Text style={{ ...styles.buttonText }}>START</Text>
                            </TouchableHighlight>
                        </View>
                        : props.currentBlockState === 'end' ?
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ fontSize: 48, marginBottom: 16, fontStyle: 'italic' }}>Completed!</Text>
                                <Text style={{ fontSize: 24, marginBottom: 16 }}> 🙏🏻 Thank you 🙏🏻 </Text>
                                <TouchableHighlight style={{ ...styles.button }} underlayColor='#eee' onPress={props.onBackHome}>
                                    <Text style={{ ...styles.buttonText }}>HOME</Text>
                                </TouchableHighlight>
                            </View>
                            : <View style={styles.container}>
                                <Display style={styles.display} textColor='black' fontSize={24} text={props.targetText} />
                                <Display style={styles.preview} textColor='white' fontSize={24} isBold={true} text={props.currentText + '_'} />
                                <Keyboard keyboard={props.currentKeyboard} onType={props.onType} isCaptial={props.isCaptial} onToggleReizeKey={props.onToggleReizeKey}
                                    spacePercentage={props.spacePercentage} onResizeSpace={props.onResizeSpace} showResizeKey={props.showResizeKey} />
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
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },

    modalView: {
        backgroundColor: "white",
        borderRadius: 8,
        paddingVertical: 24,
        paddingHorizontal: 32,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },

    openButton: {
        backgroundColor: "#000",
        borderRadius: 4,
        paddingVertical: 16,
        paddingHorizontal: 32,
        elevation: 2
    },

    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 24
    },

    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});