import React, { useEffect, useState } from 'react'
import { StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native'
import RNBluetoothClassic from 'react-native-bluetooth-classic'
import Button from '../components/button'
import Container from '../components/container'
import Text from '../components/text'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Layout from '../components/layout'

const Home = ({ navigation }) => {
  const [connectedDevice, setConnectedDevice] = useState(null)

  useEffect(() => {
    const subscription = RNBluetoothClassic.onDeviceDisconnected(handleStateChange)
    const unsubscribe = navigation.addListener('focus', () => {
      RNBluetoothClassic.getConnectedDevices()
        .then(devices => {
          setConnectedDevice(devices[0])
        })
        .catch(_ => null)
    })

    return () => {
      unsubscribe()
      subscription.remove()
    }
  }, [navigation])

  const handleStateChange = (event) => {
    console.log('Home: Device disconnected')
    console.log(event)
    setConnectedDevice(null)
    ToastAndroid.show(`تم فقد الاتصال بالجهاز  ${event.name}.`, ToastAndroid.LONG)
  }

  const sendSignal = async (signal) => {
    console.log(`Sending signal: ${signal}`)
    try {
      await connectedDevice.write(signal)
    } catch (error) {
      console.log('error while sending signal')
      console.log(error)
    }
  }

  return (
    <Layout style={{ flex: 1 }}>
      <Container style={{ flex: 1 }}>
        <View style={{ marginTop: 10, flex: 1 }}>
          <Button onPress={() => navigation.navigate('الأجهزة')}><Text style={{ textAlign: 'center', color: '#3f3f3f', fontFamily: 'ReadexPro-SemiBold' }}>{connectedDevice ? connectedDevice.name : 'غير متصل'}</Text></Button>
          {!connectedDevice && <Text style={{ fontFamily: 'ReadexPro-Bold', marginTop: 10, color: '#000' }}>يجب الاتصال بالجهاز أولاً للاستمرار.</Text>}
          {connectedDevice && (
            <View style={{ ...styles.row, marginTop: 20, alignItems: 'center' }}>
              <View style={styles.leftControls}>
                <TouchableOpacity style={styles.button} onPress={() => sendSignal('UP')}><Icon name='keyboard-arrow-up' style={styles.buttonIcon} size={30} color='#5584AC' /></TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity style={{ ...styles.button, marginRight: 15 }} onPress={() => sendSignal('LEFT')}><Icon name='keyboard-arrow-left' style={styles.buttonIcon} size={30} color='#5584AC' /></TouchableOpacity>
                  <TouchableOpacity style={{ ...styles.button, marginLeft: 15 }} onPress={() => sendSignal('RIGHT')}><Icon name='keyboard-arrow-right' style={styles.buttonIcon} size={30} color='#5584AC' /></TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => sendSignal('DOWN')}><Icon name='keyboard-arrow-down' style={styles.buttonIcon} size={30} color='#5584AC' /></TouchableOpacity>
              </View>
              <View style={styles.rightControls}>
                <TouchableOpacity style={{ ...styles.button, marginBottom: 5 }} onPress={() => sendSignal('TOP')}><Icon name='arrow-upward' style={styles.buttonIcon} size={30} color='#5584AC' /></TouchableOpacity>
                <TouchableOpacity style={{ ...styles.button, marginTop: 5 }} onPress={() => sendSignal('BOTTOM')}><Icon name='arrow-downward' style={styles.buttonIcon} size={30} color='#5584AC' /></TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </Container>
    </Layout>
  )
}

const styles = StyleSheet.create({
  leftControls: {
    flex: 2,
    marginLeft: 20,
    alignItems: 'center'
  },
  rightControls: {
    flex: 1
  },
  row: {
    // flex: 1,
    flexDirection: 'row'
  },
  button: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderColor: '#ccc',
    borderWidth: 0.5
  },
  buttonIcon: {
    lineHeight: 40,
    textAlign: 'center'
  }
})

export default Home
