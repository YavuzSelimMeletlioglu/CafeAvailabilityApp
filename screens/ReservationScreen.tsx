import { Component } from "react";
import { Reservations } from "../data/Reservations";
import { myCafe } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { FlatList, SafeAreaView, Text, View } from "react-native";

interface State {
  reservation: Reservations[];
  loading: boolean;
}

export class ReservationScreen extends Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      reservation: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchTables();
  }

  fetchTables = async () => {
    try {
      const tableCollection = collection(myCafe, "Table");
      const tableSnapshot = await getDocs(tableCollection);

      const tableList = tableSnapshot.docs
        .map((doc) => {
          const tableInfo = doc.data();
          if (tableInfo.isReserved) {
            return {
              tableId: doc.id,
            } as Reservations;
          }
          return null;
        })
        .filter((item): item is Reservations => item !== null);

      this.setState({ reservation: tableList });
    } catch (error) {
      console.error("Error fetching tables: ", error);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { reservation, loading } = this.state;

    if (loading) {
      return <Text>Loading...</Text>;
    }

    return (
      <SafeAreaView className="items-center space-y-5 bg-orange-500 h-[100%]">
        <Text className="text-2xl font-extrabold">Reservations</Text>
        <FlatList
          data={reservation}
          renderItem={({ item }) => (
            <View className="pt-5">
              <Text className="text-lg text-gray-300">
                Table {item.tableId} is reserved.
              </Text>
            </View>
          )}
        />
      </SafeAreaView>
    );
  }
}
