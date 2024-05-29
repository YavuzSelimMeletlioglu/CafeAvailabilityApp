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
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { myCafe, table } from "../firebase";
import { Table } from "../data/TableData";

const { width } = Dimensions.get("window");

interface State {
  tables: Table[];
  loading: boolean;
  open: boolean;
  selectedTable: Table | null;
  menu: MenuItem[];
  selectedOrder: MenuItem | null;
}

type MenuItem = {
  name: string;
  price: number;
};

class TableScreen extends Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      tables: [],
      loading: true,
      open: false,
      selectedTable: null,
      menu: [],
      selectedOrder: null,
    };
  }

  componentDidMount() {
    this.fetchTables();
    this.fetchMenu();
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

  fetchMenu = async () => {
    try {
      const menuCollection = collection(myCafe, "Menu");
      const menuSnapshot = await getDocs(menuCollection);

      const menuData: MenuItem[] = menuSnapshot.docs.map((doc) => ({
        name: doc.data().name,
        price: doc.data().price,
      }));

      this.setState({ menu: menuData });
    } catch (error) {
      console.error("Error fetching menu: ", error);
    }
  };

  setOccupied = async (tableId: string) => {
    try {
      const tableRef = doc(myCafe, "Table", tableId.toString());
      await setDoc(tableRef, { isOccupied: true });

      this.setState((prevState) => ({
        tables: prevState.tables.map((table) =>
          table.id === tableId ? { ...table, isOccupied: true } : table
        ),
      }));
    } catch (error) {
      console.error("Error setting table as occupied: ", error);
    }
  };

  setReserved = async (tableId: string) => {
    try {
      const tableRef = doc(myCafe, "Table", tableId.toString());
      await setDoc(tableRef, { isReserved: true });

      this.setState((prevState) => ({
        tables: prevState.tables.map((table) =>
          table.id === tableId ? { ...table, isReserved: true } : table
        ),
      }));
    } catch (error) {
      console.error("Error setting table as occupied: ", error);
    }
  };

  setEmpty = async (tableId: string) => {
    try {
      const tableRef = doc(myCafe, "Table", tableId.toString());
      await setDoc(tableRef, { isOccupied: false, isReserved: false });

      this.setState((prevState) => ({
        tables: prevState.tables.map((table) =>
          table.id === tableId
            ? { ...table, isOccupied: false, isReserved: false }
            : table
        ),
      }));
    } catch (error) {
      console.error("Error setting table as occupied: ", error);
    }
  };

  handleOpen = (id: Table) => {
    this.setState({ open: true, selectedTable: id });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  renderMenu = () => {
    const { menu } = this.state;
    return (
      <View>
        <Text style={{ color: "white", fontSize: 18, marginBottom: 10 }}>
          Menu:
        </Text>
        {menu.map((item, index) => (
          <Pressable
            key={index}
            style={{
              backgroundColor: "grey",
              padding: 10,
              marginBottom: 10,
              borderRadius: 5,
            }}
            onPress={() => this.setState({ selectedOrder: item })}
          >
            <Text style={{ color: "white", fontSize: 16 }}>{item.name}</Text>
          </Pressable>
        ))}
      </View>
    );
  };

  renderRow = ({ item }) => (
    <View style={styles.rowContainer}>
      {item.map((table, index) => (
        <TouchableOpacity key={index} onPress={() => this.handleOpen(table)}>
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
    const { tables, loading, open, selectedTable, selectedOrder } = this.state;

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

        {open && selectedTable && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={open}
            onRequestClose={this.handleClose}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            >
              <View
                style={{
                  width: "80%",
                  padding: 20,
                  backgroundColor: "blue",
                  borderRadius: 10,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 18 }}>
                  Table {selectedTable.id}
                </Text>
                <Text style={{ color: "white", fontSize: 16 }}>
                  Occupied: {selectedTable.isOccupied ? "Yes" : "No"}
                </Text>
                <Text style={{ color: "white", fontSize: 16 }}>
                  Reserved: {selectedTable.isReserved ? "Yes" : "No"}
                </Text>
                <Pressable
                  onPress={() => this.setOccupied(selectedTable.id)}
                  style={{
                    marginTop: 20,
                    padding: 10,
                    backgroundColor: "red",
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ color: "white" }}>Set as Occupied</Text>
                </Pressable>
                <Pressable
                  onPress={() => this.setEmpty(selectedTable.id)}
                  style={{
                    marginTop: 20,
                    padding: 10,
                    backgroundColor: "red",
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ color: "white" }}>Set as Empty</Text>
                </Pressable>
                <Pressable
                  onPress={() => this.setReserved(selectedTable.id)}
                  style={{
                    marginTop: 20,
                    padding: 10,
                    backgroundColor: "red",
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ color: "white" }}>Set as Reserved</Text>
                </Pressable>
                <Pressable
                  onPress={this.handleClose}
                  style={{
                    marginTop: 10,
                    padding: 10,
                    backgroundColor: "grey",
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ color: "white" }}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        )}
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
