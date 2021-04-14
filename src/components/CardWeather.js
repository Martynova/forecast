import React from 'react';
import { View, Text,  Image, StyleSheet } from 'react-native'

const CardWeather = ({ day }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.dayName}>{day.name.substring(0, 3)}</Text>
      <Image style={styles.smallIcon}
        source={{
          uri: `https://openweathermap.org/img/w/${day.icon}.png`,
        }}
      />
      <Text style={styles.day}>{day.temp}°C</Text>
      <Text style={styles.day}>{day.hum}%</Text>
      <Text style={styles.day}>{day.hour}h</Text>
    </View>
  )

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  dayName: {
    fontSize: 16,
    marginVertical: 12,
    marginLeft: 4,
    color: '#5076e9',
  },

  day: {
    padding: 6,
    alignItems: 'center',
  },
  smallIcon: {
    width: 50,
    height: 50,
  }
});



export default CardWeather;