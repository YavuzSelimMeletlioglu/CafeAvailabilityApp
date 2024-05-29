import { Component, useState } from "react";
import { SafeAreaView, Text, TextInput, View } from "react-native";
import { Menu } from "../data/MenuData";

interface State {
  menu: Menu;
  loading: boolean;
}

export class MenuItemScreen extends Component {
  constructor(props, menu: Menu) {
    super(props);
    this.state = {
      menu: menu,
      loading: true,
    };
  }

  render() {
    const [text, setText] = useState("");
    return (
      <SafeAreaView className="flex justify-center items-center">
        <View className="border-2 rounded-[10px] pt-5 w-[50%]">
          <TextInput
            style={{ height: 40 }}
            placeholder=""
            onChangeText={(newText) => setText(newText)}
            defaultValue={text}
          />
        </View>
      </SafeAreaView>
    );
  }
}
