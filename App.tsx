import React from "react";
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Icon from "react-native-feather";

function CafeInfoScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1 items-center justify-center space-y-10">
      <StatusBar barStyle="dark-content" />

      <View className="absolute top-5">
        <Image
          source={require("./assets/butik-cafe-dekorasyonu.jpg")}
          style={{ width: 208, height: 192 }}
        />
      </View>

      <View className="items-center pt-10">
        <Text className="text-[30px] font-bold">Cafe Name</Text>
      </View>
      <View className="inset-y-0 left-0 items-center flex-row bg-blue-300 h-12 rounded-full shadow-xl">
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

      <View className="w-[90%] bg-red-300  rounded-full shadow-xl">
        <TouchableOpacity className="flex-row items-center mx-5 py-3 shadow-lg">
          <View
            className="rounded-full p-2"
            style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
          >
            <Icon.PhoneCall width="25" height="25" stroke="gray" />
          </View>
          <Text className="tracking-wider text-center font-extrabold text-white text-lg pl-10 ">
            05333808445
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function MenuScreen() {
  return (
    <SafeAreaView>
      <Text>Menu Screen</Text>
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Cafe Information" component={CafeInfoScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
