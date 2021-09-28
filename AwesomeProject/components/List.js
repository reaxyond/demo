import React, {Component} from 'react'
import {View, Text, Button, StyleSheet, FlatList, Alert} from 'react-native'
import { Actions } from 'react-native-router-flux'
import {calc, BASE} from '../utils/common'


export default class List extends Component {
  constructor(props){
    super(props)
    
    this.state = {
      records: []
      // records: [
      //  { ID: 1, catalog: 'others', income: 0, comment:'phone top-up', amount: 100},
      //  { ID: 3, catalog: 'food', income: 0, comment:'go out with friends', amount: 257.8},
      //  { ID: 5, catalog: 'salary', income: 1, comment:'March', amount: 5800},
      //  { ID: 8, catalog: 'debt', income: 1, comment:'from W', amount: 1000},
      // ]
    }
  }

  totalIncome(){
    let sum = 0
    this.state.records.forEach(({income, amount}) => {
      if(income) {
        sum+= amount
      }
    })
    return sum.toFixed(2)
  }
  
  totalOutcome(){
    let sum = 0
    this.state.records.forEach(({income, amount}) => {
      if(!income) {
        sum+= amount
      }
    })
    return sum.toFixed(2)
  }

  async componentDidMount(){
    try{
      let res = await fetch(BASE + '/list', {
        method: 'GET',
    　　headers:{
    　　　　'Content-Type' : 'application/json'
    　　}
      })
      let {err, data} = await res.json()

      if (err) {
        Alert.alert('Error: ', 'something wrong with the data operation', [{title: 'ok'}])
      }  else {
        this.setState({
          records: data
        })
      }
    }catch(e) {
      Alert.alert('Error: ', 'fail to fetch the data, please check the connection', [{title: 'ok'}])
      console.log('e??????', e)
    }
  }
  // async componentDidUpdate(){
  //   try{
  //     let res = await fetch(BASE + '/list', {
  //       method: 'GET',
  //   　　headers:{
  //   　　　　'Content-Type' : 'application/json'
  //   　　}
  //     })
  //     let {err, data} = await res.json()
  //     // console.log('_____________res', res)
  //     // console.log('______________err', err)
  //     console.log('_____________updatedata', data)
  //     if (err) {
  //       Alert.alert('Error: ', 'something wrong with the data operation when updating', [{title: 'ok'}])
  //     }  else {
  //       this.setState({
  //         records: data
  //       })
  //     }
  //   }catch(e) {
  //     Alert.alert('Error: ', 'fail to fetch the data, please check the connection when updating', [{title: 'ok'}])
  //     console.log('e??????', e)
  //   }
  // }

  showAddDialog(){
    Actions.push('adddialog', {})
  }

  render(){
    return (
      <View style={{backgroundColor:'#FFF', height:'100%'}}>
        <View style={styles.titleContainer}><Text style={styles.title}>Today Sheet</Text></View>

        <View style={{flexDirection:'row', backgroundColor:'#00CCBB'}}>
          <View sytle={{flex: 2}}>
            <Text style={styles.rowOne}>2021</Text>
            <Text style={styles.rowTwo}>April</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.rowOne}>Pay In</Text>
            <Text style={styles.rowTwo}>{this.totalIncome()}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.rowOne}>Pay Out</Text>
            <Text style={styles.rowTwo}>{this.totalOutcome()}</Text>
          </View>
        </View>

        <View>
          <FlatList 
          data={this.state.records}
          keyExtractor = {item => item.ID+''}
          renderItem={({item}) => (
           <View>
            <View style={{flexDirection:'row', marginTop: calc(15), marginBottom: calc(15), marginLeft: calc(15), marginRight: calc(15)}}>
              <Text style={{width:calc(150),fontSize: calc(45)}}>{item.catalog}</Text>
              <Text style={{flex: 1, fontSize: calc(45)}}>{item.comment}</Text>
              <Text style={{width:calc(150), textAlign:'right',fontSize: calc(45)}}>{item.income? '+' : '-'}{item.amount}</Text>
            </View>
            <View style={{height: 1, backgroundColor: '#CCC'}}></View>
          </View>
          )}
          />
        </View>

        <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
          <Button color="#00EEBB" title="One More" onPress={this.showAddDialog.bind(this)}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {fontSize: calc(75), color: '#FFF'},
  titleContainer: {
    height: calc(`150`), backgroundColor: '#00AABB', 
    flexDirection:'row', justifyContent:'center'},
  rowOne: {fontSize: calc('50'), color: 'white'},
  rowTwo: {fontSize: calc('75'), color:'white'},
})