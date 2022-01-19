import React,{useState} from 'react'
import { View, Text, StyleSheet, Alert, Image } from 'react-native'
import  {TextInput, Button} from 'react-native-paper'
import { auth, firestore } from 'firebase'
import app from '../firebase'
import firebase from 'firebase/app';
import 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'






const Addproducts = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const[image,setImage] = useState(null)


    const add_products=async ()=>{
      if(!title||!price||!description||!image){
        Alert.alert('Please fill all the fields')
        return
      }

     
      try{
      await firestore().collection('products')
            .add({
              title:title,
              price:price,
              description:description,
              image: image,
            }
            
            )
            Alert.alert('Product has been posted')
          }
          catch{
            Alert.alert('Product could not be added because of an error')
          }
    }
        
        const add_flute = async()=>{
          if(!title||!price||!description||!image){
            Alert.alert('Please fill all the fields')
            return
          }
          try{

            await firestore().collection('flute')
                  .add({
                    title:title,
                    price:price,
                    description:description,
                    image: image,
                  }
                  
                  )
                  Alert.alert('Product has been posted')
                }
              

              catch{
                Alert.alert('Product could not be posted')
              }
               
            }

              const add_piano = async()=>{
                if(!title||!price||!description||!image){
                  Alert.alert('Please fill all the fields')
                  return
                }
                try{
                  await firestore().collection('piano')
                        .add({
                          title:title,
                          price:price,
                          description:description,
                          image: image,
                        }
                        
                        )
                        Alert.alert('Product has been posted')
                      }
                      catch{
                        Alert.alert('Product could not be added because of an error')
                      }
                     
                    }
        

        const pickImage = async () => {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
          console.log(result);
      
          if (!result.cancelled) {
            setImage(result.uri);
          }
        };

    return (
        <View style={styles.container}>
          <Text style={{textAlign:'center', fontFamily: 'sans-serif',
      fontWeight: 'bold', fontSize:22, backgroundColor:'lightblue'}}>ADMIN PANEL</Text>
            <Text style={{textAlign:'center', fontFamily: 'sans-serif',
      fontWeight: 'bold', fontSize:22}}>Add Products</Text>
<TextInput
      label="Add Title"
      value={title}
      mode="outlined"
      onChangeText={title => setTitle(title)}
       />

<TextInput
      label="Add Price in Dollars"
      value={price}
      mode="outlined"
      keyboardType='numeric'
      onChangeText={price => setPrice(price)}
       />


       <TextInput
      label="Add Descritpion"
      value={description}
      mode="outlined"
      onChangeText={description => setDescription(description)}
      multiline={true}
      numberOfLines={3}
      />    
<Button  title="Pick an image from camera roll" icon="camera"  mode="contained" onPress={()=>pickImage()}>
  Upload Image
</Button>

{image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
  
  <Button   mode="contained" onPress={() => add_products()}>
    Add in Guitar Collection
  </Button>
  
  <Button   mode="contained" onPress={() => add_flute()}>
    Add in Flute Collection
  </Button>

  <Button   mode="contained" onPress={() => add_piano()}>
    Add in Piano Collection
  </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginHorizontal:2,
        justifyContent:'space-evenly',
        backgroundColor:'lightpink'
    }
    
    })

export default Addproducts
