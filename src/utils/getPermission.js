import { check, RESULTS, request } from 'react-native-permissions';
import { PERMISSIONS } from 'react-native-permissions';

const getPermission = async () => {

    let locationPermission = await check(PERMISSIONS.IOS.LOCATION_ALWAYS);

    if (locationPermission !== RESULTS.GRANTED) {
        const permissionRequest = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
        if(permissionRequest === RESULTS.GRANTED) {
            console.log('Permission granted')
        } else {
            console.log('Permission didn\'t grant')
        }
    }

    return locationPermission;   
}

export default getPermission;