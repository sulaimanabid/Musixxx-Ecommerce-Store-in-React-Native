import React from 'react'
import { View, Text,   Image, StyleSheet,Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import  {TextInput, Button} from 'react-native-paper'
import app from '../firebase';
import admin from './admin';


const Login = ({navigation}) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const userLogin = async ()=>{
      if(!email||!password){ Alert.alert('Please fill all the fields')
      return
    }
      try{
       const result= await app.auth().signInWithEmailAndPassword(email.trim(), password)
        console.log(result)
      }catch(err){
        Alert.alert('User not found')
      }
    }


    return(
    <View style={{backgroundColor:'lightpink'}}>
        <View style={styles.box1}>
            <Image style={{width:150,height:150,bottom:-30}}  source={require('../assets/music-app-icon-3362643_1280.png')}/>
            <Text style={styles.text}>Musixxx Store</Text>
    
        </View>

 <View style={styles.box2} >
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
     <Button  mode="contained" onPress={() => userLogin()}>
    Login
  </Button>
  <TouchableOpacity onPress={()=>navigation.navigate('signup')}>
  <Text style={{textAlign:'center', fontWeight:'bold'}} >Don't Have a Account? Click Here</Text>
  </TouchableOpacity>
  <Button color='red' mode="contained" onPress={()=>navigation.navigate('admin')}>
    Admin Login
  </Button>
    </View>
   </View>
    
    
    )}


    const styles = StyleSheet.create({
        box1:{
          alignItems:'center',
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
        justifyContent:'space-evenly'
        }

        
        })
export default Login
