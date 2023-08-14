// import { useEffect, useState } from "react";
// import {
//   SafeAreaView,
//   StyleSheet,
//   Button,
//   TouchableOpacity,
//   Text,
// } from "react-native";

// export default function Settings({ theme, setTheme }) {
//   //variables
//   const [oppositeTheme, setOppositeTheme] = useState();

//   //when theme changes, change the opposite theme for the button
//   useEffect(() => {
//     if (theme == "dark") {
//       setOppositeTheme("light");
//     } else {
//       setOppositeTheme("dark");
//     }
//   }, [theme]);

//   //on button press, switch the theme
//   function toggleSwitch(currentTheme) {
//     if (currentTheme === "dark") {
//       setTheme("light");
//     } else {
//       setTheme("dark");
//     }
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <Button
//         title={`Change theme to ${oppositeTheme}`}
//         onPress={() => toggleSwitch(theme)}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     fontFamily: "Gill Sans",
//   },
//   title: {
//     fontFamily: "Gill Sans",
//   },
// });
import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Button, Text } from "react-native";
import { useTranslation } from "react-i18next"; // Import useTranslation

export default function Settings({ theme, setTheme }) {
  const { t, i18n } = useTranslation(); // Initialize useTranslation

  // Variables
  const [oppositeTheme, setOppositeTheme] = useState();

  // When theme changes, change the opposite theme for the button
  useEffect(() => {
    if (theme === "dark") {
      setOppositeTheme("light");
    } else {
      setOppositeTheme("dark");
    }
  }, [theme]);

  // On button press, switch the theme
  function toggleSwitch(currentTheme) {
    if (currentTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }

  // Function to change the app's language
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title={`Change theme to ${oppositeTheme}`}
        onPress={() => toggleSwitch(theme)}
      />
      <Text style={styles.title}>Select Language:</Text>
      <Button
        title={t("english")}
        onPress={() => changeLanguage("en")}
        disabled={i18n.language === "en"}
      />
      <Button
        title={t("dutch")}
        onPress={() => changeLanguage("nl")}
        disabled={i18n.language === "nl"}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Gill Sans",
  },
  title: {
    marginTop: 20,
  },
});
