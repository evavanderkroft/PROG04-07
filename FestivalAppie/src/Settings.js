// Importeer de nodige componenten van React en React Native
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

// Laad taalgegevens uit JSON-bestanden
import en from "../locales/en.json";
import nl from "../locales/nl.json";
import es from "../locales/es.json";
import de from "../locales/de.json";

// Definieer de Settings-component die instellingen weergeeft
export default function Settings({
  theme, // Huidige thema
  setTheme, // Functie om thema te wijzigen
  language, // Huidige taal
  setLanguage, // Functie om taal te wijzigen
}) {
  // Variabelen
  const [oppositeTheme, setOppositeTheme] = useState();

  // Wanneer het thema verandert, verander het tegenovergestelde thema voor de knop
  useEffect(() => {
    if (theme === "dark") {
      setOppositeTheme("light");
    } else {
      setOppositeTheme("dark");
    }
  }, [theme]);

  // Bij het indrukken van de knop, schakel het thema om
  function toggleSwitch(currentTheme) {
    if (currentTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }

  // Laad vertalingen op basis van de geselecteerde taal
  const translations = {
    en,
    nl,
    es,
    de,
  };

  const defaultLanguage = "en"; // Stel hier je standaard taalcode in
  const translatedText = translations[language || defaultLanguage];

  // Functie om de taal te wijzigen
  function changeLanguage(newLanguage) {
    console.log("Taal wordt gewijzigd naar:", newLanguage);
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
        {/* Knop om thema te veranderen */}
        <Button
          title={`${translatedText.changeThemeTo} ${translatedText[oppositeTheme]}`}
          onPress={() => toggleSwitch(theme)}
        />
        <View style={styles.languageButtons}>
          {/* Knoppen om taal te wijzigen */}
          {languageFlags.map((item) => (
            <TouchableOpacity
              key={item.code}
              onPress={() => changeLanguage(item.code)}
            >
              {/* Vlag-emoji om taal aan te geven */}
              <Text style={styles.languageFlag}>{item.flag}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

// Stijlen voor de component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#F5F5F5", // Optionele achtergrondkleur
  },
  content: {
    width: "80%", // Pas aan indien nodig
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
