// Import necessary components from React and React Native
import React, { useEffect } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

// Define the Map component responsible for displaying a map and markers
export default function Map({ location, markers, route }) {
  // Create a reference for the MapView
  const mapView = React.createRef();

  // Set up an effect to handle changing the map region based on location or currentMarker
  useEffect(() => {
    // Log route parameters or absence of parameters
    if (route.params) {
      console.log(route.params);
    } else {
      console.log("no params");
    }

    // Change the map region based on currentMarker or location
    if (route.params?.currentMarker) {
      changeRegion(route.params?.currentMarker);
    } else if (location && location.coords) {
      changeRegion(location);
    }
  }, [route.params?.currentMarker, location]);

  // Function to animate the map to a specific region
  function changeRegion(loc) {
    if (loc && loc.coords) {
      mapView.current.animateToRegion(
        {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        1000
      );
    }
  }

  return (
    // Render the Map component layout
    <View style={styles.container}>
      {/* Display the MapView with initial region and various map features */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.3922,
          longitudeDelta: 0.0421,
        }}
        ref={mapView}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        showsTraffic={true}
      >
        {/* Render markers on the map */}
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coords}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
    </View>
  );
}

// Define styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
