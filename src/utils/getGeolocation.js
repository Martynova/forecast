import Geolocation from 'react-native-geolocation-service';

const getGeolocation = () => {
    
    return new Promise((resolve, reject) => 
        Geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 })
    )

}

export default getGeolocation;