import React from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Button,
} from "react-native";

const Favorites = ({ favorites }) => {
  //   for (const item of favorites) {
  //     console.log("dit is het"(item));
  //   }

  console.log("Received Favorites:", favorites);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Favorite Markers</Text>
      <FlatList
        data={favorites}
        renderItem={({ item }) => <Text style={styles.item}>{item.title}</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    fontFamily: "Gill Sans",
    backgroundColor: "red",
  },
  item: {
    backgroundColor: "#9147FF",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontFamily: "Gill Sans",
  },
  bodyText: {
    fontSize: 14,
    color: "#29292E",
    fontFamily: "Gill Sans",
  },
});

export default Favorites;
