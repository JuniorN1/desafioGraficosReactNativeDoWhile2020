
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarChart, Grid,YAxis } from 'react-native-svg-charts';
interface ResultObjet{
    
    ask:number;
    bid: number;
    high:number;
    low: number;
    pctChange: number;
    timestamp: number;
    varBid: number;
  
  }
export default function graphicsBar({dataArray}:any) {
    const [dataGraphics,setDataGraphics] = useState<number[]>([]);
    
    function ulti(data:any){  
        var i;
        var temp=[];
        for(i=0;i<3;i++){
            temp.push(data[i])
        }
        return temp.reverse();
    }
    function dataInArray(){
        if(dataArray){
            let data =[];
            let reverseData = [];
            let temp=[];
            data =  dataArray.map( (items:any,index:number)=>{               
                return parseFloat(items.high)                
            }) 
            //PODERIA FAZER UM POUCO MELHOR MAIS EXEMPLO VOU 
            //ULTILIZAR UM FOR PARA PEGAR SOMENTE OS 3 ULTIMOS   
            //DIAS PARA O GRAFICOS DE BARRA FICANDO MAIS CHARMOSO
            setDataGraphics(ulti(data));  
  
         
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
            <BarChart
            style={{ height: 200 ,width:200}}
            data={graphicsBar}
            gridMin={0}
            yAccessor={({ item }:any) => item.value}
            contentInset={{ top: 20, bottom: 20 }}
        >      
        <Grid

        />              
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
  