import React from 'react';
import { StyleSheet, View } from 'react-native'
import Keys from './Keys'
import ControlKey from './ControlKey'
import config from './config.json'

export default Keyboard = props => {
    return <View style={styles.container}>
        {
            config.QWERTY.map((charList, index) => (
                <View key={index} style={{ flexDirection: 'row' }}>
                    {
                        charList.map(char => (
                            <Keys key={char} onType={props.onType} isCaptial={props.isCaptial} char={char} />
                        ))
                    }
                </View>
            ))
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
    }
})