import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import GraphicsLine from './components/garphicsLine';
import GraphicsBar from './components/graphicsBar';
import api from './services/api';
interface ArrayData{
  ask:number;
  bid: number;
  high:number;
  low: number;
  pctChange: number;
  timestamp: number;
  varBid: number;   
}

export default function App() {
  const [allData,setAllData] = useState<ArrayData[]>([]);
  async function queryData(){        
    try{
        setAllData([]);
        const result = await api.get('USD/20');   
        setAllData(result.data) 
    }catch(error){
        console.log(error)
    }  
    return 1;  
  }
  useEffect(()=>{
    queryData()
  },[])
  if(!allData){
    alert('loading')
    return
  }
  return (
    <ScrollView style={{flex:1}}  showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.Header}>
          <Text style={styles.textTitle}>EXEMPLO SIMPLES</Text>
        </View>
        <GraphicsLine dataArray={allData}/>
        <GraphicsBar dataArray={allData}/> 
      </View>
      <View></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display:'flex',
    backgroundColor: '#fff',
    alignItems: 'center', 
  },
  containerGraphics:{
    marginTop:'10%'
  },
  graphicsBar:{ 
    height: 200,
    width:200 ,
  },
  Header:{
    justifyContent: 'center',
    alignItems:'center',
    width:'80%',
    marginTop:'20%',
  },
  textSubTitle:{
    color:'#777777'
  },
  textTitle:{
    color:'#777777',
    fontWeight:'bold'
  }
});
