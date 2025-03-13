import React, { useEffect, useState } from "react";
import { 
  View, 
  FlatList, 
  Alert, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  Image 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header"; 

const LocationsScreen = () => {
  const [locations, setLocations] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const storedData = await AsyncStorage.getItem("locations");
        if (storedData) {
          setLocations(JSON.parse(storedData));
        }
      } catch (error) {
        console.error("Error loading locations:", error);
      }
    };

    const unsubscribe = navigation.addListener("focus", fetchLocations);
    return unsubscribe;
  }, [navigation]);

  const handleLocationPress = (location) => {
    Alert.alert("Navigate", `Go to ${location.title}?`, [
      { text: "Cancel", style: "cancel" },
      { text: "OK", onPress: () => navigation.navigate("Home", { location }) },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Saved Locations" />
      <View style={styles.container}>
        {locations.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Image 
              style={styles.emptyImage}
              resizeMode="contain"
            />
            <Text style={styles.emptyText}>No saved locations.</Text>
          </View>
        ) : (
          <FlatList
            data={locations}
            keyExtractor={(item) => item.time.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.locationText}>{item.locationText}</Text>
                <Text style={styles.time}>{new Date(item.time).toLocaleString()}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleLocationPress(item)}
                >
                  <Text style={styles.buttonText}>View on Map</Text>
                </TouchableOpacity>
              </View>
            )}
            contentContainerStyle={styles.flatListContent}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  flatListContent: {
    paddingBottom: 50, 
  },
  card: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
  time: {
    fontSize: 12,
    color: "#999",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#FFBB1A",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyImage: {
    // width: 200,
    // height: 200,
    // marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});

export default LocationsScreen;
