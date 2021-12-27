import React, { useEffect, useState } from 'react'
import { StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native'
import RNBluetoothClassic from 'react-native-bluetooth-classic'
import Button from '../components/button'
import Container from '../components/container'
import Text from '../components/text'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Layout from '../components/layout'

const signals = {
  elbowForward: 'F',
  elbowBackward: 'B',
  shoulderUp: 'U',
  shoulderDown: 'D',
  gripperOpen: 'O',
  gripperClose: 'C',
  moveForward: 'W',
  moveBackward: 'S',
  moveRight: 'G',
  moveLeft: 'A'
}

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
            <View style={{ flex: 1 }}>
              <View style={{ ...styles.row, marginTop: 20, alignItems: 'center' }}>
                <View style={styles.leftControls}>
                  <Text style={{ marginBottom: 5 }}>Elbow</Text>
                  <TouchableOpacity style={[styles.button, { marginBottom: 5 }]} onPress={() => sendSignal(signals.elbowForward)}><MaterialIcon name='keyboard-arrow-up' style={styles.buttonMaterialIcon} size={30} color='#5584AC' /></TouchableOpacity>
                  <TouchableOpacity style={[styles.button, { marginTop: 5 }]} onPress={() => sendSignal(signals.elbowBackward)}><MaterialIcon name='keyboard-arrow-down' style={styles.buttonMaterialIcon} size={30} color='#5584AC' /></TouchableOpacity>
                </View>
                <View style={styles.rightControls}>
                  <Text style={{ marginBottom: 5 }}>Shoulder</Text>
                  <TouchableOpacity style={{ ...styles.button, marginBottom: 5 }} onPress={() => sendSignal(signals.shoulderUp)}><MaterialIcon name='arrow-upward' style={styles.buttonMaterialIcon} size={30} color='#5584AC' /></TouchableOpacity>
                  <TouchableOpacity style={{ ...styles.button, marginTop: 5 }} onPress={() => sendSignal(signals.shoulderDown)}><MaterialIcon name='arrow-downward' style={styles.buttonMaterialIcon} size={30} color='#5584AC' /></TouchableOpacity>
                </View>
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={{ marginBottom: 5, textAlign: 'center' }}>Gripper</Text>
                <View style={[styles.row, { justifyContent: 'center' }]}>
                  <TouchableOpacity style={{ ...styles.button, marginBottom: 5, marginRight: 5 }} onPress={() => sendSignal(signals.gripperOpen)}><MaterialCommunityIcon name='arrow-expand-horizontal' style={styles.buttonMaterialIcon} size={30} color='#5584AC' /></TouchableOpacity>
                  <TouchableOpacity style={{ ...styles.button, marginBottom: 5, marginLeft: 5 }} onPress={() => sendSignal(signals.gripperClose)}><MaterialCommunityIcon name='arrow-collapse-horizontal' style={styles.buttonMaterialIcon} size={30} color='#5584AC' /></TouchableOpacity>
                </View>
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={{ marginBottom: 5, textAlign: 'center' }}>Move</Text>
                <View style={[{ alignItems: 'center' }]}>
                  <TouchableOpacity style={{ ...styles.button, marginBottom: 5, marginRight: 5 }} onPress={() => sendSignal(signals.moveForward)}><MaterialIcon name='keyboard-arrow-up' style={styles.buttonMaterialIcon} size={30} color='#5584AC' /></TouchableOpacity>
                  <View style={[styles.row]}>
                    <TouchableOpacity style={{ ...styles.button, marginBottom: 5, marginRight: 20 }} onPress={() => sendSignal(signals.moveLeft)}><MaterialIcon name='keyboard-arrow-left' style={styles.buttonMaterialIcon} size={30} color='#5584AC' /></TouchableOpacity>
                    <TouchableOpacity style={{ ...styles.button, marginBottom: 5, marginLeft: 20 }} onPress={() => sendSignal(signals.moveRight)}><MaterialIcon name='keyboard-arrow-right' style={styles.buttonMaterialIcon} size={30} color='#5584AC' /></TouchableOpacity>
                  </View>
                  <TouchableOpacity style={{ ...styles.button, marginBottom: 5, marginLeft: 5 }} onPress={() => sendSignal(signals.moveBackward)}><MaterialIcon name='keyboard-arrow-down' style={styles.buttonMaterialIcon} size={30} color='#5584AC' /></TouchableOpacity>
                </View>
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
    flex: 1,
    // marginLeft: 20,
    alignItems: 'center'
  },
  rightControls: {
    flex: 1,
    alignItems: 'center'
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
  buttonMaterialIcon: {
    lineHeight: 40,
    textAlign: 'center'
  }
})

export default Home
