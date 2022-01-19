import React from 'react'
import { View, Text,   Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import  {TextInput, Button} from 'react-native-paper'
import * as firebase from 'firebase';
import app from '../firebase';
import { auth, firestore } from 'firebase';
import 'firebase/firestore';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';



const Register = ({navigation}) => {
   const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const userSignup = async ()=>{
      
      if(!name||!email||!password){ Alert.alert('Please fill all the fields')
      return
    }
      
        await app.auth().createUserWithEmailAndPassword(email.trim(), password)
        await firestore().collection('username')
        .add({
         name: name,
         uid: auth().currentUser.uid
         
      })
       Alert.alert('Record Added Successfully')

     

    //   try{
    //     await firestore().collection('username')
    //     .add({
    //      name: name,
    //      uid: auth().currentUser.uid
         
    //   })
    //    Alert.alert('Record Added Successfully')
    // }
    //   catch{
    //     console.log('Username not added')
    //   }
    // }
    }
    
    return(
    <View>
        <View style={styles.box1}>
            <Image style={{width:150,height:150,bottom:-30}}  source={require('../assets/music-app-icon-3362643_1280.png')}/>
            <Text style={styles.text}>Musixxx Store</Text>
            <Text style={{bottom:-40, fontWeight:'bold'}}>Please Signup!!</Text>

    
        </View>

 <View style={styles.box2} >

 <TextInput
      label="Username"
      value={name}
      mode="outlined"
      onChangeText={name => setName(name)}
    />  

     <TextInput
      label="Email"
      value={email}
      mode="outlined"
      onChangeText={email => setEmail(email)}
       />

<TextInput
      label="Password"
      value={password}
      mode="outlined"
      onChangeText={password => setPassword(password)}
      secureTextEntry={true}
    />


     <Button  mode="contained" onPress={()=>userSignup()}>
    Register Now
  </Button>
  <TouchableOpacity onPress={()=>navigation.navigate('login')}>
  <Text style={{textAlign:'center', fontWeight:'bold'}} >Already have an Account? Go to Login</Text>
  </TouchableOpacity>
    </View>
   </View>
    
    
    )}


    const styles = StyleSheet.create({
        box1:{
          alignItems:'center',
          backgroundColor:'lightpink',
          height:'30%',

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
        justifyContent:'space-evenly',
        backgroundColor:'lightpink'

        }

        
        })


export default Register
