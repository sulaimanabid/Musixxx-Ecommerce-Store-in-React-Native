import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { View, Text,   Image, StyleSheet,Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import  {TextInput, Button} from 'react-native-paper'
import app from '../firebase';
import 'firebase/firestore';
import { firestore } from 'firebase';




const admin = ({navigation}) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [items,setItems]=React.useState([]);


    const adminLogin = async ()=>{
      if(!email||!password){ Alert.alert('Please fill all the fields')
      return
    }
    const querySnap= await firestore().collection('admin').get()
    const result = querySnap.docs.map(docSnap=>docSnap.data())
    setItems(result)
    items.map((i)=>{
        if(i.email==email && i.password==password){
                        navigation.navigate('Add Products')
       
                    }

        else{
            Alert.alert('Login Credentials are Wrong... PLZ TRY AGAIN')
        }
    })
}





      
    return(
    <View style={{backgroundColor:'yellow'}}>
        <View style={styles.box1}>
            <Image style={{width:150,height:150,bottom:-30, }}  source={require('../assets/music-app-icon-3362643_1280.png')}/>
            <Text style={styles.text}>Musixxx Store</Text>
            <Text style={{marginTop:50, fontWeight:'bold', fontSize:25, color: "red"}}>ADMIN LOGIN</Text>

    
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
     <Button color='red' mode="contained" onPress={() => adminLogin()}>
    Login
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
export default admin