// import * as Location from "expo-location";
// import { useEffect, useState } from "react";
// import {
//   NavigationContainer,
//   DefaultTheme,
//   DarkTheme,
// } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// // import { I18nextProvider, useTranslation } from "react-i18next";
// // import i18next from "i18next";
// // import HttpApi from "i18next-http-backend";

// import Home from "./src/Home.js";
// import Map from "./src/Map.js";
// import List from "./src/List.js";
// import Settings from "./src/Settings.js";
// import Favorites from "./src/Favorites.js";

// export default function App() {
//   //Globals
//   const [markers, setMarkers] = useState([]);
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [data, setData] = useState(null);
//   const [theme, setTheme] = useState("light");
//   const [favorites, setFavorites] = useState([]);
//   const languages = ["en", "nl"]; // List of supported languages

//   // const languageDetector = {
//   //   type: "languageDetector",
//   //   async: true,
//   //   detect: async () => Localization.locale,
//   //   init: () => {},
//   //   cacheUserLanguage: () => {},
//   // };

//   // i18next
//   //   .use(HttpApi)
//   //   .use(languageDetector)
//   //   .use(initReactI18next)
//   //   .init({
//   //     fallbackLng: "en",
//   //     supportedLngs: languages,
//   //     backend: {
//   //       loadPath: "/locales/{{lng}}.json", // Path to your language files
//   //     },
//   //     react: {
//   //       useSuspense: false,
//   //     },
//   //   });

//   //when page loads, check if permission for location
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

//   //fetch data from API
//   function getData() {
//     fetch(`https://evavanderkroft.nl/festivalAppie/festivals.json`)
//       .then((res) => res.json())
//       .then((data) => {
//         setData(data);
//         initMarkers(data);
//       })
//       .catch((err) => console.log(err));
//   }

//   //convert into actually usefull syntax
//   function initMarkers(data) {
//     for (const single of data) {
//       if (Array.isArray(single.genres)) {
//         setMarkers((current) => [
//           ...current,
//           {
//             title: single.name,
//             coords: {
//               longitude: 1 * single.adress.lon,
//               latitude: 1 * single.adress.lat,
//             },
//             description: single.genres.join(", "),
//             info: "",
//           },
//         ]);
//       }
//     }
//   }

//   //main navigation
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
//               setFavorites={setFavorites}
//             />
//           )}
//         </Tab.Screen>

//         <Tab.Screen name="Favorites">
//           {(props) => (
//             <Favorites
//               {...props}
//               favorites={favorites}
//               setFavorites={setFavorites}
//             />
//           )}
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

// Import necessary libraries and components
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Import various app screens
import Home from "./src/Home.js";
import Map from "./src/Map.js";
import List from "./src/List.js";
import Settings from "./src/Settings.js";
import Favorites from "./src/Favorites.js";

// Define the main App component
export default function App() {
  // Define state variables for the app
  const [markers, setMarkers] = useState([]); // Array of markers on the map
  const [location, setLocation] = useState(null); // Current device location
  const [errorMsg, setErrorMsg] = useState(null); // Error message for location permission
  const [data, setData] = useState(null); // Data fetched from API
  const [theme, setTheme] = useState("light"); // App theme (light or dark)
  const [favorites, setFavorites] = useState([]); // Array of favorite markers
  const languages = ["en", "nl"]; // List of supported languages

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
              setFavorites={setFavorites}
            />
          )}
        </Tab.Screen>

        <Tab.Screen name="Favorites">
          {(props) => (
            <Favorites
              {...props}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          )}
        </Tab.Screen>

        <Tab.Screen name="Map">
          {(props) => <Map {...props} location={location} markers={markers} />}
        </Tab.Screen>

        <Tab.Screen name="Settings">
          {(props) => <Settings {...props} theme={theme} setTheme={setTheme} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
