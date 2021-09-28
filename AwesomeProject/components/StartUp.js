import React, {Component} from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import {calc} from '../utils/common'
import {Actions} from 'react-native-router-flux'

export default class StartUp extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    setTimeout(function(){
      Actions.push('list', {})
    }, 2000)
  }

  render(){
    return (
      <View style={styles.bg}>
        <View style={styles.coverContainer}><Image style={styles.cover} source={require('../assets/1.png')}/></View>
        <View style={styles.titleContainer}><Text style={styles.title}>Daily Cash Journal</Text></View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  bg: {backgroundColor: 'black', height:'100%'},
  cover: {width: calc(750), height:calc(750)},
  coverContainer: {flexDirection: 'row', justifyContent: 'center', marginTop: calc(250)},
  title: {color: 'white', fontSize: calc(75)},
  titleContainer: {flexDirection: 'row', justifyContent:'center'}
})