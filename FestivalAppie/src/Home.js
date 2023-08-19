import React from "react";
import { StyleSheet, Text, View } from "react-native";

// Laad taalgegevens uit JSON-bestanden
import en from "../locales/en.json";
import nl from "../locales/nl.json";
import es from "../locales/es.json";
import de from "../locales/de.json";

export default function Home({ theme, language }) {
  // Laad vertalingen op basis van geselecteerde taal
  const translations = {
    en,
    nl,
    es,
    de,
  };

  // Haal vertaalde tekst op op basis van geselecteerde taal
  const translatedText = translations[language];

  // Bepaal de kleur van de lichaamstekst op basis van het thema
  const bodyTextColor =
    theme === "dark" ? styles.lightBodyText : styles.darkBodyText;

  return (
    <View style={styles.container}>
      {/* Toon de vertaalde welkomsttekst */}
      <Text style={[styles.titleText]}>{translatedText.welcome}</Text>
      {/* Toon de vertaalde beschrijvingstekst */}
      <Text style={[styles.bodyText, bodyTextColor]}>
        {translatedText.description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: 10,
    fontSize: 60,
    fontFamily: "Cochin",
    fontWeight: "bold",
    color: "#9147FF",
  },
  bodyText: {
    flex: 1,
    margin: 30,
    fontFamily: "Gill Sans",
    fontSize: 20,
  },

  darkBodyText: {
    color: "black",
  },
  lightBodyText: {
    color: "white",
  },
});
