import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Button, StyleSheet } from "react-native";
import { fetchLyrics, fetchMultipleChoiceOptions } from "./ApiServices"; 

export default function Game() {
  const [lyrics, setLyrics] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    loadLyrics();
    loadOptions();
  }, []);

  const loadLyrics = async () => {
    setLoading(true);
    try {
      const response = await fetchLyrics("easy"); 
      if (response?.lyrics) {
        setLyrics(response.lyrics);
      } else {
        console.error("Lyrics data missing:", response);
      }
    } catch (error) {
      console.error("Failed to load lyrics:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadOptions = async () => {
    try {
      const response = await fetchMultipleChoiceOptions();
      if (response?.options && Array.isArray(response.options)) {
        setOptions(response.options);
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Failed to load multiple-choice options:", error);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <>
          <Text style={styles.lyricsText}>{lyrics}</Text>
          {options.length > 0 ? (
            options.map((option, index) => (
              <Button key={index} title={option} onPress={() => console.log(`Selected: ${option}`)} />
            ))
          ) : (
            <Text>No options available</Text>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  lyricsText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
});
