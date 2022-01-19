import React, { useState, useEffect}
   from 'react'
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity, Touchable } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph, TextInput } from 'react-native-paper';
import 'firebase/firestore';
import { firestore } from 'firebase';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, TabRouter } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PianoScreen from './piano';
import fluteScreen from './flute';




function HomeScreen({ navigation }) {
    
    const [items,setItems]=useState([]);

    const getProducts = async()=>{
      const querySnap= await firestore().collection('products').get()
      const result = querySnap.docs.map(docSnap=>docSnap.data())
      setItems(result)
    }
    useEffect(() => {
      getProducts()
      
      
    },[])

//Search Products
    const [product, setProduct] = useState({});
          
    const searchProducts = (search) => {
      
        firestore()
        .collection("products")
        .where("title", "==", search)
        .get()
        .then((snapshot) => {
          let pro = snapshot.docs.map((doc) => {
            const data = doc.data();
            return  data ;
          });
          setProduct(pro);

         
        });
    };
    
   // Render Item Function
        const renderItem=({item})=>{

            return(
              <Card style={styles.card} > 
              <Card.Title style={{backgroundColor:'lightgreen'}} title={item.title} />
              <Card.Content style={{marginTop:5}}>
                <Paragraph><Text style={{fontSize:20, fontWeight:'bold'}}>Description: </Text>{item.description}</Paragraph>
              </Card.Content>
              <Card.Cover style={{width:390,height:400}}source={{uri: item.image }} />
              <Card.Actions>
                <Text style={{color:'purple', fontWeight:'bold'}}>Price: $ {item.price}</Text>
              </Card.Actions>
             
              
              <TouchableOpacity style={{
	backgroundColor: 'lightblue', width:200,alignItems:'center',
	borderRadius:5}} >
 

              <Card.Actions>
                <Button><MaterialCommunityIcons name="cart" size={20}  /> Add to Cart</Button>
              </Card.Actions>
              </TouchableOpacity>


            </Card>

  
            )
        }

// Search View
      return (
          <View>
           <ScrollView style={styles.scrollView}>
  
           <Text style={{textAlign:'center', fontWeight:'bold', fontSize:22, backgroundColor:'skyblue'}} >VIEW OUR COLLECTIONS</Text>  

           <TextInput
      placeholder="Search Products"
        style={styles.input}
        onChangeText={(search) => searchProducts(search)}

      />
      <FlatList
      numColumns={1}
      horizontal={false}
      data={product}
      keyExtractor={(item) => item.title}
      renderItem={(item) => {
        return( 
          <View>
           <Card style={styles.card} > 
           <Card.Title style={{backgroundColor:'lightgreen'}} title={item.item.title} />
           <Card.Content style={{marginTop:5}}>
           <Paragraph><Text style={{fontSize:20, fontWeight:'bold'}}>Description: </Text>{item.item.description}</Paragraph>

           </Card.Content>
           <Card.Cover style={{width:390,height:400}}source={{uri: item.item.image }} />

           <Card.Actions>
           <Text style={{color:'purple', fontWeight:'bold'}}>Price: $ {item.item.price}</Text>

           </Card.Actions>

           <TouchableOpacity style={{
	backgroundColor: 'lightblue', width:200,alignItems:'center',
	borderRadius:5}} >
 

              <Card.Actions>
                <Button><MaterialCommunityIcons name="cart" size={20}  /> Add to Cart</Button>
              </Card.Actions>
              </TouchableOpacity>
           </Card>
        </View>
        )     
      }}

      />

              <FlatList scrollEnabled={false} 
                  data={items}
                  keyExtractor={(item) => item.title}
                  renderItem={renderItem}
              />
                        </ScrollView>
  
          </View>
      )     
    
  ;
}




const styles = StyleSheet.create({
  card:{
     margin:10,
     elevation:2,
     alignItems:'center',
     backgroundColor:'lightpink'
     
  }
  
  })

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="Guitar Collection">
        <Drawer.Screen name="Guitar Collection" component={HomeScreen} />
        <Drawer.Screen name="Flute Collection" component={fluteScreen} />
        <Drawer.Screen name="Piano Collection" component={PianoScreen} />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}
