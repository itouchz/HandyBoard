import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import Home from './Home'
import Block from './Block'

// Class component for managing events 
export default class HomeScreen extends Component {

    state = {
        targetText: 'video camera with a zoom lens',
        currentText: '',
        currentScreen: 'home',
        currentKeyboard: 'QWERTY',
        currentBlockState: 'start',
        currentPhraseSet: [],
        currentBlockNo: 1,
        isCaptial: false,
    }

    onType = char => {
        if (char.toLowerCase() === 'shift') {
            this.setState({ isCaptial: !this.state.isCaptial })
        } else if (char.toLowerCase() === 'backspace') {
            this.setState({ currentText: this.state.currentText.substring(0, this.state.currentText.length - 1) })
        } else {
            this.setState({ currentText: this.state.currentText + char, isCaptial: false })
        }
    }

    onSelectKeyboard = keyboard => {
        this.setState({ currentKeyboard: keyboard, currentScreen: 'block', currentBlockState: 'start' })
    }

    onStartBlock = blockNo => {
        // TODO: random update currentPhraseSet
        // TODO: initialize localstorage for currentBlockNo
        this.setState({ currentBlockState: 'ongoing' })
    }

    render() {
        return <View style={styles.container}>
            {
                this.state.currentScreen === 'home'
                    ? <Home onSelectKeyboard={this.onSelectKeyboard} />
                    : <Block currentBlockState={this.state.currentBlockState} onType={this.onType} currentKeyboard={this.state.currentKeyboard}
                        currentText={this.state.currentText} onStartBlock={this.onStartBlock} currentPhraseSet={this.state.currentPhraseSet}
                        currentBlockNo={this.state.currentBlockNo} targetText={this.state.targetText} isCaptial={this.state.isCaptial} />
            }
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