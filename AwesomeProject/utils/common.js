import {Dimensions} from 'react-native'

const BASE_WIDTH = 750 // real picture size

export function calc(base_size) {
  let {width} = Dimensions.get('window')

  return  base_size * width /BASE_WIDTH
}

export const BASE = 'http://10.7.136.186:8080'

export function joinQuery(data) {
  let arr = []
  
  for (let name in data){
    arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]))
  }
  return arr.join('&')
}