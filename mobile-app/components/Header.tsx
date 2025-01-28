import icons from "@/constants/icons";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const Header = () => {
  return (
    <View style={styles.header}>
      <View>
        <Image source={icons.Logo} style={styles.logo} resizeMode="contain" />
      </View>
      <TouchableOpacity>
        <Image source={icons.menu} style={styles.menu} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    padding: 20,
    position: "absolute",
    top: 25,
    left: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
  },
  menu: {
    width: 40,
    height: 40,
  },
});

export default Header;
