import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import Weather from './src/components/Weather';

import useWeatherForecast from './src/utils/useWeatherForecast';

const App = () => {

  const weather = useWeatherForecast();

  return (
    <SafeAreaView >
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        {!weather ? 
            <ActivityIndicator size="large" /> : <Weather forecast={weather} />}
      </ScrollView>
    </SafeAreaView>
  );
};


export default App;
