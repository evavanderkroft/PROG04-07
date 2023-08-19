import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Button,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";

// Load language data from JSON files
import en from "../locales/en.json";
import nl from "../locales/nl.json";
import es from "../locales/es.json";
import de from "../locales/de.json";

export default function Settings({
  theme,
  setTheme,
  language,
  setLanguage,
  navigation,
}) {
  // Variables
  const [oppositeTheme, setOppositeTheme] = useState();

  // When theme changes, change the opposite theme for the button
  useEffect(() => {
    if (theme === "dark") {
      setOppositeTheme("light");
    } else {
      setOppositeTheme("dark");
    }
  }, [theme]);

  // On button press, switch the theme
  function toggleSwitch(currentTheme) {
    if (currentTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }

  // Load translations based on selected language
  const translations = {
    en,
    nl,
    es,
    de,
  };

  const defaultLanguage = "en"; // Set your default language code here
  const translatedText = translations[language || defaultLanguage];

  function changeLanguage(newLanguage) {
    console.log("Changing language to:", newLanguage);
    if (setLanguage) {
      setLanguage(newLanguage);
    }
  }
  const languageFlags = [
    { code: "en", flag: "🇺🇸" },
    { code: "nl", flag: "🇳🇱" },
    { code: "es", flag: "🇪🇸" },
    { code: "de", flag: "🇩🇪" },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Button
          title={`${translatedText.changeThemeTo} ${translatedText[oppositeTheme]}`}
          onPress={() => toggleSwitch(theme)}
        />
        <View style={styles.languageButtons}>
          {languageFlags.map((item) => (
            <TouchableOpacity
              key={item.code}
              onPress={() => changeLanguage(item.code)}
            >
              <Text style={styles.languageFlag}>{item.flag}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#F5F5F5", // Optional background color
  },
  content: {
    width: "80%", // Adjust as needed
  },
  title: {
    marginTop: 20,
  },
  languageButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  languageFlag: {
    fontSize: 30,
    marginHorizontal: 10,
  },
});
