import { Fonts } from "@/constants/Fonts";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Button from "../form/Button";
const argent = require("@/assets/images/argent.png");
const okx = require("@/assets/images/okx.png");
const brave = require("@/assets/images/brave.png");

const WalletConnection = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Create Account with your preferred wallet
      </Text>

      <TouchableOpacity style={styles.walletButton}>
        <Image source={argent} style={styles.walletIcon} />
        <Text style={styles.walletText}>Continue with Argent</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.walletButton}>
        <Image source={okx} style={styles.walletIcon} />
        <Text style={styles.walletText}>Continue with OKX</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.walletButton}>
        <Image source={brave} style={styles.walletIcon} />
        <Text style={styles.walletText}>Continue with Braavos</Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.dividerLine} />
      </View>

      <Button title={"Connect Wallet"} onPress={() => null} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 20,
  },
  heading: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 20,
    fontFamily: Fonts.Inter,
  },
  walletButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F8F9",
    borderRadius: 50,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#DBE1E7",
    justifyContent: "center",
  },
  walletIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  walletText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1A1A1A",
    fontFamily: Fonts.Inter,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  dividerText: {
    paddingHorizontal: 12,
    color: "#9E9E9E",
    fontSize: 14,
    fontFamily: Fonts.Inter,
  },
});

export default WalletConnection;
