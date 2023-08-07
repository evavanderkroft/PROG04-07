import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>FESTIVAL APPIE</Text>
      <Text style={styles.bodyText}>
        Welkom bij de app om je toekomste EDM festivals op te bekijken. Op deze
        app kan je zowel op de kaart kijken waar de festivals zich bevinden, als
        dat je het in een lijstweergave ziet.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    color: "#FFFFFF",
    marginTop: 10,
    fontSize: 45,
    fontFamily: "Cochin",
    fontWeight: "bold",
  },
  bodyText: {
    flex: 1,
    margin: 30,
    fontFamily: "Gill Sans",
    fontSize: 20,
  },
});
