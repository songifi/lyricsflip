import React from "react";
import { View } from "react-native";
import Header from "@/app/components/auth/Header";
import WalletConnection from "@/app/components/auth/WalletConnection";

const Login = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Header
        title="LOGIN"
        subtitle="Login to your account to test your lyrical prowess"
      />
      <WalletConnection />
    </View>
  );
};

export default Login;
