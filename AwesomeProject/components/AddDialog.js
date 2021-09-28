import React, {Component} from 'react'
import {View, Text, Image, TextInput, Button, Alert} from 'react-native'
import {Picker} from '@react-native-picker/picker'
import {calc, BASE,joinQuery} from '../utils/common'
import {Actions} from 'react-native-router-flux'

export default class AddDialog extends Component {
  constructor(props) {
    super(props)
    
    this.catalogs=[
      ['others','shoppping', 'invest','food','communication', 'loan', 'clothes', 'health'],
      ['salary','investment','debt'],
    ]
    
    this.state={
      income: 0,
      payList: this.catalogs[0],
      item: this.catalogs[0][0],
      comment:null,
      amount:0,
    }
  }
  
  async submit(){
    try{
      console.log('__________________________',BASE + '/add?' + joinQuery({
        catalog: this.state.item,
        income: this.state.income,
        comment: this.state.comment,
        amount: this.state.amount,
      }) )
      let res = await fetch(BASE + '/add?' + joinQuery({
        catalog: this.state.item,
        income: this.state.income,
        comment: this.state.comment,
        amount: this.state.amount,
      }), {
        method:'GET',
        // headers: {
        //   'Content-Type': 'application/x-www-form-urlencoded'
        // },
      })
      
      let {err} = await res.json()
  
      if (err) {
        Alert.alert('Error', 'fail to add')
      } else {
        Actions.pop()
      }
    } catch(e){
      Alert.alert('Error', 'fail to fetch the database, please check the net connection')
    }
  }

  cancel(){
    Actions.pop()
  }

  render(){
    return (
      <View>
        <Picker 
        selectedValue={this.state.income}
        onValueChange={val => this.setState({
          income: val,
          payList: this.catalogs[val],
          item: this.catalogs[val][0],
        })}
        >
          <Picker.Item label="Pay Out" value={0}/>
          <Picker.Item label="Pay In" value={1}/>
        </Picker>

        <Picker 
        selectedValue={this.state.item}
        onValueChange={val => this.setState({
          item: val,
        })}>

        {this.state.payList.map((item, index)=> {
          return <Picker.Item label={item} value={item} key={index}/>
        })}
        </Picker>

        <TextInput 
        placeholder="comment"
        onChangeText={text => this.setState({
          comment: text
        })}/>

        <TextInput 
        placeholder="amount"
        onChangeText={text => this.setState({
          amount: text
        })}
        keyboardType='number-pad'
        />

        <View style={{flexDirection:'row'}}>
          <View style={{flex: 1}}><Button title="submit" color='#0EB' 
          onPress={this.submit.bind(this)} /></View>
          <View style={{flex: 1}}><Button title="cancel" color='#CCC'
          onPress={this.cancel.bind(this)}/></View>
        </View>
    </View>
    )
  }
}

