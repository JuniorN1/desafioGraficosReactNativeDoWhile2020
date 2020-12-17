
import React, { useEffect, useState } from 'react';
import { StyleSheet,  View } from 'react-native';
import * as shape from 'd3-shape';
import { LineChart, Grid,YAxis} from 'react-native-svg-charts';
import { Circle, G, Line, Rect,Text } from 'react-native-svg'

interface ResultObjet{    
    ask:number;
    bid: number;
    high:number;
    low: number;
    pctChange: number;
    timestamp: number;
    varBid: number;  
  }
export default function graphicsLine({dataArray}:any) {
    const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
    const [dataGraphics,setDataGraphics] = useState<number[]>([]);
    function dataInArray(){
        if(dataArray){
            let data =[];           
            data =  dataArray.map( (items:any,index:number)=>{               
                return parseFloat(items.high)                
            })
            setDataGraphics(data.reverse());  
        }
        return 1;
    }
    function colorValueIs(valuerCoin:number){
        let color ;
        if(valuerCoin<5.2)color= '#d3d3d3'
        else color='#808080';
        return color; 
    }

    const Decorator = ({ x, y, dataGraphics }:any) => {
     
      let ar =   dataArray.reverse().map(({high}, index):any => {
           
            if(high<5.15){
               return (
                <Circle
                    key={ index }
                    cx={ x(index) }
                    cy={ y(high) }
                    r={ 4 }
                    stroke={ 'rgb(134, 65, 244)' }
                    fill={ 'white' }
                />
                )
                }
            }
            
         )
         return ar;
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
        <View>Carregando</View>)
    }
    return(
        <View style={styles.containerGraphics}>
            <YAxis
                data={dataGraphics}
                contentInset={{ top: 20, bottom: 20 }}
                svg={{
                    fill: 'grey',
                    fontSize: 10,
                }}
                numberOfTicks={10}
                formatLabel={(value:any) => `R$${value}`}
            />
            <LineChart
                curve={shape.curveNatural}
                style={{ height: 200, width: 200 }}
                data={dataGraphics}
                svg={
                        {
                            strokeWidth: 1,
                            stroke: 'url(#gradient)',                    
                        }
                    }
                contentInset={
                    { 
                        top: 20, 
                        bottom: 20 
                    }
                }
            >
            <Grid /> 
            <Decorator/>              
            </LineChart>
           
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
  