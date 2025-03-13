import React, { useState, useEffect } from "react";
import { View, Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import SaveLocationModal from "../layout/SaveLocationModal";
import Header from "../components/Header"; 

const MapScreen = () => {
    const route = useRoute();
    const selectedLocationFromList = route.params?.location || null;

    const [region, setRegion] = useState({
        latitude: 10.6677032,
        longitude: 75.988872,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    const [selectedLocation, setSelectedLocation] = useState(null);
    const [title, setTitle] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [savedLocations, setSavedLocations] = useState([]);

    // Load saved locations from AsyncStorage
    useEffect(() => {
        const loadLocations = async () => {
            try {
                const storedData = await AsyncStorage.getItem("locations");
                if (storedData) {
                    setSavedLocations(JSON.parse(storedData));
                }
            } catch (error) {
                console.error("Error loading locations:", error);
            }
        };
        loadLocations();
    }, []);

    useEffect(() => {
        if (selectedLocationFromList) {
            setRegion({
                latitude: selectedLocationFromList.latitude,
                longitude: selectedLocationFromList.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
            setSelectedLocation(selectedLocationFromList);
            setTitle(selectedLocationFromList.title || "Saved Location");
            setModalVisible(true);
        }
    }, [selectedLocationFromList]);

    const handleMapPress = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setSelectedLocation({ latitude, longitude });
        setTitle(""); 
        setModalVisible(true);
    };

    const handleMarkerPress = (location) => {
        setSelectedLocation(location);
        setTitle(location.title || "Saved Location");
        setModalVisible(true);
    };

    const saveLocation = async () => {
        if (!title.trim()) {
            Alert.alert("Error", "Please enter a title");
            return;
        }

        const newLocation = {
            title,
            ...selectedLocation,
            time: new Date().toISOString(),
        };

        try {
            const updatedLocations = [...savedLocations, newLocation];
            await AsyncStorage.setItem("locations", JSON.stringify(updatedLocations));
            setSavedLocations(updatedLocations);
            setModalVisible(false);
            Alert.alert("Success", "Location saved!");
        } catch (error) {
            console.error("Error saving location:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Header title="Map" />
            <MapView style={styles.map} region={region} onPress={handleMapPress}>
                {savedLocations.map((location, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }}
                        title={location.title}
                        onPress={() => handleMarkerPress(location)}
                    />
                ))}

                {selectedLocation && !savedLocations.some(loc => loc.latitude === selectedLocation.latitude && loc.longitude === selectedLocation.longitude) && (
                    <Marker
                        coordinate={selectedLocation}
                        title={title || "Selected Location"}
                        onPress={() => handleMarkerPress(selectedLocation)}
                    />
                )}
            </MapView>

            <SaveLocationModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                title={title}
                setTitle={setTitle}
                selectedLocation={selectedLocation}
                onSave={saveLocation}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },
    map: {
        flex: 1,
    },
});

export default MapScreen;
