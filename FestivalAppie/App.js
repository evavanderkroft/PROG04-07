// Import necessary libraries and components
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Load language data from JSON files
import en from "./locales/en.json";
import nl from "./locales/nl.json";
import es from "./locales/es.json";
import de from "./locales/de.json";

// Import various app screens
import Home from "./src/Home.js";
import Map from "./src/Map.js";
import List from "./src/List.js";
import Settings from "./src/Settings.js";
import Favorites from "./src/Favorites.js";
import Review from "./src/Review.js";

// Define the main App component
export default function App() {
  // Define state variables for the app
  const [markers, setMarkers] = useState([]); // Array of markers on the map
  const [location, setLocation] = useState(null); // Current device location
  const [errorMsg, setErrorMsg] = useState(null); // Error message for location permission
  const [data, setData] = useState(null); // Data fetched from API
  const [theme, setTheme] = useState("light"); // App theme (light or dark)
  const [favorites, setFavorites] = useState([]); // Array of favorite markers
  const [language, setLanguage] = useState("en"); // Initialize language state
  // Load translations based on selected language
  const translations = {
    en,
    nl,
    es,
    de,
  };

  const translatedText = translations[language];
  // Set up an effect to check for location permission and fetch initial data
  useEffect(() => {
    (async () => {
      // Request foreground location permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      // Get the current device location
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      // Fetch data from API
      getData();
    })();
  }, []);

  // Display an alert if there is an error message
  if (errorMsg) {
    alert(errorMsg);
  }

  // Function to fetch data from API
  function getData() {
    fetch(`https://evavanderkroft.nl/festivalAppie/festivals.json`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        initMarkers(data);
      })
      .catch((err) => console.log(err));
  }

  // Function to initialize markers from fetched data
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

  // Create a bottom tab navigator for main app navigation
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer theme={theme === "dark" ? DarkTheme : DefaultTheme}>
      <Tab.Navigator>
        {/* Define screens for each tab */}
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
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
