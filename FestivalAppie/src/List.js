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

import {
  isMarkerInFavorites,
  addToFavorites,
  removeFromFavorites,
} from "./helpers.js";

export default function List({ markers, navigation }) {
  //rendering the flatlist. On press, go to map with that marker.
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (favorites.length > 0) {
      navigation.navigate("Favorites");
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
          isMarkerInFavorites(item, favorites)
            ? "Remove from Favorites"
            : "Add to Favorites"
        }
        color={isMarkerInFavorites(item, favorites) ? "red" : "green"}
        onPress={() => handleAddToFavorites(item)}
      />
    </TouchableOpacity>
  );

  // const handleAddToFavorites = (marker) => {
  //   console.log("Before Set Favorites:", favorites);

  //   if (!isMarkerInFavorites(marker, favorites)) {
  //     favorites.push(marker);
  //     console.log("Updated Favorites:", favorites);
  //     // setFavorites(updatedFavorites);
  //     // console.log("de state is veranderd");
  //     navigation.navigate("Favorites");
  //   } else {
  //     const updatedFavorites = removeFromFavorites(favorites, marker);
  //     console.log("Updated Favorites1:", updatedFavorites);
  //     setFavorites(updatedFavorites);
  //   }
  // };

  const handleAddToFavorites = (marker) => {
    if (!isMarkerInFavorites(marker, favorites)) {
      const updatedFavorites = [...favorites, marker];
      setFavorites(updatedFavorites);
    } else {
      const updatedFavorites = removeFromFavorites(favorites, marker);
      setFavorites(updatedFavorites);
    }
  };

  // const handleAddToFavorites = async (marker) => {
  //   if (!isMarkerInFavorites(marker, favorites)) {
  //     const updatedFavorites = [...favorites, marker];
  //     await setFavorites(updatedFavorites); // Use await to ensure state update completes
  //     navigation.navigate("Favorites");
  //   } else {
  //     const updatedFavorites = removeFromFavorites(favorites, marker);
  //     setFavorites(updatedFavorites);
  //   }
  // };

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
