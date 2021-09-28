import React, {Component} from 'react'
import {Text, View} from 'react-native'
import {calc} from './utils/common'
import {Router, Scene, Lightbox} from 'react-native-router-flux'
import StartUp from './components/StartUp'
import List from './components/List'
import AddDialog from './components/AddDialog'


export default class APP extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <Router>
        <Lightbox>
          <Scene key="root">
            <Scene key="startup" component={StartUp}  hideNavBar={true}/>
            <Scene key="list" component={List} initial={true} hideNavBar={true}/>
          </Scene>
            <Scene key="adddialog" component={AddDialog} hideNavBar={true} />
        </Lightbox>
      </Router>
    )
  }
}