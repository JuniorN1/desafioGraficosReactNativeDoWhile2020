import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,ScrollView } from 'react-native';


import api from './services/api'
import GraphicsBar from './components/graphicsBar'
import GraphicsLine from './components/garphicsLine'
interface ResultObjet{

  ask:number;
  bid: number;
  high:number;
  low: number;
  pctChange: number;
  timestamp: number;
  varBid: number;

}
export default function App() {
  const [allData,setAllData] = useState<ResultObjet[]>([]);
  const [showLoading,setShowLoading] = useState(false);

  const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)
  const dados = [5,10,15,5]

  //A SIMPLE EXAMPLE QUERY USE USD DOLLAR FOR SEARCH LAST 20 DAYS AFTER 
  //BUT YOU CAN USER OTHER COINS SITE API : https://docs.awesomeapi.com.br/api-de-moedas
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
        
         {/* <Svg height="20%" width="50%" viewBox="0 0 100 100" >
        <Path 
          d="M0 0 Q50 90 70 50 T100 60 80 70"
          fill="none" stroke="red"
        />
        </Svg>  */}
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
