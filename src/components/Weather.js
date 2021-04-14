import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, SafeAreaView, ScrollView, FlatList, Alert, RefreshControl } from 'react-native';

import CardWeather from './CardWeather';
import { isSameDay, format,lightFormat } from "date-fns";




const Weather = (props) => {
    const { forecast: { name, list, timezone } } = props;

    if (props && !props.forecast) {
        return <SafeAreaView style={styles.loading}>
            <ActivityIndicator size="large" />
        </SafeAreaView>;
    }

    const currentWeather = list.filter((day) => {
        const now = new Date().getTime() + Math.abs(timezone * 1000);
        const dateToCheck = new Date(day.dt * 1000)
        
        return isSameDay(now, dateToCheck);
    });

    const daysByHour = list.map((day) => {
        const dt = new Date(day.dt * 1000);
        return {
            date: dt,
            hour: dt.getHours(),
            name: format(dt, "EEEE"),
            temp: Math.round(day.main.temp),
            hum: Math.round(day.main.humidity),
            icon: day.weather[0].icon
        };
    });

    const dayFiltered = daysByHour.filter((day) => {
        const hours = [0, 6, 12];

        return hours.includes(day.hour) && day;
    })

    return ( 
        <View style={{ flex: 1 }}>
        <Text style={styles.title}>Current Weather: {name} </Text>
        <View style={styles.current}>
            <Image
            style={styles.largeIcon}
            source={{
                uri: `https://openweathermap.org/img/w/${currentWeather[0].weather[0].icon}.png`,
            }}
            /> 
            <Text style={styles.currentTemp}>{Math.round(currentWeather[0].main.temp)}°C</Text>
        </View>
        <View style={styles.currentContainer}>
            <Text>Min: {Math.round(currentWeather[0].main.temp_min)}°C /</Text>
            <Text>Max: {Math.round(currentWeather[0].main.temp_max)}°C</Text>    
        </View>
        <View style={styles.currentContainer}>
            <Text>{lightFormat(new Date(currentWeather[0].dt*1000), 'yyyy/MM/dd hh:mm')}</Text>
        </View>
        <Text style={styles.subtitle}>Next 5 Days</Text>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {dayFiltered.map((day, index) => (
                <View key={index} style={{height: 200, width: 75, justifyContent: 'center', alignItems: 'center'}}>
                    <CardWeather day={day} key={index}/>
                </View>
            ))}
        </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        width: '100%',
        textAlign: 'center',
        fontSize: 25,
        color: '#5076e9',
    },
    subtitle: {
        fontSize: 22,
        marginVertical: 18,
        marginLeft: 20,
        color: '#5076e9',
    },
    loading: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    current: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
    },
    currentTemp: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    currentContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    largeIcon: {
        width: 250,
        height: 200,
    },
    });


export default Weather