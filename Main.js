import React, { Component } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import Home from './Home'
import Block from './Block'
import PhraseSets from './PhraseSets.json'

// Class component for managing events 
export default class HomeScreen extends Component {

    state = {
        targetText: '',
        currentText: '',
        currentScreen: 'home',
        currentKeyboard: 'QWERTY',
        currentBlockState: 'start',
        currentPhraseSet: [],
        currentBlockNo: 1,
        currentBlockIndex: 0,
        isCaptial: false,
        showCompleteModal: false,
        interval: 0,
        resultText: '',
        second: 0,
        errorCount: 0,
        spacePercentage: 0.2
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
        this.setState({ second: 0, });
        clearInterval(this.state.interval);
    }

    onResizeSpace = action => {
        console.log(this.state.spacePercentage)
        if (this.state.spacePercentage > 0 && this.state.spacePercentage < 1) {
            if (action === 'up') {
                this.setState({ spacePercentage: this.state.spacePercentage + 0.01 })
            } else {
                this.setState({ spacePercentage: this.state.spacePercentage - 0.01 })
            }
        } else {
            this.setState({ spacePercentage: 0.2 })
        }
    }

    onType = char => {
        if (char.toLowerCase() === 'shift') {
            this.setState({ isCaptial: !this.state.isCaptial })
        } else if (char.toLowerCase() === 'backspace') {
            this.setState({ currentText: this.state.currentText.substring(0, this.state.currentText.length - 1) })
        } else if (char.toLowerCase() === 'enter') {
            // Done typing, record time, calculate WPM, Accuracy
            let [wpm, net_wpm, accuracy] = [0, 0, 0]

            if (this.state.currentText.length > 0) {
                let len_text = this.state.currentText.length;
                let min = (this.state.second / 60);

                wpm = (len_text / 5) / min;
                wpm = wpm.toFixed(2);
                accuracy = ((this.state.targetText.length - this.state.errorCount) / this.state.targetText.length) * 100;
                accuracy = accuracy.toFixed(2);
                net_wpm = wpm - (this.state.errorCount / min);
                net_wpm = net_wpm.toFixed(3);
            }

            this.setState({
                showCompleteModal: true,
                resultText: "WPM: " + wpm.toString() +
                    " NET_WPM: " + net_wpm.toString() +
                    " ACC: " + accuracy.toString() +
                    " Time: " + this.state.second.toString() + " seconds",
            })

            // Reset Time
            this.onReset();
        } else {
            this.setState({ currentText: this.state.currentText + char, isCaptial: false })
            var len_text = this.state.currentText.length;
            // console.log(char)
            // console.log(this.state.targetText[len_text])
            if (char != this.state.targetText[len_text]) {
                this.setState({ errorCount: this.state.errorCount + 1 })

            }
        }

    }

    onSelectKeyboard = keyboard => {
        this.setState({ currentKeyboard: keyboard, currentScreen: 'block', currentBlockState: 'start' })
    }

    onStartBlock = () => {
        let blockNo = this.state.currentBlockNo
        let currentPhraseSet = PhraseSets.phrases[blockNo].sort(() => 0.5 - Math.random()).slice(0, 5)
        this.setState({
            currentBlockState: 'ongoing', targetText: currentPhraseSet[0], currentBlockIndex: 0,
            currentBlockNo: blockNo, currentPhraseSet, currentText: '', errorCount: 0
        })
        this.onStart()
    }

    onNextPhrase = () => {
        let blockIndex = this.state.currentBlockIndex + 1
        if (blockIndex <= 4) {
            this.setState({
                currentBlockState: 'ongoing',
                targetText: this.state.currentPhraseSet[blockIndex],
                currentBlockIndex: blockIndex,
                currentText: '',
                errorCount: 0,
                showCompleteModal: false
            })
            this.onStart()
        } else {
            this.setState({ showCompleteModal: false })
            this.onNextBlock()
        }
    }

    onNextBlock = () => {
        let blockNo = this.state.currentBlockNo + 1
        if (blockNo <= 5) {
            this.setState({
                currentBlockState: 'start',
                currentBlockIndex: 0,
                currentBlockNo: blockNo,
                currentText: '',
                errorCount: 0,
            })
            this.onReset()
        } else {
            this.setState({
                currentBlockState: 'end',
                currentBlockIndex: 0,
                currentBlockNo: 0,
                currentText: '',
                errorCount: 0,
            })
            this.onReset()
        }
    }

    onBackHome = () => {
        this.setState({
            currentScreen: 'home',
            currentBlockState: 'start',
            currentBlockIndex: 0,
            currentBlockNo: 1,
            currentText: '',
            errorCount: 0,
        })
    }

    render() {
        return <View style={styles.container}>
            {
                this.state.currentScreen === 'home'
                    ? <Home onSelectKeyboard={this.onSelectKeyboard} />
                    : <Block currentBlockState={this.state.currentBlockState} onType={this.onType} currentKeyboard={this.state.currentKeyboard}
                        currentText={this.state.currentText} onStartBlock={this.onStartBlock} currentPhraseSet={this.state.currentPhraseSet}
                        currentBlockNo={this.state.currentBlockNo} targetText={this.state.targetText} isCaptial={this.state.isCaptial}
                        resultText={this.state.resultText} onNextPhrase={this.onNextPhrase} onBackHome={this.onBackHome} onResizeSpace={this.onResizeSpace}
                        currentBlockIndex={this.state.currentBlockIndex} showCompleteModal={this.state.showCompleteModal} spacePercentage={this.state.spacePercentage} />
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