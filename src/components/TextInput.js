import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput as TextInputRN, TouchableOpacity } from 'react-native';
import Constants from '../config/Constants';
import EyeClosedIcon from '../assets/svg/EyeCloseIcon';
import EyeOpenIcon from '../assets/svg/EyeOpenIcon';
import TickMarkIcon from '../assets/svg/TickMarkIcon';

const TextInput = (props) => {
    const { title = '', disabled = false, value, customStyle = {}, type = '', requiredError = '', customLabelStyle = {}, isValid = false } = props;
    const [showPassword, setShowPassword] = useState(type !== 'password');

    return (
        <View style={{ width: '100%', marginBottom: Constants.getHeight(1.67) }}>
            {title ? <Text style={[styles.InputLabel, customLabelStyle]}>{title}</Text> : null}

            {disabled ? (
                <View style={[styles.disabledInput, customStyle]}>
                    <Text style={styles.disabledText}>{value}</Text>
                    {isValid && <View style={styles.iconContainer}><TickMarkIcon /></View>}
                </View>
            ) : (
                <View style={styles.inputContainer}>
                    <TextInputRN
                        placeholderTextColor="rgba(0, 0, 0, 0.5)"
                        autoCapitalize="none"
                        style={[
                            styles.InputBox,
                            customStyle,
                            (isValid || type === 'password') && { paddingEnd: 45 },
                        ]}
                        secureTextEntry={!showPassword}
                        {...props}
                    />
                    {isValid && <View style={styles.iconContainer}><TickMarkIcon /></View>}
                    {type === 'password' && (
                        <TouchableOpacity
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            style={styles.iconContainer}
                            onPress={() => setShowPassword(prev => !prev)}
                        >
                            {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                        </TouchableOpacity>
                    )}
                </View>
            )}

            {requiredError && <Text style={styles.errorStyle}>{requiredError}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    InputLabel: {
        fontSize: 14,
        color: "black",
        fontWeight: '400',
        marginBottom: 10,
    },
    InputBox: {
        height: 56,
        paddingHorizontal: 20,
        fontWeight: '400',
        fontSize: 15,
        width: '100%',
        borderRadius: 10,
        borderWidth: 0.6,
        borderColor: 'rgba(142, 131, 131, 0.3)',
        color: "black",
    },
    errorStyle: {
        marginTop: 5,
        color: 'red',
        fontSize: Constants.getWidth(3.33),
        textAlign: 'left',
        width: '100%',
    },
    disabledInput: {
        height: 56,
        fontSize: 15,
        width: '100%',
        borderRadius: 10,
        borderWidth: 0.6,
        borderColor: 'rgba(142, 131, 131, 0.3)',
        justifyContent: 'center',
        paddingLeft: 20,
    },
    disabledText: {
        padding: Constants.getHeight(2),
        paddingLeft: 20,
        color: 'rgba(0, 0, 0, 0.5)',
    },
    inputContainer: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    iconContainer: {
        position: 'absolute',
        right: 20,
        zIndex: 1,
    },
});

export default TextInput;
