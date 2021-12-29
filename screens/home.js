import React, { useEffect, useState } from 'react'
import { StyleSheet, ToastAndroid, View } from 'react-native'
import RNBluetoothClassic from 'react-native-bluetooth-classic'
import Button from '../components/button'
import Container from '../components/container'
import Text from '../components/text'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Layout from '../components/layout'
import ControlButton from '../components/control-button'

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
  moveLeft: 'A',
  toggleControl: 'T',
  moveStop: 'K'
}

const Home = ({ navigation }) => {
  const [connectedDevice, setConnectedDevice] = useState(null)

  const [controlBluetooth, setControlBluetooth] = useState(false)

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

  const handleToggleControl = () => {
    setControlBluetooth(!controlBluetooth)
    sendSignal(signals.toggleControl)
  }

  return (
    <Layout style={{ flex: 1 }}>
      <Container style={{ flex: 1 }}>
        <View style={{ marginTop: 10, flex: 1 }}>
          <Button onPress={() => navigation.navigate('الأجهزة')}><Text style={{ textAlign: 'center', color: '#3f3f3f', fontFamily: 'ReadexPro-SemiBold' }}>{connectedDevice ? `متصل بـ ${connectedDevice.name}` : 'غير متصل'}</Text></Button>
          {!connectedDevice && <Text style={{ fontFamily: 'ReadexPro-Bold', marginTop: 10, color: '#000' }}>يجب الاتصال بالجهاز أولاً للاستمرار.</Text>}
          {connectedDevice && (
            <View style={{ flex: 1 }}>
              <View style={{ marginTop: 20 }}>
                <Text>التحكم بالبلوتوث: {controlBluetooth ? 'مفعل' : 'غير مفعل'}</Text>
                <Button style={{ marginBottom: 5 }} onPress={handleToggleControl}><Text style={{ textAlign: 'center' }}>تشغيل / إيقاف التحكم بالبلوتوث</Text></Button>
              </View>
              <View style={{ ...styles.row, marginTop: 20, alignItems: 'center' }}>
                <View style={styles.leftControls}>
                  <Text style={{ marginBottom: 5 }}>Elbow</Text>
                  <ControlButton style={{ marginBottom: 5 }} signal={signals.elbowForward} sendSignal={sendSignal}><MaterialIcon name='keyboard-arrow-up' style={styles.buttonMaterialIcon} size={30} color='#5584AC' /></ControlButton>
                  <ControlButton style={{ marginTop: 5 }} signal={signals.elbowBackward} sendSignal={sendSignal}><MaterialIcon name='keyboard-arrow-down' style={styles.buttonMaterialIcon} size={30} color='#5584AC' /></ControlButton>
                </View>
                <View style={styles.rightControls}>
                  <Text style={{ marginBottom: 5 }}>Shoulder</Text>
                  <ControlButton style={{ marginBottom: 5 }} signal={signals.shoulderUp} sendSignal={sendSignal}><MaterialIcon name='arrow-upward' style={styles.buttonMaterialIcon} size={30} color='#5584AC' /></ControlButton>
                  <ControlButton style={{ marginTop: 5 }} signal={signals.shoulderDown} sendSignal={sendSignal}><MaterialIcon name='arrow-downward' style={styles.buttonMaterialIcon} size={30} color='#5584AC' /></ControlButton>
                </View>
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={{ marginBottom: 5, textAlign: 'center' }}>Gripper</Text>
                <View style={[styles.row, { justifyContent: 'center' }]}>
                  <ControlButton style={{ marginBottom: 5, marginRight: 5 }} signal={signals.gripperOpen} sendSignal={sendSignal}><MaterialCommunityIcon name='arrow-expand-horizontal' style={styles.buttonMaterialIcon} size={30} color='#5584AC' /></ControlButton>
                  <ControlButton style={{ marginBottom: 5, marginLeft: 5 }} signal={signals.gripperClose} sendSignal={sendSignal}><MaterialCommunityIcon name='arrow-collapse-horizontal' style={styles.buttonMaterialIcon} size={30} color='#5584AC' /></ControlButton>
                </View>
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={{ marginBottom: 5, textAlign: 'center' }}>Move</Text>
                <View style={[{ alignItems: 'center' }]}>
                  <ControlButton style={{ marginBottom: 5, marginRight: 5 }} signal={signals.moveForward} moveStopSignal={signals.moveStop} sendSignal={sendSignal}><MaterialIcon name='keyboard-arrow-up' style={styles.buttonMaterialIcon} size={30} color='#5584AC' /></ControlButton>
                  <View style={[styles.row]}>
                    <ControlButton style={{ marginBottom: 5, marginRight: 20 }} signal={signals.moveLeft} moveStopSignal={signals.moveStop} sendSignal={sendSignal}><MaterialIcon name='keyboard-arrow-left' style={styles.buttonMaterialIcon} size={30} color='#5584AC' /></ControlButton>
                    <ControlButton style={{ marginBottom: 5, marginLeft: 20 }} signal={signals.moveRight} moveStopSignal={signals.moveStop} sendSignal={sendSignal}><MaterialIcon name='keyboard-arrow-right' style={styles.buttonMaterialIcon} size={30} color='#5584AC' /></ControlButton>
                  </View>
                  <ControlButton style={{ marginBottom: 5, marginLeft: 5 }} signal={signals.moveBackward} moveStopSignal={signals.moveStop} sendSignal={sendSignal}><MaterialIcon name='keyboard-arrow-down' style={styles.buttonMaterialIcon} size={30} color='#5584AC' /></ControlButton>
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
  buttonMaterialIcon: {
    lineHeight: 40,
    textAlign: 'center'
  }
})

export default Home
