import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Button, Text } from "react-native";
// import { useTranslation } from "react-i18next"; // Import useTranslation

export default function Settings({ theme, setTheme }) {
  // const { t, i18n } = useTranslation(); // Initialize useTranslation

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

  // // Function to change the app's language
  // const changeLanguage = (language) => {
  //   i18n.changeLanguage(language);
  // };

  const textColor = theme === "dark" ? styles.lightText : styles.darkText;

  // return (
  //   <SafeAreaView style={styles.container}>
  //     <Button
  //       title={`Change theme to ${oppositeTheme}`}
  //       onPress={() => toggleSwitch(theme)}
  //     />
  //     {/* <Text style={styles.title}>Select Language:</Text>
  //     <Button
  //       title={t("english")}
  //       onPress={() => changeLanguage("en")}
  //       disabled={i18n.language === "en"}
  //     />
  //     <Button
  //       title={t("dutch")}
  //       onPress={() => changeLanguage("nl")}
  //       disabled={i18n.language === "nl"}
  //     /> */}
  //   </SafeAreaView>
  // );
  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.title, textColor]}>Settings</Text>
      <Button
        title={`Change theme to ${oppositeTheme}`}
        onPress={() => toggleSwitch(theme)}
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
  darkText: {
    color: "black", // Define your dark theme text color here
  },
  lightText: {
    color: "#9147FF", // Define your light theme text color here
  },
});
