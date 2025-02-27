import React from "react";
import { View } from "react-native";
import Header from "@/app/components/auth/Header";
import WalletConnection from "@/app/components/auth/WalletConnection";

const CreateAccount = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Header
        title="CREATE ACCOUNT"
        subtitle="Create an account to test your lyrical prowess"
      />
      <WalletConnection />
    </View>
  );
};

export default CreateAccount;
