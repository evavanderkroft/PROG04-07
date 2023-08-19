// Import necessary components from React and React Native
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";

// Load language data from JSON files
import en from "../locales/en.json";
import nl from "../locales/nl.json";
import es from "../locales/es.json";
import de from "../locales/de.json";

// Define the Favorites component that displays a list of favorite markers
export default function Favorites({
  favorites, // Array of favorite markers
  setFavorites, // Function to update favorites
  route, // Route object containing navigation parameters
  navigation, // Navigation object to control screen navigation
  theme,
  language,
}) {
  // Check if there are any favorites
  const [hasFavorites, setHasFavorites] = useState(favorites.length > 0);
  const translations = {
    en,
    nl,
    es,
    de,
  };

  const translatedText = translations[language];
  const bodyTextColor =
    theme === "dark" ? styles.lightBodyText : styles.darkBodyText;

  // Set up an effect to update favorites when the screen receives focus
  useEffect(() => {
    const focusListener = navigation.addListener(
      "focus",
      () => {
        // Update favorites when new favorites are passed through route parameters
        if (route.params && route.params.favorites) {
          setFavorites(route.params.favorites);
          setHasFavorites(route.params.favorites.length > 0);
        } else {
          console.log("empty");
        }
      },
      [route.params]
    );

    // Clean up the focus listener when the component unmounts
    return () => {
      focusListener();
    };
  }, [navigation, route.params]);

  return (
    // Render the Favorites screen layout
    <SafeAreaView style={styles.container}>
      <Text style={[styles.title, bodyTextColor]}>
        {translatedText.favoriteMarkers}
      </Text>
      {hasFavorites ? (
        // Display the list of favorite markers
        <FlatList
          data={favorites}
          renderItem={({ item }) => (
            // Make each favorite marker clickable to navigate to the map
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(translatedText.map, { currentMarker: item })
              }
            >
              <View style={styles.item}>
                <Text style={styles.itemText}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        // Display a message when there are no favorite markers
        <Text style={styles.NoFavsText}>{translatedText.noFavorites}</Text>
      )}
    </SafeAreaView>
  );
}

// Define styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    margin: 20,
    fontFamily: "Gill Sans",
  },
  item: {
    backgroundColor: "#9147FF",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
    fontFamily: "Gill Sans",
    alignSelf: "center",
    margin: 10,
    color: "#9147FF",
  },
  itemText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontFamily: "Gill Sans",
  },
  removeButton: {
    color: "red",
  },
  NoFavsText: {
    fontSize: 24,
    fontFamily: "Gill Sans",
    color: "#9147FF",
  },

  darkBodyText: {
    color: "black", // Define your dark theme body text color here
  },
  lightBodyText: {
    color: "white", // Define your light theme body text color here
  },
});
