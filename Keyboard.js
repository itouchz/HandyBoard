import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import Keys from './Keys'
import ControlKey from './ControlKey'
import config from './config.json'

export default Keyboard = props => {
    return <View style={styles.container}>
        {
            props.keyboard === 'QWERTY' ?
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
                    <View style={styles.splitContainer}>
                        {
                            config.HandyBoard.left.map((charList, index) => (
                                <View key={index} style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                    {
                                        charList.map(char => (
                                            <Keys for={props.keyboard} key={char} onType={props.onType} isCaptial={props.isCaptial} char={char} />
                                        ))
                                    }
                                </View>
                            ))
                        }
                    </View>
                    <View style={{ width: '20%', alignItems: 'center' }}>
                        <Text style={{ color: 'white' }}>- space -</Text>
                    </View>
                    <View style={styles.splitContainer}>
                        {
                            config.HandyBoard.right.map((charList, index) => (
                                <View key={index} style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                    {
                                        charList.map(char => (
                                            <Keys for={props.keyboard} key={char} onType={props.onType} isCaptial={props.isCaptial} char={char} />
                                        ))
                                    }
                                </View>
                            ))
                        }
                    </View>
                </View>
        }
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        width: '100%',
        backgroundColor: '#111',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },

    splitContainer: {
        width: '40%'
    }
})