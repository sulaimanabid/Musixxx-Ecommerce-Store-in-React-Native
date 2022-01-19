import React , {useEffect,useState}
 from 'react'
import { View, Text, SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import Addproducts from './src/Addproducts'
import HomeScreen from './src/HomeScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ionicons } from '@expo/vector-icons';
import Login from './src/LoginScreen.js'
import Register from './src/RegisterScreen.js'
import Account from './src/Account';
import app from './firebase';
import { auth } from 'firebase';
import Userinfo from './src/userinfo';
import admin from './src/admin';
import cart from './src/cart';


const App = () => {
  
  return ( 
<>
<StatusBar barstyle='dark-content' backgroundColor='#e91e63'/>
<View style={styles.container}>

   <Navigation />
   
   
    </View>
    </>
  )
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigator=()=> {
  return (
    <Stack.Navigator
    initialRouteName="login"

    >
      <Stack.Screen name="login" component={Login} options={{headerShown:false}} />
      <Stack.Screen name="signup" component={Register} options={{headerShown:false}}/>
      <Stack.Screen name="admin" component={admin} options={{headerShown:false}}/>
      <Stack.Screen name="Add Products" component={Addproducts} options={{headerShown:false}}/>

     
    </Stack.Navigator>
  );
}

const TabNavigator = ()=>{
  return(
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        headerShown:false
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />

<Tab.Screen
        name="Cart"
        component={cart}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color, size }) => (
            <Ionicons  name="cart-outline" color={color} size={size} />
          ),
        }}
      />

<Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons  name="account" color={color} size={size} />
          ),
        }}
      />   

<Tab.Screen
        name="Add User Info"
        component={Userinfo}
        options={{
          tabBarLabel: 'User Info',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons  name="information" color={color} size={size} />
          ),
        }}
      />        

  
  </Tab.Navigator>
 ) 
}
    


    const Navigation=()=>{
      const [user, setUser] = useState('')
      useEffect(() => {
        auth().onAuthStateChanged((userExist)=>{
          if(userExist){
            setUser(userExist)
          }
          else{
            setUser('')
          }
        })
       
      }, [])
      return(
        <NavigationContainer>
          {user?<TabNavigator />:<StackNavigator/>}
        </NavigationContainer>
      )
    }
const styles = StyleSheet.create({
container:{
  flex:1,
  backgroundColor:'lightpink'
}

})

export default App
