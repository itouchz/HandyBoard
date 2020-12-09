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
        currentKeyboard: 'IS_QWERTY',
        currentBlockState: 'start',
        currentPhraseSet: [],
        currentBlockNo: 0,
        currentBlockIndex: 0,
        isCaptial: false,
        showCompleteModal: false,
        showResizeKey: true,
        interval: 0,
        resultText: '',
        second: 0,
        errorCount: 0,
        spacePercentage: 0.2,
        statusText: '',
        pid: Math.floor(Math.random() * 9).toString() + Math.floor(Math.random() * 9).toString() + Math.floor(Math.random() * 9).toString(),
        currentGroup: null,
        inSetCount: 0,
        totalUpCount: 0,
        totalDownCount: 0,
        upCount: 0,
        downCount: 0
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
        if (this.state.spacePercentage > 0 && this.state.spacePercentage < 1) {
            if (action === 'up') {
                this.setState({ spacePercentage: this.state.spacePercentage + 0.01, totalUpCount: this.state.totalUpCount + 1, upCount: this.state.upCount + 1 })
            } else {
                this.setState({ spacePercentage: this.state.spacePercentage - 0.01, totalDownCount: this.state.totalDownCount + 1, downCount: this.state.downCount + 1 })
            }
        } else {
            this.setState({ spacePercentage: 0.2 })
        }
    }

    onToggleReizeKey = () => {
        alert('Resizable: ' + !this.state.showResizeKey)
        this.setState({ showResizeKey: !this.state.showResizeKey })
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

    onSelectKeyboard = group => {
        let keyboard = group === 'GROUP_1' ? 'Fixed' : 'HandyBoard'
        this.setState({
            currentKeyboard: keyboard, currentScreen: 'block',
            currentBlockState: keyboard === 'Fixed' ? 'practice' : 'adjustment', spacePercentage: 0.2,
            currentGroup: group, statusText: `${group}: ${keyboard} (P${this.state.pid})`
        })
    }

    onStartBlock = () => {
        let blockNo = this.state.currentBlockNo
        let currentPhraseSet = PhraseSets.phrases[blockNo].sort(() => 0.5 - Math.random()).slice(0, 5)
        if (this.state.currentBlockState === 'adjustment') {
            //ADJUSTMENT BLOCK
            this.setState({
                currentBlockState: 'ongoing_adjustment', targetText: currentPhraseSet[0], currentBlockIndex: 0,
                currentBlockNo: blockNo, currentPhraseSet, currentText: '', errorCount: 0, upCount: 0, downCount: 0,
                statusText: `${this.state.currentGroup}: ${this.state.currentKeyboard}, ongoing_adjustment - Block ${blockNo}, ${0 + 1} (P${this.state.pid})`
            })
        } else if (this.state.currentBlockState === 'practice') {
            this.setState({
                currentBlockState: 'ongoing_practice', targetText: currentPhraseSet[0], currentBlockIndex: 0,
                currentBlockNo: blockNo, currentPhraseSet, currentText: '', errorCount: 0, upCount: 0, downCount: 0,
                statusText: `${this.state.currentGroup}: ${this.state.currentKeyboard}, ongoing_practice - Block ${blockNo}, ${0 + 1} (P${this.state.pid})`
            })
        } else {
            //TASK BLOCK
            this.setState({
                currentBlockState: 'ongoing_task', targetText: currentPhraseSet[0], currentBlockIndex: 0,
                currentBlockNo: blockNo, currentPhraseSet, currentText: '', errorCount: 0, upCount: 0, downCount: 0,
                statusText: `${this.state.currentGroup}: ${this.state.currentKeyboard}, ongoing_task - Block ${blockNo}, ${0 + 1} (P${this.state.pid})`
            })
        }

        this.onStart()
    }

    onNextPhrase = () => {
        let blockIndex = this.state.currentBlockIndex + 1
        if (blockIndex > 4 || this.state.currentBlockState == 'ongoing_adjustment') {
            // if adjustment block, do just 1 phrase
            this.setState({ showCompleteModal: false, upCount: 0, downCount: 0 })
            this.onNextBlock()
        } else {
            this.setState({
                targetText: this.state.currentPhraseSet[blockIndex],
                currentBlockIndex: blockIndex,
                currentText: '',
                errorCount: 0,
                showCompleteModal: false,
                upCount: 0, downCount: 0,
                statusText: `${this.state.currentGroup}: ${this.state.currentKeyboard}, ${this.state.currentBlockState} - Block ${this.state.currentBlockNo}, ${blockIndex + 1} (P${this.state.pid})`
            })
            this.onStart()
        }
    }

    onNextBlock = () => {
        let inSetCount = this.state.inSetCount + 1
        let blockNo = inSetCount % 3 === 0 ? this.state.currentBlockNo + 1 : this.state.currentBlockNo

        if (this.state.currentBlockState === 'ongoing_practice' && blockNo === 0) {
            if (inSetCount % 3 !== 0 && this.state.currentKeyboard === 'Fixed') {
                this.setState({
                    inSetCount, currentBlockState: 'adjustment', currentKeyboard: 'HandyBoard',
                    statusText: `${this.state.currentGroup}: HandyBoard, adjustment - Block ${blockNo}, ${0 + 1} (P${this.state.pid})`
                })
            } else {
                this.setState({
                    inSetCount, currentBlockState: 'practice', currentKeyboard: 'Fixed', spacePercentage: 0.2,
                    statusText: `${this.state.currentGroup}: Fixed, practice - Block ${blockNo}, ${0 + 1} (P${this.state.pid})`
                })
            }
        } else if (this.state.currentBlockState === 'ongoing_adjustment' && blockNo === 0) {
            this.setState({ inSetCount, currentBlockState: 'practice', currentKeyboard: 'HandyBoard' })
        } else {
            if (blockNo <= 5 && this.state.currentBlockState === 'ongoing_adjustment') {
                this.setState({
                    inSetCount,
                    currentBlockState: 'task',
                    currentBlockIndex: 0,
                    currentBlockNo: blockNo,
                    currentText: '',
                    errorCount: 0, upCount: 0, downCount: 0
                })
                this.onReset()
            } else if (blockNo <= 5) {
                this.setState({
                    inSetCount,
                    currentKeyboard: this.state.currentKeyboard === 'HandyBoard' ? 'Fixed' : 'HandyBoard',
                    spacePercentage: this.state.currentKeyboard === 'HandyBoard' ? 0.2 : this.state.spacePercentage,
                    currentBlockState: this.state.currentKeyboard === 'HandyBoard' ? 'task' : 'adjustment',
                    currentBlockIndex: 0,
                    currentBlockNo: blockNo,
                    currentText: '',
                    errorCount: 0, upCount: 0, downCount: 0,
                    statusText: `${this.state.currentGroup}: ${this.state.currentKeyboard === 'HandyBoard' ? 'Fixed' : 'HandyBoard'}, ${this.state.currentKeyboard === 'HandyBoard' ? 'task' : 'adjustment'} - Block ${blockNo}, ${0 + 1} (P${this.state.pid})`
                })
                this.onReset()
            } else {
                this.setState({
                    inSetCount: 0,
                    currentBlockState: 'end',
                    currentBlockIndex: 0,
                    currentBlockNo: 0,
                    currentText: '',
                    errorCount: 0,
                    upCount: 0, downCount: 0
                })
                this.onReset()
            }
        }
    }

    onBackHome = () => {
        this.setState({
            currentScreen: 'home',
            currentBlockState: 'start',
            currentBlockIndex: 0,
            currentBlockNo: 0,
            currentText: '',
            errorCount: 0, upCount: 0, downCount: 0,
            totalDownCount: 0, totalUpCount: 0
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
                        currentBlockIndex={this.state.currentBlockIndex} showCompleteModal={this.state.showCompleteModal} statusText={this.state.statusText}
                        spacePercentage={this.state.spacePercentage} onToggleReizeKey={this.onToggleReizeKey} showResizeKey={this.state.showResizeKey}
                        upCount={this.state.upCount} downCount={this.state.downCount} totalUpCount={this.state.totalUpCount} totalDownCount={this.state.totalDownCount} />
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