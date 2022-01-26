import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const App = () => {
  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  // useEffect(() => {
  //   requsetPermission();
  // }, []);
  const [position, setPosition] = useState({});

  const requsetPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Example App',
          message: 'Example App access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        Geolocation.getCurrentPosition(
          position => {
            console.log('hello');
            console.log(position);
            setPosition(position.coords);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
        // setHasLocationPermission(true);
        // alert('You can use the location');
      } else {
        console.log('location permission denied');
        alert('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getLocation = () => {
    console.log('hello');
    requsetPermission();
    console.log('hellghjno');
    // if (hasLocationPermission) {
    //   Geolocation.getCurrentPosition(
    //     position => {
    //       console.log('hello');
    //       console.log(position);
    //     },
    //     error => {
    //       // See error code charts below.
    //       console.log(error.code, error.message);
    //     },
    //     {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    //   );
    // }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>GeoLoaction</Text>
      <View
        style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
        <Button title="Get Location" onPress={getLocation} />
      </View>
      <Text style={styles.text}>Latitude:{position.latitude} </Text>
      <Text style={styles.text}> Longitude:{position.longitude} </Text>
      {/* <View
        style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
        <Button title="Send Location" />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default App;
