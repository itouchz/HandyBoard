import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import Home from './Home'
import Block from './Block'
import { BLOCK } from './constants'

// Class component for managing events 
export default class HomeScreen extends Component {

    state = {
        targetText: BLOCK[1][0],
        currentText: '',
        currentScreen: 'home',
        currentKeyboard: 'QWERTY',
        currentBlockState: 'start',
        currentPhraseSet: [],
        currentBlockNo: 1,
        currentBlockIndex: 0,
        isCaptial: false,
        interval: 0,
        second: 0,
        errorCount: 0,        
    }

    // Timer
    onStart = () => {
        this.state.interval = setInterval(() => {
         this.setState({
           second: this.state.second + 1,
        })
     }, 1000);
    }
   
    onPause = () => {
        clearInterval(this.state.interval);
    }
    
    onReset = () => {
        this.setState({
          second: 0,
        });
        clearInterval(this.state.interval);
    }

    onType = char => {
        if (char.toLowerCase() === 'shift') {
            this.setState({ isCaptial: !this.state.isCaptial })
        } else if (char.toLowerCase() === 'backspace') {
            this.setState({ currentText: this.state.currentText.substring(0, this.state.currentText.length - 1) })
        } else if (char.toLowerCase() === 'enter') {
            // Done typing, record time, calculate WPM, Accuracy
            var len_text = this.state.currentText.length;
            var min = (this.state.second/60);
            var wpm = (len_text/5)/min;
            wpm = wpm.toFixed(2);
            var accuracy = ((this.state.targetText.length - this.state.errorCount)/this.state.targetText.length)*100;
            accuracy = accuracy.toFixed(2);
            var net_wpm = wpm - (this.state.errorCount/min);
            net_wpm = net_wpm.toFixed(3);
            this.setState({ 
                targetText: "WPM: " + wpm.toString() + 
                " NET_WPM: " + net_wpm.toString() + 
            " Accuracy: " + accuracy.toString() + 
            " Time: " + this.state.second.toString() + " seconds",                
            })
            // Reset Tim
            this.onReset();
        } else {
            this.setState({ currentText: this.state.currentText + char, isCaptial: false })
            var len_text = this.state.currentText.length;
            // console.log(char)
            // console.log(this.state.targetText[len_text])
            if (char != this.state.targetText[len_text]){
                this.setState({ errorCount: this.state.errorCount + 1 })
                
            }
        }

    }

    onSelectKeyboard = keyboard => {
        this.setState({ currentKeyboard: keyboard, currentScreen: 'block', currentBlockState: 'start' })
    }

    onStartBlock = (blockNo,blockIndex,button) => {
        // TODO: random update currentPhraseSet
        // TODO: initialize localstorage for currentBlockNo
        if (button == "next"){
            if (blockIndex <= 4){
                this.setState({
                    currentBlockState: 'ongoing', 
                    targetText: BLOCK[blockNo][blockIndex], 
                    currentBlockIndex: blockIndex,
                    currentText: '',
                    errorCount: 0
                })
            }
            else{
                this.setState({
                    currentBlockState: 'start', 
                    targetText: BLOCK[blockNo+1][0], 
                    currentBlockIndex: 0,
                    currentBlockNo: (this.state.currentBlockNo+1),
                    currentText: '',
                    errorCount: 0
                })
            }
            this.onStart();
        }
        else{
            if (button == "home"){
                this.setState({
                    targetText: BLOCK[1][0],
                    currentText: '',
                    currentScreen: 'home',
                    currentKeyboard: 'QWERTY',
                    currentBlockState: 'start',
                    currentPhraseSet: [],
                    currentBlockNo: 1,
                    currentBlockIndex: 0,
                    isCaptial: false,
                    interval: 0,
                    second: 0,
                    errorCount: 0,        
                })
            }
            else{
                this.setState({
                    currentBlockState: 'start', 
                    currentText: '',
                    errorCount: 0
                })
            }
            this.onReset();
        }
    }

    render() {
        return <View style={styles.container}>
            {
                this.state.currentScreen === 'home'
                    ? <Home onSelectKeyboard={this.onSelectKeyboard} />
                    : <Block currentBlockState={this.state.currentBlockState} onType={this.onType} currentKeyboard={this.state.currentKeyboard}
                        currentText={this.state.currentText} onStartBlock={this.onStartBlock} currentPhraseSet={this.state.currentPhraseSet}
                        currentBlockNo={this.state.currentBlockNo} targetText={this.state.targetText} isCaptial={this.state.isCaptial}
                        currentBlockIndex={this.state.currentBlockIndex} />
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