
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LineChart, Grid,YAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape'
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
    const [dataGraphics,setDataGraphics] = useState<number[]>([]);
    
  
    function dataInArray(){
        if(dataArray){
            let data =[];           
            data =  dataArray.map( (items:any,index:number)=>{               
                return parseFloat(items.high)                
            }) 
            //PODERIA FAZER UM POUCO MELHOR MAIS EXEMPLO VOU 
            //ULTILIZAR UM FOR PARA PEGAR SOMENTE OS 3 ULTIMOS   
            //DIAS PARA O GRAFICOS DE BARRA FICANDO MAIS CHARMOSO
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
                svg={{
                    strokeWidth: 1,
                    stroke: 'url(#gradient)',
                    d:"M20 30 S90 50 60 30 S90 60"
                   
                    
                }}
                contentInset={{ top: 20, bottom: 20 }}
            >
                <Grid />
               
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
  