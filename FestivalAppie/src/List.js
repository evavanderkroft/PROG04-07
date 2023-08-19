// Importeer de benodigde onderdelen van React en React Native
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

// Laad taalgegevens uit JSON-bestanden
import en from "../locales/en.json";
import nl from "../locales/nl.json";
import es from "../locales/es.json";
import de from "../locales/de.json";

// Definieer het List-component dat een lijst met markers weergeeft
export default function List({
  markers,
  navigation,
  favorites,
  setFavorites,
  language,
}) {
  const translations = {
    en,
    nl,
    es,
    de,
  };

  const translatedText = translations[language];

  // Functie om markers als favorieten in te stellen of ze uit favorieten te verwijderen
  const toggleFavorite = (item) => {
    if (favorites.some((fav) => fav.title === item.title)) {
      // Als het al een favoriet is, verwijder het dan uit favorieten
      const updatedFavorites = favorites.filter(
        (fav) => fav.title !== item.title
      );
      setFavorites(updatedFavorites);
      navigation.navigate(translatedText.favorites, {
        favorites: updatedFavorites,
      });
      // Werk de navigatieparameter en de staat voor favorieten bij
    } else {
      // Als het geen favoriet is, voeg het dan toe aan favorieten
      const updatedFavorites = [...favorites, item];
      setFavorites(updatedFavorites);
      navigation.navigate(translatedText.favorites, {
        favorites: updatedFavorites,
      });
    }
  };

  // Functie om te controleren of een item een favoriet is
  const isFavorite = (item) =>
    favorites.some((fav) => fav.title === item.title);

  // Functie om elk item in de FlatList weer te geven
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(translatedText.map, { currentMarker: item })
      }
      style={styles.item}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.bodyText}>{item.description}</Text>
      <TouchableOpacity
        style={[
          styles.buttonFavorites,
          { backgroundColor: isFavorite(item) ? "red" : "green" },
        ]}
        onPress={() => toggleFavorite(item)}
      >
        <Text style={styles.buttonText}>
          {isFavorite(item)
            ? translatedText.removeFromFavorites
            : translatedText.addToFavorites}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  // Zet een effect op om favorieten bij te werken in navigatieparameters
  useEffect(() => {
    navigation.setParams({ favorites });
  }, [favorites]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={markers} renderItem={renderItem} />
    </SafeAreaView>
  );
}

// Definieer stijlen voor de componenten
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
    borderRadius: 10,
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
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    fontFamily: "Gill Sans",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
