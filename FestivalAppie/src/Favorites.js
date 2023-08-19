// Importeer de nodige componenten van React en React Native
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

// Laad taalgegevens uit JSON-bestanden
import en from "../locales/en.json";
import nl from "../locales/nl.json";
import es from "../locales/es.json";
import de from "../locales/de.json";

// Definieer de Favorites-component die een lijst met favoriete markers weergeeft
export default function Favorites({
  favorites, // Array van favoriete markers
  setFavorites, // Functie om favorieten bij te werken
  route, // Routobject met navigatieparameters
  navigation, // Navigatieobject om schermnavigatie te regelen
  theme, // Themaobject om thema te veranderen
  language, // taalobject voor als de taal veranderd
}) {
  // Controleer of er favorieten zijn
  const [hasFavorites, setHasFavorites] = useState(favorites.length > 0);
  // Laad vertalingen op basis van de geselecteerde taal
  const translations = {
    en,
    nl,
    es,
    de,
  };

  const translatedText = translations[language];
  const bodyTextColor =
    theme === "dark" ? styles.lightBodyText : styles.darkBodyText;

  // Stel een effect in om favorieten bij te werken wanneer het scherm de focus krijgt
  useEffect(() => {
    const focusListener = navigation.addListener(
      "focus",
      () => {
        // Werk favorieten bij wanneer er nieuwe favorieten worden doorgegeven via routeparameters
        if (route.params && route.params.favorites) {
          setFavorites(route.params.favorites);
          setHasFavorites(route.params.favorites.length > 0);
        } else {
          console.log("leeg");
        }
      },
      [route.params]
    );

    // Ruim de focusluisteraar op wanneer de component wordt verwijderd
    return () => {
      focusListener();
    };
  }, [navigation, route.params]);

  return (
    // Render de lay-out van het Favorites-scherm
    <SafeAreaView style={styles.container}>
      {/* Toon de titel van favoriete markers */}
      <Text style={[styles.title, bodyTextColor]}>
        {translatedText.favoriteMarkers}
      </Text>
      {hasFavorites ? (
        // Toon de lijst met favoriete markers
        <FlatList
          data={favorites}
          renderItem={({ item }) => (
            // Maak elke favoriete marker klikbaar om naar de kaart te navigeren
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
        // Toon een bericht wanneer er geen favoriete markers zijn
        <Text style={styles.NoFavsText}>{translatedText.noFavorites}</Text>
      )}
    </SafeAreaView>
  );
}

// Definieer stijlen voor de componenten
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
    color: "black", // Definieer hier de kleur van de donkere thematekst
  },
  lightBodyText: {
    color: "white", // Definieer hier de kleur van de lichte thematekst
  },
});
