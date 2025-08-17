import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import * as Speech from "expo-speech";

const CONSONANTS = [
  { symbol: "ㄱ", sound: "g" },
  { symbol: "ㄴ", sound: "n" },
  { symbol: "ㄷ", sound: "d" },
  { symbol: "ㄹ", sound: "r/l" },
];

const VOWELS = [
  { symbol: "ㅏ", sound: "a" },
  { symbol: "ㅑ", sound: "ya" },
  { symbol: "ㅓ", sound: "eo" },
  { symbol: "ㅕ", sound: "yeo" },
];

const PHRASES = [
  { ko: "안녕하세요", en: "Hello" },
  { ko: "감사합니다", en: "Thank you" },
  { ko: "사랑해요", en: "I love you" },
];

export default function App() {
  const [screen, setScreen] = useState<"menu" | "hangul" | "phrases">("menu");

  const speak = (text: string) => {
    Speech.speak(text, { language: "ko-KR" });
  };

  const renderList = (data: any[]) => (
    <FlatList
      data={data}
      keyExtractor={(_, i) => i.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => speak(item.symbol || item.ko)}
        >
          <Text style={styles.bigText}>{item.symbol || item.ko}</Text>
          <Text>{item.sound || item.en}</Text>
        </TouchableOpacity>
      )}
    />
  );

  if (screen === "menu") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>🇰🇷 Learn Korean</Text>
        <TouchableOpacity style={styles.button} onPress={() => setScreen("hangul")}>
          <Text style={styles.buttonText}>Learn Hangul</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setScreen("phrases")}>
          <Text style={styles.buttonText}>Core Phrases</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (screen === "hangul") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Hangul Primer</Text>
        {renderList([...CONSONANTS, ...VOWELS])}
        <TouchableOpacity style={styles.button} onPress={() => setScreen("menu")}>
          <Text style={styles.buttonText}>⬅ Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (screen === "phrases") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Useful Phrases</Text>
        {renderList(PHRASES)}
        <TouchableOpacity style={styles.button} onPress={() => setScreen("menu")}>
          <Text style={styles.buttonText}>⬅ Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  card: { padding: 15, marginVertical: 5, borderWidth: 1, borderRadius: 10, width: 200, alignItems: "center" },
  bigText: { fontSize: 30 },
  button: { marginTop: 20, padding: 15, backgroundColor: "#007AFF", borderRadius: 10 },
  buttonText: { color: "white", fontSize: 18 },
});
