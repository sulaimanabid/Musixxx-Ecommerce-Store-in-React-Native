import React
   from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import  {TextInput, Button} from 'react-native-paper'
import { auth, firestore } from 'firebase';
import 'firebase/firestore';


import * as ImagePicker from 'expo-image-picker';



const Userinfo = () => {
    const [bio, setBio] = React.useState('')
    const[image, setImage]= React.useState(null)


    const submit = async ()=>{
        if(!bio||!image){ Alert.alert('Please fill all the fields')
        return
      }
        
          await firestore().collection('setinfo')
          .add({
           bio:bio,   
           image: image,
           uid: auth().currentUser.uid
           
        })
         Alert.alert('Record Added Successfully')
    }

    

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [2, 1],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };

    
    return(

    <View style={{backgroundColor:'lightpink'}}>
        <View style={styles.box1}>
            <Image style={{width:150,height:150,bottom:-30}}  source={require('../assets/music-app-icon-3362643_1280.png')}/>
            <Text style={styles.text}>Musixxx Store</Text>
            <Text style={{bottom:-40, fontWeight:'bold'}}>Add Your Information</Text>

    
        </View>

 <View style={styles.box2} >

     
    <TextInput
      label="Add About Yourself"
      value={bio}
      mode="outlined"
      multiline={true}
      numberOfLines={4}
      onChangeText={bio => setBio(bio)}
    />  


 
    <Button   icon="camera"  mode="contained" onPress={()=>pickImage()}>
  Upload Your Profile Image
</Button>


    



     <Button  mode="contained" onPress={()=>submit()}>
    Submit 
  </Button>
 
    </View>
   </View>
    
    
    )}


    const styles = StyleSheet.create({
        box1:{
          alignItems:'center'
        },
        text:{
         fontSize:22 ,
         bottom:-30,
         fontFamily: 'sans-serif',
      fontWeight: 'bold',

        },
        box2:{
            paddingHorizontal:40,
            height:'70%',
        justifyContent:'space-evenly'
        }

        
        })


export default Userinfo
