import { Component } from "react";
import { FlatList, SafeAreaView, StatusBar, Text, View } from "react-native";
import { Feedback } from "../data/Feedbacks";
import { collection, getDocs } from "firebase/firestore";
import { commRef, myCafeId } from "../firebase";

interface State {
  feedback: Feedback[];
  loading: boolean;
}

export class CommentScreen extends Component<{}, State> {
  constructor(props) {
    super(props),
      (this.state = {
        feedback: [],
        loading: true,
      });
  }

  componentDidMount() {
    this.fetchComments();
  }

  fetchComments = async () => {
    try {
      const commSnapshot = await getDocs(commRef);

      const commList = commSnapshot.docs
        .map((doc) => {
          const courseInfo = doc.data();
          if (courseInfo.cafeid === myCafeId) {
            return {
              username: courseInfo.username,
              comment: courseInfo.comment,
            } as Feedback;
          }
          return null;
        })
        .filter((item): item is Feedback => item !== null);

      this.setState({ feedback: commList });
    } catch (error) {
      console.error("Error fetching tables: ", error);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { feedback, loading } = this.state;
    return (
      <SafeAreaView className="">
        <StatusBar barStyle="dark-content" />
        <View className="items-center">
          <Text className="font-extrabold text-2xl">Comments</Text>
        </View>
        <FlatList
          data={feedback}
          renderItem={({ item }) => (
            <View className="pt-5 ml-5 border-b border-solid w-[85%]">
              <Text className="text-base text-gray-500">
                {item.username} : {item.comment}
              </Text>
            </View>
          )}
        ></FlatList>
      </SafeAreaView>
    );
  }
}
