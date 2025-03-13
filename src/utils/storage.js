import AsyncStorage from "@react-native-async-storage/async-storage";

// Save a location to local storage
export const saveLocation = async (location) => {
  try {
    const storedData = await AsyncStorage.getItem("locations");
    const locations = storedData ? JSON.parse(storedData) : [];
    locations.push(location);
    await AsyncStorage.setItem("locations", JSON.stringify(locations));
  } catch (error) {
    console.error("Error saving location:", error);
  }
};

// Retrieve saved locations
export const getLocations = async () => {
  try {
    const storedData = await AsyncStorage.getItem("locations");
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error("Error retrieving locations:", error);
    return [];
  }
};
