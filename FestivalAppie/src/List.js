// import React, { useState, useEffect } from "react";
// import {
//   StyleSheet,
//   Text,
//   FlatList,
//   SafeAreaView,
//   StatusBar,
//   TouchableOpacity,
//   Button,
// } from "react-native";

// export default function List({ markers, navigation }) {
//   //rendering the flatlist. On press, go to map with that marker.
//   const [favorites, setFavorites] = useState([]);

//   useEffect(() => {
//     if (favorites.length > 0) {
//       navigation.navigate("Favorites", { favorites });
//     }
//     // if (favorites.length === 0) {
//     //   favorites = [];
//     // }

//     // if (favorites.length === 0) {
//     //   console.log("empty favs");
//     //   favorites = [];
//     // }
//   }, [favorites]);

//   const toggleFavorite = (item) => {
//     if (favorites.some((fav) => fav.title === item.title)) {
//       setFavorites((currentFavorites) =>
//         currentFavorites.filter((fav) => fav.title !== item.title)
//       );
//     } else {
//       setFavorites((currentFavorites) => [...currentFavorites, item]);
//     }
//   };

//   const isFavorite = (item) =>
//     favorites.some((fav) => fav.title === item.title);

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       onPress={() => navigation.navigate("Map", { currentMarker: item })}
//       style={styles.item}
//     >
//       <Text style={styles.title}>{item.title}</Text>
//       <Text style={styles.bodyText}>{item.description}</Text>
//       <Button
//         style={styles.buttonFavorites}
//         title={isFavorite(item) ? "Remove from Favorites" : "Add to Favorites"}
//         color={isFavorite(item) ? "red" : "green"}
//         onPress={() => toggleFavorite(item)}
//       />
//     </TouchableOpacity>
//   );

//   useEffect(() => {
//     navigation.setParams({ favorites }); // Update favorites in navigation params
//   }, [favorites]);

//   return (
//     <SafeAreaView style={styles.container}>
//       <FlatList data={markers} renderItem={renderItem} />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: StatusBar.currentHeight || 0,
//     fontFamily: "Gill Sans",
//   },
//   item: {
//     backgroundColor: "#9147FF",
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   title: {
//     fontSize: 32,
//     color: "#FFFFFF",
//     fontFamily: "Gill Sans",
//   },
//   bodyText: {
//     fontSize: 14,
//     color: "#29292E",
//     fontFamily: "Gill Sans",
//   },
//   buttonFavorites: {
//     backgroundColor: "#FFFFFF",
//   },
// });
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Button,
} from "react-native";

export default function List({ markers, navigation }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (favorites.length > 0) {
      navigation.navigate("Favorites", { favorites });
    }
  });

  const toggleFavorite = (item) => {
    if (favorites.some((fav) => fav.title === item.title)) {
      const updatedFavorites = favorites.filter(
        (fav) => fav.title !== item.title
      );
      console.log("Removing from favorites:", item.title);
      setFavorites(updatedFavorites.length > 0 ? updatedFavorites : []);
    } else {
      console.log("Adding to favorites:", item.title);
      setFavorites((currentFavorites) => [...currentFavorites, item]);
    }
  };

  const isFavorite = (item) =>
    favorites.some((fav) => fav.title === item.title);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Map", { currentMarker: item })}
      style={styles.item}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.bodyText}>{item.description}</Text>
      <Button
        style={styles.buttonFavorites}
        title={isFavorite(item) ? "Remove from Favorites" : "Add to Favorites"}
        color={isFavorite(item) ? "red" : "green"}
        onPress={() => toggleFavorite(item)}
      />
    </TouchableOpacity>
  );

  useEffect(() => {
    navigation.setParams({ favorites }); // Update favorites in navigation params
  }, [favorites]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={markers} renderItem={renderItem} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    fontFamily: "Gill Sans",
  },
  item: {
    backgroundColor: "#9147FF",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    color: "#FFFFFF",
    fontFamily: "Gill Sans",
  },
  bodyText: {
    fontSize: 14,
    color: "#29292E",
    fontFamily: "Gill Sans",
  },
  buttonFavorites: {
    backgroundColor: "#FFFFFF",
  },
});
