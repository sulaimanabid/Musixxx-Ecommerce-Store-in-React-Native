import { auth } from 'firebase'
import React, {useState, useEffect} from 'react'
import { View, Text, FlatList, StyleSheet} from 'react-native'
import {  Card,Title, Paragraph, Button } from 'react-native-paper'
import 'firebase/firestore';
import { firestore } from 'firebase';
import * as ImagePicker from 'expo-image-picker';
import app from '../firebase';


const Account = () => {
    const [username, setUsername]= useState([])
    const[bio, setBio] = useState([])
    const[image, setImage] = useState([])
    const[newimg, setNewimg] = React.useState(null);


      const getUsername=async()=>{
        
          
        const querySnap= await firestore().collection('username').where('uid', '==',auth().currentUser.uid)
        .get()
        const result = querySnap.docs.map(docSnap=>docSnap.data())
        setUsername(result)
        
      }
      const getimage=async()=>{
        
          
        const querySnap= await firestore().collection('setinfo').where('uid', '==',auth().currentUser.uid)
        .get()
        const result = querySnap.docs.map(docSnap=>docSnap.data())

        setImage(result)

      }

      const getbio=async()=>{
        
          
        const querySnap= await firestore().collection('setinfo').where('uid', '==',auth().currentUser.uid)
        .get()
        const result = querySnap.docs.map(docSnap=>docSnap.data())

        setBio(result)

      }

      


      useEffect(() => {
        getUsername()
        return()=>{
          console.log('cleaned')
        }
        
      },[])

      useEffect(() => {
        getimage()
        getbio()
        return()=>{
          console.log('cleaned')
        }
        
      },[])
      
  
      

  

      const renderItem=({item})=>{
          console.log(item)
        
          return(
          
            <Card  >
{/*                 
  {/* <Card.Content>
      <Title>{item.username}</Title>
    </Card.Content> */} 

            <Card.Cover style={{width:214,height:200}}source={{uri: item.image }} />
            <Card.Content style={{alignItems:'center', height:50}}>
                <Paragraph><Text style={{fontWeight:'bold'}}>BIO:</Text>{item.bio}</Paragraph>
              </Card.Content> 
            

           

          </Card>
          )
      }
  //     const pickImage = async () => {
  //       let result = await ImagePicker.launchImageLibraryAsync({
  //         mediaTypes: ImagePicker.MediaTypeOptions.All,
  //         allowsEditing: true,
  //         aspect: [2, 1],
  //         quality: 1,
  //       });
    
  //       console.log(result);
    
  //       if (!result.cancelled) {
  //         setNewimg(result.uri);
  //         console.log(newimg)
  //       }
  // firestore()
  // .collection("setinfo")
  // .where('uid', '==',auth().currentUser.uid)
  // .update({
  //   image: newimg
  // })
  //     };

    return (
        <View style={{alignItems:'center', justifyContent:'space-evenly', backgroundColor:'lightpink'}}>
         

            {/* <FlatList 
                data={username}
                keyExtractor={(item) => item.uid}
                renderItem={renderItem}
            /> */}
             <FlatList scrollEnabled={false} 
                data={image,bio}
                keyExtractor={(item) => item.uid}
                renderItem={renderItem}
            />

         
            
            <Text style={{fontSize:19,marginTop:80, fontWeight:'bold' }}>EMAIL: {auth().currentUser.email}</Text>

       
            {/* <Button  style={{top:10}}  mode="contained" color='blue'onPress={()=>pickImage()}>
  Update Profile image
</Button> */}

<Button style={{margin:170, width:200}}    mode="contained" onPress={()=>auth().signOut()}>
  Logout USER
</Button>

        </View>
    )
}

// const styles = StyleSheet.create({
//     card:{
//        margin:10,
//        elevation:2,
//        alignItems:'center',
//        backgroundColor:'lightpink'
       
//     }})

export default Account
