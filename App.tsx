import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  Pressable,
  Dimensions,
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Icon from "react-native-feather";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import {} from "./data/Feedbacks";
import { collection, doc, getDocs } from "firebase/firestore";
import { myCafe } from "./firebase";
import TableScreen from "./screens/TableScreen";
import { MenuScreen } from "./screens/MenuScreen";
import { CommentScreen } from "./screens/CommentScreen";
import { ReservationScreen } from "./screens/ReservationScreen";

const cafeId = "LPly9akk4dOVhpTjnFJe";

function CafeInfoScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1 items-center justify-center space-y-10">
      <StatusBar barStyle="dark-content" />

      <View className="relative">
        {/* Cafe Image */}
        <Image
          source={require("./assets/butik-cafe-dekorasyonu.jpg")}
          style={{ width: 208, height: 192 }}
          className="rounded-[16px]"
        />
      </View>

      <View className="items-center">
        <Text className="text-[30px] font-bold">Cafe Name</Text>
      </View>
      <View className="inset-y-0 left-0 items-center flex-row bg-blue-300 h-12 rounded-full shadow-xl">
        {/* Menu button */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Menu")}
          className="rounded-full ml-5 p-2 flex-row items-center w-[85%]"
        >
          <View
            style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
            className="rounded-full w-[35px] h-[35px] items-center justify-center"
          >
            <Icon.Menu width="25" height="25" stroke="gray" />
          </View>
          <Text className="text-[23px] pl-5 text-white font-bold">Menu </Text>
        </TouchableOpacity>
      </View>

      <View className="w-[90%] bg-red-300 rounded-full shadow-xl">
        {/* Reservation Button */}
        <TouchableOpacity
          className="flex-row items-center mx-5 py-3 shadow-lg"
          onPress={() => navigation.navigate("Reservation")}
        >
          <View
            className="rounded-full p-2"
            style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
          >
            <Icon.Calendar width="25" height="25" stroke="gray" />
          </View>
          <Text className="tracking-wider text-center font-extrabold text-white text-lg pl-10 ">
            Reservations
          </Text>
        </TouchableOpacity>
      </View>

      <View className="relative ">
        <StarRatingDisplay rating={3.5} />
      </View>
    </SafeAreaView>
  );
}

function MenuView() {
  return (
    <SafeAreaView>
      <View className="absolute top-8 right-5 z-10">
        {/* Add menu item button */}
        <TouchableOpacity>
          <View className=" rounded-[12px] border bg-green-500 w-[40px] h-[40px] items-center justify-center">
            <Icon.Plus width="25" height="25" stroke="gray" />
          </View>
        </TouchableOpacity>
      </View>
      {/* Category Section Image Starting next row */}
      <FlatList
        data={menu}
        renderItem={({ item }) => (
          <View className="items-center">
            <Text className="text-lg font-bold">{item.Category}</Text>
            <FlatList
              data={item.Dishes}
              renderItem={({ item }) => (
                <TouchableOpacity>
                  <View className="border rounded-full w-[100%] h-[40px] pl-2 pr-2 mt-6 space-x-6 items-center flex-row bg-blue-500">
                    <Text className="italic text-sm text-white">
                      {item.foodName}
                    </Text>
                    <Text className="italic text-sm text-white">
                      {item.ingredients}
                    </Text>
                    <Text className="italic text-sm text-white">
                      ${item.price}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

function CommentView() {
  return (
    <SafeAreaView className="">
      <StatusBar barStyle="dark-content" />
      <View className="items-center">
        <Text className="font-extrabold text-2xl">Comments</Text>
      </View>
    </SafeAreaView>
  );
}

function ReservationView() {
  return (
    <SafeAreaView className="items-center space-y-5 bg-orange-500 h-[100%]">
      <View className="pt-5">
        <Text className="text-2xl font-extrabold">Reservations</Text>
      </View>
      <View className="">
        <Text className="text-lg text-gray-300">Table 1 is reserved.</Text>
      </View>
      <View className="">
        <Text className="text-lg text-gray-300">Table 4 is reserved.</Text>
      </View>
      <View>
        <Text className="text-lg text-gray-300">Table 12 is reserved.</Text>
      </View>
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainScreenTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Tab1"
        component={TableScreen}
        options={{
          tabBarLabel: "Tables",
          tabBarIcon: () => <Icon.Home width="20" height="20" stroke="blue" />,
        }}
      />
      <Tab.Screen
        name="Tab2"
        component={CafeInfoScreen}
        options={{
          tabBarLabel: "Cafe Info",
          tabBarIcon: () => <Icon.Info width="20" height="20" stroke="blue" />,
        }}
      />
      <Tab.Screen
        name="Tab3"
        component={CommentScreen}
        options={{
          tabBarLabel: "Comments",
          tabBarIcon: () => (
            <Icon.MessageCircle width="20" height="20" stroke="blue" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Table Screen" component={MainScreenTabs} />
        <Stack.Screen name="Reservation" component={ReservationScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
