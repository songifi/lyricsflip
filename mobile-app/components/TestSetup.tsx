import { View, Text, Button } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useAppStore } from "../store/store";

// Simple test API call
const fetchTest = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  return response.json();
};

export default function TestSetup() {
  // Test Zustand
  const { counter, increment, decrement } = useAppStore();

  // Test React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["test"],
    queryFn: fetchTest,
  });

  return (
    <View style={{ padding: 20 }}>
      <Text>Zustand Test:</Text>
      <Text>Counter: {counter}</Text>
      <Button title="Increment" onPress={increment} />
      <Button title="Decrement" onPress={decrement} />

      <Text style={{ marginTop: 20 }}>React Query Test:</Text>
      {isLoading && <Text>Loading...</Text>}
      {error && <Text>Error: {(error as Error).message}</Text>}
      {data && <Text>Data received: {JSON.stringify(data)}</Text>}
    </View>
  );
}
