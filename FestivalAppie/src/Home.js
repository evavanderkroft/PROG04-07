import React from "react";
import { StyleSheet, Text, View } from "react-native";

// Load language data from JSON files
import en from "../locales/en.json";
import nl from "../locales/nl.json";
import es from "../locales/es.json";
import de from "../locales/de.json";

export default function Home({ theme, language }) {
  // Load translations based on selected language
  const translations = {
    en,
    nl,
    es,
    de,
  };

  const translatedText = translations[language];
  const bodyTextColor =
    theme === "dark" ? styles.lightBodyText : styles.darkBodyText;

  return (
    <View style={styles.container}>
      <Text style={[styles.titleText]}>{translatedText.welcome}</Text>
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
    // width: "90%",
    justifyContent: "center",
  },
  titleText: {
    textAlign: "center", // Center the text horizontally
    textAlignVertical: "center", // Center the text vertically
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
    color: "black", // Define your dark theme body text color here
  },
  lightBodyText: {
    color: "white", // Define your light theme body text color here
  },
});
