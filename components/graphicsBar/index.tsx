
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarChart, Grid, YAxis } from 'react-native-svg-charts';
interface ArrayData{
    ask:number;
    bid: number;
    high:number;
    low: number;
    pctChange: number;
    timestamp: number;
    varBid: number; 
    
}
interface PropsArray{ 
    dataArray:ArrayData[];
  
  }
export default function graphicsBar({dataArray}:PropsArray) {
    const [dataGraphics,setDataGraphics] = useState<number[]>([]);    
    function ulti(data:any){  
        var i;
        var temp=[];
        for(i=0;i<7;i++){
            temp.push(data[i])
        }
        return temp;
    }
    function dataInArray(){
        if(dataArray){
            let data =[];
            data =  dataArray.map( (items:any,index:number)=>{               
                return parseFloat(items.high)                
            })   
            setDataGraphics(ulti(data));           
        }
        return 1;
    }
    function colorValueIs(valuerCoin:number){
        let color;
        if(valuerCoin<5.2)color= '#d3d3d3'
        else color='#808080';
        return color; 
    }
    const graphicsBar = dataGraphics.map((valueCoin:number)=>
        {
            return (
                {
                    value: valueCoin,
                    svg: {
                        fill: colorValueIs(valueCoin),
                        onPress:()=>alert(valueCoin)                        
                    },
                }                
            )
        }    
    )
    useEffect(()=>{
        dataInArray()
    },[dataArray])
    if(!dataGraphics){
        return ( 
        <Text>Carregando</Text>)
    }
    return(
        <View style={styles.containerGraphics}>
            <YAxis
                data={dataGraphics}
                contentInset={{ top: 0, bottom: 0 }}
                svg={{
                    fill: 'grey',
                    fontSize: 10,
                }}
                numberOfTicks={10}
                formatLabel={(value:any) => `R$${value}`}
            />
            <BarChart
                style={{ height: 200 ,width:200}}
                data={graphicsBar}
                gridMin={0}
                yAccessor={({ item }:any) => item.value}
              
            >      
                <Grid/>              
            </BarChart>
        </View>
    )
}
const styles = StyleSheet.create({   
    containerGraphics:{
      marginTop:'10%',
      flexDirection: 'row' 
    },
    graphicsBar:{ 
      height: 200,
      width:200 ,      
    },   
  });
  