// Import necessary components from React and React Native
import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Button,
} from "react-native";

// Define the List component that displays a list of markers
export default function List({ markers, navigation, favorites, setFavorites }) {
  // Set up an effect to navigate to the Favorites screen when favorites change
  useEffect(() => {
    if (favorites.length > 0) {
      navigation.navigate("Favorites", { favorites });
    }
  });

  // Function to toggle markers as favorites or remove them from favorites
  const toggleFavorite = (item) => {
    if (favorites.some((fav) => fav.title === item.title)) {
      // If already a favorite, remove it from favorites
      const updatedFavorites = favorites.filter(
        (fav) => fav.title !== item.title
      );

      // Update the navigation parameter and state for favorites
      navigation.navigate("Favorites", { favorites: updatedFavorites });
      setFavorites(updatedFavorites.length > 0 ? updatedFavorites : []);
    } else {
      // If not a favorite, add it to favorites
      setFavorites((currentFavorites) => [...currentFavorites, item]);
    }
  };

  // Function to check if an item is a favorite
  const isFavorite = (item) =>
    favorites.some((fav) => fav.title === item.title);

  // Function to render each item in the FlatList
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Map", { currentMarker: item })}
      style={styles.item}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.bodyText}>{item.description}</Text>
      <Button
        title={isFavorite(item) ? "Remove from Favorites" : "Add to Favorites"}
        color={isFavorite(item) ? "red" : "green"}
        onPress={() => toggleFavorite(item)}
      />
    </TouchableOpacity>
  );

  // Set up an effect to update favorites in navigation params
  useEffect(() => {
    navigation.setParams({ favorites });
  }, [favorites]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Render a FlatList with the provided markers */}
      <FlatList data={markers} renderItem={renderItem} />
    </SafeAreaView>
  );
}

// Define styles for the components
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
