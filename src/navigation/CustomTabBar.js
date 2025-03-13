import React, { useRef } from 'react';
import { Animated, View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import HomeIcon from '../assets/svg/HomeIcon';
import LocationIcon from '../assets/svg/LocationIcon';
import ProfileIcon from '../assets/svg/ProfileIcon';

const CustomTabBar = ({ state, descriptors, navigation }) => {
    const tabOffsetValue = useRef(new Animated.Value(0)).current;

    return (
        <View style={styles.container}>
            <View style={styles.tabContainer}>
                {state.routes.map((route, index) => {
                    const isFocused = state.index === index;

                    const getIcon = (routeName) => {
                        switch (routeName) {
                            case 'Home':
                                return <HomeIcon width={24} height={24} fill={isFocused ? '#FFBB1A' : 'gray'} />;
                            case 'Location':
                                return <LocationIcon width={24} height={24} fill={isFocused ? '#FFBB1A' : 'gray'} />;
                            case 'Profile':
                                return <ProfileIcon width={24} height={24} fill={isFocused ? '#FFBB1A' : 'gray'} />;
                            default:
                                return null;
                        }
                    };

                    return (
                        <TouchableWithoutFeedback
                            key={route.key}
                            onPress={() => {
                                navigation.navigate(route.name);
                                Animated.spring(tabOffsetValue, {
                                    toValue: index * (100 / state.routes.length),
                                    useNativeDriver: true,
                                }).start();
                            }}
                        >
                            <View style={styles.tabItem}>
                                <View style={isFocused ? styles.focusedTabContent : styles.tabContent}>
                                    {getIcon(route.name)}
                                    <Text style={isFocused ? styles.focusedTabLabel : styles.tabLabel}>
                                        {route.name}
                                    </Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 10,
        left: 30,
        right: 30,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#FFF',
        borderRadius: 35,
        elevation: 5,
        paddingVertical: 10,
        width: '100%',
    },
    tabItem: {
        alignItems: 'center',
        flex: 1,
    },
    tabLabel: {
        color: 'gray',
        fontSize: 12,
    },
    focusedTabLabel: {
        color: '#FFBB1A',
        fontSize: 12,
        fontWeight: '800',
    },
    tabContent: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 60,
        paddingVertical: 5,
    },
    focusedTabContent: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 40,
        paddingVertical: 5,
        borderRadius: 10,
    },
});

export default CustomTabBar;
