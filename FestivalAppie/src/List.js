import {
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";

export default function Home({ markers, navigation }) {
  //rendering the flatlist. On press, go to map with that marker.
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Map", { currentMarker: item })}
      style={styles.item}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.bodyText}>{item.description}</Text>
    </TouchableOpacity>
  );

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
});
