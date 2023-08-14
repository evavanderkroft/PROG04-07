import * as Location from "expo-location";
import { useEffect, useState } from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { I18nextProvider, useTranslation } from "react-i18next";
// import i18next from "i18next";
// import HttpApi from "i18next-http-backend";

import Home from "./src/Home.js";
import Map from "./src/Map.js";
import List from "./src/List.js";
import Settings from "./src/Settings.js";
import Favorites from "./src/Favorites.js";

export default function App() {
  //Globals
  const [markers, setMarkers] = useState([]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [data, setData] = useState(null);
  const [theme, setTheme] = useState("light");
  const [favorites, setFavorites] = useState([]);
  const languages = ["en", "nl"]; // List of supported languages

  // const languageDetector = {
  //   type: "languageDetector",
  //   async: true,
  //   detect: async () => Localization.locale,
  //   init: () => {},
  //   cacheUserLanguage: () => {},
  // };

  // i18next
  //   .use(HttpApi)
  //   .use(languageDetector)
  //   .use(initReactI18next)
  //   .init({
  //     fallbackLng: "en",
  //     supportedLngs: languages,
  //     backend: {
  //       loadPath: "/locales/{{lng}}.json", // Path to your language files
  //     },
  //     react: {
  //       useSuspense: false,
  //     },
  //   });

  //when page loads, check if permission for location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});

      setLocation(location);
      getData();
    })();
  }, []);

  if (errorMsg) {
    alert(errorMsg);
  }

  //fetch data from API
  function getData() {
    fetch(`https://evavanderkroft.nl/festivalAppie/festivals.json`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        initMarkers(data);
      })
      .catch((err) => console.log(err));
  }

  //convert into actually usefull syntax
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
  const addToFavorites = (marker) => {
    if (!isMarkerInFavorites(marker)) {
      setFavorites([...favorites, marker]);
    }
  };

  const removeFromFavorites = (marker) => {
    setFavorites(
      favorites.filter((favMarker) => favMarker.title !== marker.title)
    );
  };

  //main navigation
  const Tab = createBottomTabNavigator();
  return (
    // <I18nextProvider i18n={i18next}>
    <NavigationContainer theme={theme === "dark" ? DarkTheme : DefaultTheme}>
      <Tab.Navigator>
        <Tab.Screen name="Home">
          {(props) => (
            <Home {...props} markers={markers} setMarkers={setMarkers} />
          )}
        </Tab.Screen>

        <Tab.Screen name="List">
          {(props) => (
            <List
              {...props}
              markers={markers}
              favorites={favorites}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
            />
          )}
        </Tab.Screen>

        <Tab.Screen name="Favorites">
          {(props) => <Favorites {...props} favorites={favorites} />}
        </Tab.Screen>

        <Tab.Screen name="Map">
          {(props) => <Map {...props} location={location} markers={markers} />}
        </Tab.Screen>

        <Tab.Screen name="Settings">
          {(props) => <Settings {...props} theme={theme} setTheme={setTheme} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
    // </I18nextProvider>
  );
}

// import React, { useEffect, useState } from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import "intl-pluralrules";

// import {
//   I18nextProvider,
//   useTranslation,
//   initReactI18next,
// } from "react-i18next";
// import i18next from "i18next";
// import HttpApi from "i18next-http-backend";
// import * as Location from "expo-location";
// import {
//   NavigationContainer,
//   DefaultTheme,
//   DarkTheme,
// } from "@react-navigation/native";

// import Home from "./src/Home.js";
// import Map from "./src/Map.js";
// import List from "./src/List.js";
// import Settings from "./src/Settings.js";
// import Favorites from "./src/Favorites.js";

// export default function App() {
//   // Globals
//   const [markers, setMarkers] = useState([]);
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [theme, setTheme] = useState("light");
//   const [favorites, setFavorites] = useState([]);
//   const languages = ["en", "nl"]; // List of supported languages

//   const languageDetector = {
//     type: "languageDetector",
//     async: true,
//     detect: async () => i18next.services.languageUtils.getBestMatch(languages),
//     init: () => {},
//     cacheUserLanguage: () => {},
//   };

//   i18next
//     .use(HttpApi)
//     .use(languageDetector)
//     .use(initReactI18next)
//     .init({
//       fallbackLng: "en",
//       supportedLngs: languages,
//       backend: {
//         loadPath: "./languages/{{lng}}.json", // Path to your language files
//       },
//       react: {
//         useSuspense: false,
//       },
//     });

//   // When page loads, check if permission for location
//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         setErrorMsg("Permission to access location was denied");
//         return;
//       }
//       let location = await Location.getCurrentPositionAsync({});

//       setLocation(location);
//       getData();
//     })();
//   }, []);

//   if (errorMsg) {
//     alert(errorMsg);
//   }

//   // Fetch data from API
//   function getData() {
//     fetch(`https://evavanderkroft.nl/festivalAppie/festivals.json`)
//       .then((res) => res.json())
//       .then((data) => {
//         setData(data);
//         initMarkers(data);
//       })
//       .catch((err) => console.log(err));
//   }

//   // Convert into actually useful syntax
//   function initMarkers(data) {
//     const newMarkers = data.map((single) => ({
//       title: single.name,
//       coords: {
//         longitude: parseFloat(single.adress.lon),
//         latitude: parseFloat(single.adress.lat),
//       },
//       description: Array.isArray(single.genres) ? single.genres.join(", ") : "",
//       info: "",
//     }));
//     setMarkers(newMarkers);
//   }

//   // Function to add a marker to favorites
//   const addToFavorites = (marker) => {
//     if (!isMarkerInFavorites(marker)) {
//       setFavorites([...favorites, marker]);
//     }
//   };

//   // Function to remove a marker from favorites
//   const removeFromFavorites = (marker) => {
//     setFavorites(
//       favorites.filter((favMarker) => favMarker.title !== marker.title)
//     );
//   };

//   // Main navigation
//   const Tab = createBottomTabNavigator();
//   return (
//     // <I18nextProvider i18n={i18next}>
//     <NavigationContainer theme={theme === "dark" ? DarkTheme : DefaultTheme}>
//       <Tab.Navigator>
//         <Tab.Screen name="Home">
//           {(props) => (
//             <Home {...props} markers={markers} setMarkers={setMarkers} />
//           )}
//         </Tab.Screen>
//         <Tab.Screen name="List">
//           {(props) => (
//             <List
//               {...props}
//               markers={markers}
//               favorites={favorites}
//               addToFavorites={addToFavorites}
//               removeFromFavorites={removeFromFavorites}
//             />
//           )}
//         </Tab.Screen>
//         <Tab.Screen name="Favorites">
//           {(props) => <Favorites {...props} favorites={favorites} />}
//         </Tab.Screen>
//         <Tab.Screen name="Map">
//           {(props) => <Map {...props} location={location} markers={markers} />}
//         </Tab.Screen>
//         <Tab.Screen name="Settings">
//           {(props) => <Settings {...props} theme={theme} setTheme={setTheme} />}
//         </Tab.Screen>
//       </Tab.Navigator>
//     </NavigationContainer>
//     // </I18nextProvider>
//   );
// }
