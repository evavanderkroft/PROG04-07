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
// Load language data from JSON files
import en from "../locales/en.json";
import nl from "../locales/nl.json";
import es from "../locales/es.json";
import de from "../locales/de.json";

export default function Review({ markers, theme, language }) {
  //globals
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

  //when page loads, get everything from asyncstorage
  useEffect(() => {
    getData();
  }, []);

  //when the markers are fetched from app.js, put info in the dropdown
  useEffect(() => {
    const titles = [];
    if (markers) {
      markers.map((marker) => {
        titles.push({ label: marker.title, value: marker.title });
      });
    }
    setItems(titles);
  }, [markers]);

  //rendering the flatlist
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.title}>{item[0]}</Text>
      <Text style={styles.review}>{item[1]}</Text>
    </TouchableOpacity>
  );

  //saving info to asyncstorage
  async function saveInfo(text, title) {
    try {
      await AsyncStorage.setItem(title, text);
    } catch (err) {
      console.log(err);
    }
    getData();
  }

  //get everything from asyncstorage
  async function getData() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const storedData = await AsyncStorage.multiGet(keys);
      if (storedData !== null) {
        setData(storedData);
      } else {
        setData(["No data to display"]);
      }
    } catch (err) {
      console.log(err);
    }
  }

  //function to wipe all async storage
  async function clearAsyncStorage() {
    await AsyncStorage.clear();
    getData();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.titleReview, titleTextColor]}>
        {translatedText.reviewTitle}
      </Text>
      <Text style={[styles.headlineReview, headlineTextColor]}>
        {translatedText.reviewBody}
      </Text>
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
      <TextInput
        multiline
        numberOfLines={3}
        style={styles.inputText}
        onChangeText={onChangeText}
        value={text}
      />
      <FlatList data={data} renderItem={renderItem} />
      <Button
        title={translatedText.saveReview}
        onPress={() => saveInfo(text, value)}
        style={styles.button}
      />
      <Button
        title={translatedText.deleteReviews}
        onPress={() => clearAsyncStorage()}
        style={styles.button}
      />
    </SafeAreaView>
  );
}

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
    color: "black", // Define your dark theme body text color here
  },
  lightBodyText: {
    color: "white", // Define your light theme body text color here
  },
});
