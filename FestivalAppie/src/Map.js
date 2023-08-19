// Importeer de nodige componenten van React en React Native
import React, { useEffect } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

// Definieer de Map-component die verantwoordelijk is voor het weergeven van een kaart en markers
export default function Map({ location, markers, route }) {
  // Maak een referentie voor MapView
  const mapView = React.createRef();

  // Zet een effect op om de kaartregio te wijzigen op basis van locatie of huidige marker
  useEffect(() => {
    // Log routeparameters of afwezigheid van parameters
    if (route.params) {
      console.log(route.params);
    } else {
      console.log("geen parameters");
    }

    // Wijzig de kaartregio op basis van huidige marker of locatie
    if (route.params?.currentMarker) {
      changeRegion(route.params?.currentMarker);
    } else if (location && location.coords) {
      changeRegion(location);
    }
  }, [route.params?.currentMarker, location]);

  // Functie om de kaart naar een specifieke regio te animeren
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
    // Render de lay-out van de Map-component
    <View style={styles.container}>
      {/* Toon MapView met initiële regio en diverse kaartfuncties */}
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
        {/* Toon markers op de kaart */}
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

// Definieer stijlen voor de componenten
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
