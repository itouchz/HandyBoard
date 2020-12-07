import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

export default ResizeKey = props => {
    return <View>
        <TouchableHighlight style={{ ...styles.key }} onPress={() => props.onResizeSpace('up')} underlayColor="grey" disabled={!props.showResizeKey}>
            <View>
                <Text style={styles.keyText}>+</Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight style={{ ...styles.key }} onPress={() => props.onResizeSpace('down')} underlayColor="grey" disabled={!props.showResizeKey}>
            <View>
                <Text style={styles.keyText}>-</Text>
            </View>
        </TouchableHighlight>
    </View>
}

const styles = StyleSheet.create({
    key: {
        height: 64,
        // alignItems: 'center',
        // textAlign: 'center',
        backgroundColor: '#222',
        justifyContent: 'center',
        borderRadius: 8,
        borderColor: 'black',
    },

    keyText: {
        textAlign: 'center',
        padding: 6,
        color: 'white',
        fontSize: 24,
        fontWeight: '700'
    }
});