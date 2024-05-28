import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { collection, getDocs, doc } from "firebase/firestore";
import { myCafe } from "../firebase";
import { Table } from "../data/TableData";

const { width } = Dimensions.get("window");

interface State {
  tables: Table[];
  loading: boolean;
  open: boolean;
}

class TableScreen extends Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      tables: [],
      loading: true,
      open: false,
    };
  }

  componentDidMount() {
    this.fetchTables();
  }

  fetchTables = async () => {
    try {
      const tableCollection = collection(myCafe, "Table");
      const tableSnapshot = await getDocs(tableCollection);

      const tableList = tableSnapshot.docs.map((doc) => {
        const tableInfo = doc.data();
        return {
          id: doc.id,
          isOccupied: tableInfo.isOccupied,
          isReserved: tableInfo.isReserved,
          order: [],
          payment: 0,
        };
      });

      this.setState({ tables: tableList });
    } catch (error) {
      console.error("Error fetching tables: ", error);
    } finally {
      this.setState({ loading: false });
    }
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  renderRow = ({ item }) => (
    <View style={styles.rowContainer}>
      {item.map((table, index) => (
        <TouchableOpacity key={index} onPress={this.handleOpen}>
          <View style={[styles.tableItem, this.getTableItemStyle(table)]}>
            <Text style={styles.tableText}>
              Table {table.id}{" "}
              {table.isOccupied
                ? "Occupied"
                : table.isReserved
                ? "Reserved"
                : "Available"}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  // Convert the flat list into a 2D array for rendering rows
  chunkArray = (array, chunkSize) => {
    let results = [];
    while (array.length) {
      results.push(array.splice(0, chunkSize));
    }
    return results;
  };

  render() {
    const { tables, loading, open } = this.state;

    if (loading) {
      return <Text>Loading...</Text>;
    }

    const tableRows = this.chunkArray([...tables], 3); // Create chunks of 3 for rows

    return (
      <SafeAreaView>
        <FlatList
          data={tableRows}
          renderItem={this.renderRow}
          keyExtractor={(item, index) => index.toString()}
        />

        {/* Modal for displaying orders */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={open}
          onRequestClose={this.handleClose} // Use the handleClose function directly
        >
          <View style={styles.modalContainer}>
            <Pressable onPress={this.handleClose}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Orders</Text>
                <View>
                  <Text>
                    2 {"  "} Pizza {"     "} $20
                  </Text>
                </View>
              </View>
            </Pressable>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
  getTableItemStyle = (table) => {
    let backgroundColor = "#00FF00"; // Default to green for not occupied and not reserved tables

    if (table.isOccupied) {
      backgroundColor = "#FF0000"; // Red for occupied tables
    } else if (table.isReserved) {
      backgroundColor = "#FFA500"; // Orange for reserved tables
    }

    return { backgroundColor };
  };
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: width,
    marginBottom: 10,
  },
  tableItem: {
    borderColor: "#000",
    borderWidth: 1,
    width: 70,
    height: 70,
    borderRadius: 12,
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff0000",
  },
  tableText: {
    color: "#fff",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5, // Shadow for Android
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default TableScreen;
