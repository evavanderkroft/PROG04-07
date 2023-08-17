// import React, { useEffect, useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   FlatList,
//   SafeAreaView,
//   StatusBar,
//   TouchableOpacity,
//   View,
// } from "react-native";

// export default function Favorites(props) {
//   const favoritesArray =
//     props.route.params && props.route.params.favorites
// ? props.route.params.favorites
//       : [];
//   const [favorites, setFavorites] = useState(favoritesArray);

//   useEffect(() => {
//     console.log(favorites);
//   }, [favorites]);

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Favorite Markers</Text>
//       {favorites.length > 0 ? (
//         <FlatList
//           data={favorites}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               onPress={() =>
//                 props.navigation.navigate("Map", { currentMarker: item })
//               }
//             >
//               <View style={styles.item}>
//                 <Text style={styles.itemText}>{item.title}</Text>
//               </View>
//             </TouchableOpacity>
//           )}
//         />
//       ) : (
//         <Text style={styles.title}>No favs</Text>
//       )}
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
//     fontFamily: "Gill Sans",
//   },
//   bodyText: {
//     fontSize: 14,
//     color: "#29292E",
//     fontFamily: "Gill Sans",
//   },
// });

// import React, { useEffect, useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   FlatList,
//   SafeAreaView,
//   StatusBar,
//   TouchableOpacity,
//   View,
// } from "react-native";

// export default function Favorites(props) {
//   const favoritesArray = props.route.params?.favorites || [];
//   const [favorites, setFavorites] = useState(favoritesArray);

//   useEffect(() => {
//     console.log(favorites);
//   }, [favorites]);

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Favorite Markers</Text>
//       {favorites.length > 0 ? (
//         <FlatList
//           data={favorites}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               onPress={() =>
//                 props.navigation.navigate("Map", { currentMarker: item })
//               }
//             >
//               <View style={styles.item}>
//                 <Text style={styles.itemText}>{item.title}</Text>
//               </View>
//             </TouchableOpacity>
//           )}
//         />
//       ) : (
//         <Text style={styles.title}>No favs</Text>
//       )}
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
//     fontFamily: "Gill Sans",
//   },
//   bodyText: {
//     fontSize: 14,
//     color: "#29292E",
//     fontFamily: "Gill Sans",
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
  View,
} from "react-native";

export default function Favorites(props) {
  const favoritesArray = props.route.params?.favorites || [];
  const [favorites, setFavorites] = useState(favoritesArray);
  const [hasFavorites, setHasFavorites] = useState(favorites.length > 0);

  useEffect(() => {
    const focusListener = props.navigation.addListener("focus", () => {
      // Update favorites when the screen receives focus
      if (props.route.params && props.route.params.favorites) {
        setFavorites(props.route.params.favorites);
        setHasFavorites(props.route.params.favorites.length > 0);
      } else {
        console.log("empty");
      }
    });

    return () => {
      focusListener(); // Clean up the focus listener when the component unmounts
    };
  }, [props.navigation, props.route.params]);

  // const handleRemoveFavorite = (item) => {
  //   const updatedFavorites = favorites.filter(
  //     (fav) => fav.title !== item.title
  //   );
  //   setFavorites(updatedFavorites);
  //   setHasFavorites(updatedFavorites.length > 0);
  // };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Favorite Markers</Text>
      {hasFavorites ? (
        <FlatList
          data={favorites}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("Map", { currentMarker: item })
              }
            >
              <View style={styles.item}>
                <Text style={styles.itemText}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.NoFavsText}>No favs</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    margin: 20,
    // alignContent: "center",
    // alignItems: "center",
    fontFamily: "Gill Sans",
  },
  item: {
    backgroundColor: "#9147FF",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 32,
    fontFamily: "Gill Sans",
    alignSelf: "center",
    margin: 10,
  },
  itemText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontFamily: "Gill Sans",
  },
  removeButton: {
    color: "red",
  },

  NoFavsText: {
    fontSize: 24,
    fontFamily: "Gill Sans",
  },
});
