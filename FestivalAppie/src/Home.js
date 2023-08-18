import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Home({ theme }) {
  const bodyTextColor =
    theme === "dark" ? styles.lightBodyText : styles.darkBodyText;

  return (
    <View style={styles.container}>
      <Text style={[styles.titleText]}>FestivalAppie</Text>
      <Text style={[styles.bodyText, bodyTextColor]}>
        Welkom bij de app om je toekomstige EDM festivals op te bekijken. Op
        deze app kun je zowel op de kaart kijken waar de festivals zich
        bevinden, als dat je het in een lijstweergave ziet.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  titleText: {
    marginTop: 10,
    fontSize: 45,
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
