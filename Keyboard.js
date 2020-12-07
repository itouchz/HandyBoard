import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback } from 'react-native'
import Keys from './Keys'
import ResizeKey from './ResizeKey'
import config from './config.json'

const viewportWidth = Dimensions.get('window').width;


export default Keyboard = props => {
    const splitWidth = viewportWidth * ((1 - props.spacePercentage) / 2)
    const keyWidth = splitWidth / 5.05

    return <View style={styles.container}>
        {
            props.keyboard === 'NO_MORE_QWERTY' ?
                config.QWERTY.map((charList, index) => (
                    <View key={index} style={{ flexDirection: 'row' }}>
                        {
                            charList.map(char => (
                                <Keys for={props.keyboard} key={char} onType={props.onType} isCaptial={props.isCaptial} char={char} />
                            ))
                        }
                    </View>
                ))
                : <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: splitWidth }}>
                        {
                            config.HandyBoard.left.map((charList, index) => (
                                <View key={index} style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                    {
                                        charList.map(char => (
                                            <Keys keyWidth={keyWidth} for={props.keyboard} key={char} onType={props.onType} isCaptial={props.isCaptial} char={char} />
                                        ))
                                    }
                                </View>
                            ))
                        }
                    </View>
                    <TouchableWithoutFeedback onLongPress={props.onToggleReizeKey} delayLongPress={2000}>
                        <View style={{ width: viewportWidth * props.spacePercentage, alignItems: 'center' }}>
                            <ResizeKey showResizeKey={props.showResizeKey} onResizeSpace={props.onResizeSpace} />
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={{ width: splitWidth }}>
                        {
                            config.HandyBoard.right.map((charList, index) => (
                                <View key={index} style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                    {
                                        charList.map(char => (
                                            <Keys keyWidth={keyWidth} for={props.keyboard} key={char} onType={props.onType} isCaptial={props.isCaptial} char={char} />
                                        ))
                                    }
                                </View>
                            ))
                        }
                    </View>
                </View>
        }
    </View >
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        width: '100%',
        backgroundColor: '#111',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
})