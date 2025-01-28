import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  StatusBar,
} from "react-native";
import Header from "@/components/Header";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import icons from "@/constants/icons";

const Hero = () => {
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.container}>
        <ImageBackground
          source={icons.bg}
          style={styles.background}
          imageStyle={{
            alignSelf: "flex-start",
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
          }}
          resizeMode="cover"
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            <Header />
            <View style={styles.content}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>
                  <Text style={styles.textSpace}>Sing</Text>
                </Text>
                <FontAwesome name="music" style={styles.textIcon} />

                <Text style={styles.title}>
                  <Text style={styles.textSpace}>Guess</Text>
                </Text>
                <FontAwesome name="music" style={styles.textIcon} />

                <Text style={styles.title}>
                  <Text style={styles.textSpace}>Earn</Text>
                </Text>
              </View>

              <View style={{ position: "relative" }}>
                <View style={styles.mainContentContainer}>
                  {/* Background Icon */}
                  <View style={styles.backgroundIconContainer}>
                    <FontAwesome
                      name="music"
                      size={300}
                      color="#70E3C7"
                      style={{ opacity: 0.3 }}
                    />
                  </View>

                  {/* Centered Text */}
                  <View style={styles.centeredTextContainer}>
                    <Text style={styles.subtext}>
                      Test your lyrical knowledge, flip the cards, and guess the
                      song! Discover your favorite genres, wager tokens, and
                      compete for the top spot. Let the music challenge begin!
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: "100%",
  },
  scrollContent: {
    flexGrow: 1,
    minHeight: "100%",
  },
  content: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    display: "flex",
    marginTop: 250,
    // gap: 10,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 46,
    fontWeight: "700",
    letterSpacing: -0.5,
    color: "#3d0664",
    textAlign: "center",
  },
  textIcon: {
    fontSize: 30,
    color: "#490878",
    marginHorizontal: 8,
  },
  textSpace: {
    paddingHorizontal: 8,
  },
  mainContentContainer: {
    flex: 1,
    position: "relative",
    // justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 300,
    marginTop: 50,
  },
  backgroundIconContainer: {
    position: "absolute",
    // justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  centeredTextContainer: {
    position: "absolute",
    width: "100%",
    padding: 20,
    zIndex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  subtext: {
    color: "#fff",
    fontSize: 24,
    letterSpacing: 1,
    fontWeight: "700",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

export default Hero;
