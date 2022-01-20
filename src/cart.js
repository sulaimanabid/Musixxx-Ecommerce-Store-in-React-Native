import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { Divider } from "react-native-paper";
import { Fragment } from "react/cjs/react.production.min";
import { useIsFocused } from "@react-navigation/native";

const CartScreen = ({ onCartItemCountChange }) => {
  const [cartItems, setCartItems] = useState();
  let isInFocus = useIsFocused();

  let {
    cartScreenContainer,
    cartCardStyle,
    cartImageStyle,
    cartCarContentStyle: cartContentStyle,
    cartFirstRowStyle: firstRowStyle,
    descTextStyle,
    cartPriceStyle,
    flatListStyle,
    totalPriceContainer,
    totalTextStyle,
    cardActionsStyle,
  } = styles;

  const getItemsFromCart = async () => {
    try {
      let cart = await AsyncStorage.getItem("cart");
      cart = JSON.parse(cart);
      cart && cart.length > 0 && setCartItems(cart);
    } catch (err) {
      console.error(err);
    }
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach(({ price, amount }) => {
      let priceInNumber = Number(price.replace("$", "").trim());
      totalPrice = totalPrice + priceInNumber * amount;
    });
    return `$ ${totalPrice}`; // get total price represented at bottom
  };

  const onAmountChange = async (currentAmount, mode = "", index) => {
    try {
      setCartItems((currentItems) => {
        let currentItemsCopy = [...currentItems];
        if (mode === "add") currentItemsCopy[index].amount = currentAmount + 1;
        // add amount in current amount
        else if (mode === "minus") {
          if (currentAmount - 1 > 0) {
            currentItemsCopy[index].amount = currentAmount - 1; // subtract amount from current amount
          } else {
            currentItemsCopy.splice(index, 1); // remove the product if amount is  0
          }
        }
        return currentItemsCopy;
      });
    } catch (err) {}
  };

  useEffect(() => {
    isInFocus && getItemsFromCart();
  }, [isInFocus]);

  useEffect(async () => {
    if (cartItems !== undefined) {
      await AsyncStorage.setItem("cart", JSON.stringify(cartItems)); // any changes made in local state will be reflected in local storage aswell
      onCartItemCountChange(cartItems.length);
    }
  }, [cartItems]);
  
  
  const generateAlert = (text) => {
  Alert.alert("Alert", text); // to genreate alert with custom texts
};

const handleAddToCart = async (item, onCartItemCountChange) => {
  // function to add item to the cart
  try {
    let cart = await AsyncStorage.getItem("cart"); // getting current cart data
    cart = JSON.parse(cart) || [];
    let itemFound = cart.find(({ title }) => title === item.title);
    if (itemFound) {
      generateAlert("Item is already in the cart");
      return;
    }
    cart = [...cart, { ...item, amount: 1 }]; // adding item in the cart
    AsyncStorage.setItem("cart", JSON.stringify(cart)); // storing in persisent async storage
    generateAlert("Item added in the cart"); // generating alert
    onCartItemCountChange(cart.length); // callback called to set cart item count over cart icon
  } catch (err) {
    console.error(err);
  }
};

const getIntialCartItemCount = async () => {
  try {
    let cart = await AsyncStorage.getItem("cart"); // getting current cart data
    cart = JSON.parse(cart) || [];
    return cart.length; // returning cart items count
  } catch (err) {
    console.error(err);
  }
};


  const renderCartCard = ({
    index,
    item: { image, description, price, title, amount },
  }) => (
    <View style={cartCardStyle}>
      <Image source={{ uri: image }} style={cartImageStyle} />
      <View style={cartContentStyle}>
        <View style={firstRowStyle}>
          <Text numberOfLines={2} style={{ maxWidth: 120 }}>
            {title}
          </Text>
          <Text style={cartPriceStyle}>{price}</Text>
        </View>
        <View>
          <Text numberOfLines={3} style={descTextStyle}>
            {description}
          </Text>
          <View style={cardActionsStyle}>
            <TouchableOpacity
              onPress={() => onAmountChange(amount, "add", index)}
            >
              <AntDesign
                style={{ marginRight: 10 }}
                name="pluscircleo"
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <Text> {amount}</Text>
            <TouchableOpacity
              onPress={() => onAmountChange(amount, "minus", index)}
            >
              <AntDesign
                style={{ marginLeft: 10 }}
                name="minuscircleo"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={cartScreenContainer}>
      {cartItems && cartItems.length > 0 && (
        <Fragment>
          <FlatList
            style={flatListStyle}
            scrollEnabled={true}
            overScrollMode="auto"
            data={cartItems}
            keyExtractor={(item) => item?.title}
            renderItem={renderCartCard}
          />
          <Divider />
          <View style={totalPriceContainer}>
            <Text style={totalTextStyle}>Total:</Text>
            <Text style={{ fontSize: 22, ...cartPriceStyle }}>
              {cartItems ? getTotalPrice() : ""}
            </Text>
          </View>
        </Fragment>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cartScreenContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  cartCardStyle: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  cartImageStyle: {
    borderRadius: 10,
    height: 130,
    flex: 0.4,
  },
  cartCarContentStyle: {
    flex: 0.6,
    paddingHorizontal: 10,
  },
  cartFirstRowStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
  },
  descTextStyle: {
    color: "#666362",
    fontWeight: "400",
  },
  totalTextStyle: {
    color: "#666362",
    fontSize: 18,
  },

  cartPriceStyle: {
    fontWeight: "700",
  },
  cardActionsStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  flatListStyle: { flexGrow: 0, height: "90%" },
  totalPriceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    justifyContent: "space-around",
  },
});

export default CartScreen;
