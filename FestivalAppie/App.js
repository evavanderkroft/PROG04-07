// Importeer de benodigde bibliotheken en componenten
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Laad taalgegevens uit JSON-bestanden
import en from "./locales/en.json";
import nl from "./locales/nl.json";
import es from "./locales/es.json";
import de from "./locales/de.json";

// Importeer verschillende app-schermen
import Home from "./src/Home.js";
import Map from "./src/Map.js";
import List from "./src/List.js";
import Settings from "./src/Settings.js";
import Favorites from "./src/Favorites.js";
import Review from "./src/Review.js";

// Definieer de hoofd-App-component
export default function App() {
  // Definieer de statusvariabelen voor de app
  const [markers, setMarkers] = useState([]); // Array van markeringen op de kaart
  const [location, setLocation] = useState(null); // Huidige apparaatlocatie
  const [errorMsg, setErrorMsg] = useState(null); // Foutmelding voor locatietoestemming
  const [data, setData] = useState(null); // Gegevens opgehaald van API
  const [theme, setTheme] = useState("light"); // App-thema (licht of donker)
  const [favorites, setFavorites] = useState([]); // Array van favoriete markeringen
  const [language, setLanguage] = useState("en"); // Initialiseer taalstaat
  // Laad vertalingen op basis van geselecteerde taal
  const translations = {
    en,
    nl,
    es,
    de,
  };

  const translatedText = translations[language];
  // Stel een effect in om locatietoestemming te controleren en initiële gegevens op te halen
  useEffect(() => {
    (async () => {
      // Vraag voorgrond locatietoestemming op
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Toestemming voor toegang tot locatie geweigerd");
        return;
      }
      // Haal huidige apparaatlocatie op
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      // Haal gegevens op van API
      getData();
    })();
  }, []);

  // Toon een waarschuwing als er een foutmelding is
  if (errorMsg) {
    alert(errorMsg);
  }

  // Functie om gegevens op te halen van API
  function getData() {
    fetch(`https://evavanderkroft.nl/festivalAppie/festivals.json`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        initMarkers(data);
      })
      .catch((err) => console.log(err));
  }

  // Functie om markeringen te initialiseren op basis van opgehaalde gegevens
  function initMarkers(data) {
    for (const single of data) {
      if (Array.isArray(single.genres)) {
        setMarkers((current) => [
          ...current,
          {
            title: single.name,
            coords: {
              longitude: 1 * single.adress.lon,
              latitude: 1 * single.adress.lat,
            },
            description: single.genres.join(", "),
            info: "",
          },
        ]);
      }
    }
  }

  // Maak een bottom tab navigator voor de hoofdnavigatie van de app
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer theme={theme === "dark" ? DarkTheme : DefaultTheme}>
      <Tab.Navigator>
        {/* Definieer schermen voor elk tabblad */}
        <Tab.Screen name={translatedText.home}>
          {(props) => (
            <Home
              {...props}
              markers={markers}
              setMarkers={setMarkers}
              theme={theme}
              language={language}
              setLanguage={setLanguage}
            />
          )}
        </Tab.Screen>

        <Tab.Screen name={translatedText.list}>
          {(props) => (
            <List
              {...props}
              markers={markers}
              favorites={favorites}
              setFavorites={setFavorites}
              language={language}
              setLanguage={setLanguage}
            />
          )}
        </Tab.Screen>

        <Tab.Screen name={translatedText.favorites}>
          {(props) => (
            <Favorites
              {...props}
              favorites={favorites}
              setFavorites={setFavorites}
              theme={theme}
              language={language}
              setLanguage={setLanguage}
            />
          )}
        </Tab.Screen>

        <Tab.Screen name={translatedText.map}>
          {(props) => <Map {...props} location={location} markers={markers} />}
        </Tab.Screen>

        <Tab.Screen name={translatedText.review}>
          {(props) => (
            <Review
              {...props}
              markers={markers}
              setMarkers={setMarkers}
              theme={theme}
              language={language}
              setLanguage={setLanguage}
            />
          )}
        </Tab.Screen>

        <Tab.Screen name={translatedText.settings}>
          {(props) => (
            <Settings
              {...props}
              theme={theme}
              setTheme={setTheme}
              language={language}
              setLanguage={setLanguage}
              favorites={favorites}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
