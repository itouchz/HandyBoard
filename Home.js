import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

export default Home = props => {
    return (
        <View style={styles.container}>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableHighlight style={{ borderColor: '#78281F', ...styles.button }} underlayColor='#FADBD8' onPress={() => props.onSelectKeyboard('QWERTY')}>
                    <Text style={{ color: '#78281F', ...styles.buttonText }}>QWERTY</Text>
                </TouchableHighlight>

                <TouchableHighlight style={{ borderColor: '#0E6251', ...styles.button }} underlayColor='#D1F2EB' onPress={() => props.onSelectKeyboard('HandyBoard')}>
                    <Text style={{ color: '#0E6251', ...styles.buttonText }}>HandyBoard</Text>
                </TouchableHighlight>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
    },

    button: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderRadius: 4,
        padding: 16,
        margin: 64,
        shadowOffset: { width: 1, height: 6 },
        shadowColor: 'grey',
        shadowOpacity: 0.3
    },

    buttonText: {
        fontSize: 24,
        fontWeight: 'bold'
    }
});