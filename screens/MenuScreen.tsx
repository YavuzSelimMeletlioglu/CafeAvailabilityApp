import { collection, getDocs } from "firebase/firestore";
import { Component, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Icon from "react-native-feather";
import { myCafe } from "../firebase";
import { Menu } from "../data/MenuData";

interface State {
  menu: Menu[];
  loading: boolean;
}

type Props = {
  navigation: any;
};

export class MenuScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props),
      (this.state = {
        menu: [],
        loading: true,
      });
  }

  componentDidMount() {
    this.fetchCourses("Course");
    this.fetchCourses("Beverage");
  }

  fetchCourses = async (category: String) => {
    try {
      const menuCollection = collection(myCafe, "Menu");
      const menuSnapshot = await getDocs(menuCollection);

      const categoryList = menuSnapshot.docs
        .map((doc) => {
          const courseInfo = doc.data();
          if (courseInfo.category === category) {
            return {
              category: courseInfo.category,
              name: courseInfo.name,
              price: courseInfo.price,
              ingredients: courseInfo.ingredients,
            } as Menu;
          }
          return null;
        })
        .filter((item): item is Menu => item !== null);

      this.setState((prevState) => ({
        menu: [...prevState.menu, ...categoryList],
        loading: false,
      }));
    } catch (error) {
      console.error("Error fetching tables: ", error);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { menu, loading } = this.state;
    return (
      <SafeAreaView>
        {/* Category Section Image Starting next row */}
        <FlatList
          data={menu}
          renderItem={({ item }) => (
            <View className="items-center w-[90%] pt-12">
              {/*<Text className="text-lg font-bold">{item.category}</Text> */}
              <TouchableOpacity>
                <View className="bg-blue-500 rounded-md p-2 ml-8 w-full flex flex-row justify-between">
                  <Text className="italic text-sm text-white">{item.name}</Text>
                  <Text className="italic text-sm text-white">
                    {item.ingredients}
                  </Text>
                  <Text className="italic text-sm text-white">
                    {"$" + item.price}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    );
  }
}
