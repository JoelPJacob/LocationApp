// SaveLocationModal.js
import React from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const SaveLocationModal = ({ visible, onClose, title, setTitle, selectedLocation, onSave }) => {
    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Save Location</Text>
                    <TextInput
                        value={title}
                        onChangeText={setTitle}
                        placeholder="Enter title..."
                        style={styles.input}
                    />
                    <Text style={styles.locationText}>Latitude: {selectedLocation?.latitude.toFixed(6)}</Text>
                    <Text style={styles.locationText}>Longitude: {selectedLocation?.longitude.toFixed(6)}</Text>
                    <TouchableOpacity style={styles.saveButton} onPress={onSave}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: "90%",
        backgroundColor: "#FFF",
        padding: 20,
        borderRadius: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 15,
        color: "#333",
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#CCC",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        textAlign: "center",
        backgroundColor: "#FFF",
    },
    locationText: {
        fontSize: 16,
        color: "#666",
        marginBottom: 10,
    },
    saveButton: {
        width: "100%",
        backgroundColor: "#FFBB1A",
        padding: 14,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 10,
    },
    cancelButton: {
        width: "100%",
        backgroundColor: "#E74C3C",
        padding: 14,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default SaveLocationModal;