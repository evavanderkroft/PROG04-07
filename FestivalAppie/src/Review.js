import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";

import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Laad taalgegevens uit JSON-bestanden
import en from "../locales/en.json";
import nl from "../locales/nl.json";
import es from "../locales/es.json";
import de from "../locales/de.json";

export default function Review({ markers, theme, language }) {
  // Globale variabelen
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [text, onChangeText] = useState();
  const [data, setData] = useState();
  const titleTextColor =
    theme === "dark" ? styles.lightBodyText : styles.darkBodyText;
  const headlineTextColor =
    theme === "dark" ? styles.lightBodyText : styles.darkBodyText;
  const translations = {
    en,
    nl,
    es,
    de,
  };

  const translatedText = translations[language];

  // Wanneer de pagina laadt, haal alles op uit asyncstorage
  useEffect(() => {
    getData();
  }, []);

  // Wanneer de markers worden opgehaald van app.js, zet informatie in de dropdown
  useEffect(() => {
    // Maak een lijst van labels en waarden voor de dropdown
    const titles = [];
    if (markers) {
      markers.map((marker) => {
        titles.push({ label: marker.title, value: marker.title });
      });
    }
    // Zet de lijst in de dropdown
    setItems(titles);
  }, [markers]);

  // Renderen van elk item in de flatlist
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.title}>{item[0]}</Text>
      <Text style={styles.review}>{item[1]}</Text>
    </TouchableOpacity>
  );

  // Informatie opslaan in asyncstorage
  async function saveInfo(text, title) {
    try {
      // Sla de tekst op onder de geselecteerde titel
      await AsyncStorage.setItem(title, text);
    } catch (err) {
      console.log(err);
    }
    // Vernieuw de getoonde gegevens
    getData();
  }

  // Alles ophalen uit asyncstorage
  async function getData() {
    try {
      // Haal alle sleutels (titels) op uit asyncstorage
      const keys = await AsyncStorage.getAllKeys();
      // Haal bijbehorende gegevens op voor elke sleutel (titel)
      const storedData = await AsyncStorage.multiGet(keys);
      if (storedData !== null) {
        // Zet de opgehaalde gegevens in de staat voor weergave
        setData(storedData);
      } else {
        // Als er geen gegevens zijn, toon een standaardbericht
        setData(["Geen gegevens om weer te geven"]);
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Functie om alle asyncstorage te wissen
  async function clearAsyncStorage() {
    // Wis alle opgeslagen gegevens in asyncstorage
    await AsyncStorage.clear();
    // Vernieuw de getoonde gegevens
    getData();
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Weergave van de titel voor het scherm */}
      <Text style={[styles.titleReview, titleTextColor]}>
        {translatedText.reviewTitle}
      </Text>
      {/* Weergave van de inleiding voor recensies */}
      <Text style={[styles.headlineReview, headlineTextColor]}>
        {translatedText.reviewBody}
      </Text>
      {/* Dropdown voor het selecteren van een marker */}
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder={translatedText.selectAnItem}
        style={styles.dropdown}
      />
      {/* Tekstinvoerveld voor het invoeren van een recensie */}
      <TextInput
        multiline
        numberOfLines={3}
        style={styles.inputText}
        onChangeText={onChangeText}
        value={text}
      />
      {/* Weergave van opgeslagen recensies in een lijst */}
      <FlatList data={data} renderItem={renderItem} />
      {/* Knop om de huidige recensie op te slaan */}
      <Button
        title={translatedText.saveReview}
        onPress={() => saveInfo(text, value)}
        style={styles.button}
      />
      {/* Knop om alle opgeslagen recensies te verwijderen */}
      <Button
        title={translatedText.deleteReviews}
        onPress={() => clearAsyncStorage()}
        style={styles.button}
      />
    </SafeAreaView>
  );
}

// Stijlen voor de componenten
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    margin: 15,
  },
  item: {
    backgroundColor: "#9147FF",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  inputText: {
    margin: 12,
    borderWidth: 1,
    textAlign: "center",
    padding: 8,
    color: "#9147FF",
    backgroundColor: "#ffffff",
    fontFamily: "Gill Sans",
  },
  button: {
    paddingBottom: 12,
  },
  title: {
    fontSize: 25,
    fontFamily: "Gill Sans",
  },
  review: {
    fontSize: 18,
    fontFamily: "Gill Sans",
  },
  headlineReview: {
    fontSize: 22,
    fontFamily: "Gill Sans",
    margin: 10,
    textAlign: "center",
  },
  dropdown: {
    marginTop: 10,
  },
  titleReview: {
    margin: 10,
    fontSize: 35,
    fontFamily: "Cochin",
    fontWeight: "bold",
    textAlign: "center",
  },

  darkBodyText: {
    color: "black",
  },

  lightBodyText: {
    color: "white", // Define your light theme body text color here
  },
});
