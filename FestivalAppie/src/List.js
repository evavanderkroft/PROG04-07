import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Button,
} from "react-native";

export default function List({ markers, navigation }) {
  //rendering the flatlist. On press, go to map with that marker.
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (favorites.length > 0) {
      navigation.navigate("Favorites", { favorites });
    }
  }, [favorites]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Map", { currentMarker: item })}
      style={styles.item}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.bodyText}>{item.description}</Text>
      <Button
        style={styles.buttonFavorites}
        title={
          favorites.includes(item)
            ? "Remove from Favorites"
            : "Add to Favorites"
        }
        color={favorites.includes(item) ? "red" : "green"}
        onPress={() => setFavorites((current) => [...current, item])}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={markers} renderItem={renderItem} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    fontFamily: "Gill Sans",
  },
  item: {
    backgroundColor: "#9147FF",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    color: "#FFFFFF",
    fontFamily: "Gill Sans",
  },
  bodyText: {
    fontSize: 14,
    color: "#29292E",
    fontFamily: "Gill Sans",
  },
  buttonFavorites: {
    backgroundColor: "#FFFFFF",
  },
});
