import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import Display from './Display'
import Keyboard from './Keyboard'

// Class component for managing events 
export default class HomeScreen extends Component {

    state = {
        targetText: 'video camera with a zoom lens',
        currentText: '',
        isCaptial: false,
    }

    onType = char => {
        if (char.toLowerCase() === 'shift') {
            this.setState({ isCaptial: !this.state.isCaptial })
        } else if (char.toLowerCase() === 'backspace') {
            this.setState({currentText: this.state.currentText.substring(0, this.state.currentText.length - 1)})
        } else {
            this.setState({ currentText: this.state.currentText + char, isCaptial: false })
        }
    }

    onDelete = () => {

    }

    render() {
        return <View style={styles.container}>
            <Display style={styles.display} textColor='black' fontSize={24} text={this.state.targetText} />
            <Display style={styles.preview} textColor='white' fontSize={22} isBold={true} text={this.state.currentText + '_'} />
            <Keyboard onType={this.onType} isCaptial={this.state.isCaptial} />
        </View>
    }
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
    }
});