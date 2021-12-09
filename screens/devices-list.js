import React, { useEffect, useState } from 'react'
import RNBluetoothClassic from 'react-native-bluetooth-classic'
import Text from '../components/text'
import { View, FlatList, ToastAndroid } from 'react-native'
import Container from '../components/container'
import Button from '../components/button'
import Layout from '../components/layout'

const DevicesList = ({ navigation }) => {
  const [isBluetoothEnabled, setIsBluetoothEnabled] = useState(null)
  const [devices, setDevices] = useState([])

  useEffect(() => {
    const subscription = RNBluetoothClassic.onStateChanged(handleStateChange)
    RNBluetoothClassic.isBluetoothEnabled()
      .then(isEnabled => {
        setIsBluetoothEnabled(isEnabled)
      })

    return () => {
      subscription.remove()
    }
  }, [])

  const handleStateChange = (event) => {
    if (event.eventType === 'BLUETOOTH_ENABLED') {
      ToastAndroid.show('تم تفعيل البلوتوث بنجاح.', ToastAndroid.LONG)
      return setIsBluetoothEnabled(event.enabled)
    } else if (event.eventType === 'BLUETOOTH_DISABLED') {
      ToastAndroid.show('تم تعطيل البلوتوث.', ToastAndroid.LONG)
      setDevices([])
      return setIsBluetoothEnabled(event.enabled)
    }
    console.log(event)
    ToastAndroid.show('State changed!! check console', ToastAndroid.LONG)
    setIsBluetoothEnabled(event.enabled)
  }

  const requestBluetoothEnable = async () => {
    try {
      await RNBluetoothClassic.requestBluetoothEnabled()
    } catch (error) {
      console.log(error)
      ToastAndroid.show('لم يتم تفعيل البلوتوث. يرجى إعادة المحاولة.', ToastAndroid.LONG)
    }
  }

  const getPairedDevices = async () => {
    let pairedDevices
    try {
      pairedDevices = await RNBluetoothClassic.getBondedDevices()
      console.log('paired devices')
      console.log(pairedDevices)
      setDevices(pairedDevices)
    } catch (error) {
      console.log(error)
    }
  }

  const disconnectFromAllDevices = async () => {
    const connectedDevices = await RNBluetoothClassic.getConnectedDevices()
    for (const device of connectedDevices) {
      await device.disconnect()
    }
  }

  const connectToDevice = async (device) => {
    ToastAndroid.show(`يتم الاتصال بالجهاز ${device.name}. يرجى الانتظار...`, ToastAndroid.LONG)
    try {
      await disconnectFromAllDevices()
      await device.connect()
      ToastAndroid.show(`تم الاتصال بالجهاز ${device.name}.`, ToastAndroid.LONG)
      navigation.navigate('الرئيسية')
    } catch (error) {
      console.log(error)
      ToastAndroid.show(`حدث خطأ أثناء الاتصال بالجهاز ${device.name}.`, ToastAndroid.LONG)
    }
  }

  return (
    <Layout>
      <Container>
        <View style={{ marginTop: 10 }}>
          {isBluetoothEnabled ? <Text style={{ color: '#189b1c' }}>البلوتوث مفعل</Text> : <Text style={{ color: '#ab1515' }}>البلوتوث غير مفعل</Text>}
          {!isBluetoothEnabled && <Button onPress={requestBluetoothEnable}><Text style={{ textAlign: 'center', fontFamily: 'ReadexPro-SemiBold' }}>تفعيل البلوتوث</Text></Button>}
          {isBluetoothEnabled && <Button onPress={getPairedDevices}><Text style={{ textAlign: 'center', fontFamily: 'ReadexPro-SemiBold', color: '#3f3f3f' }}>رؤية الأجهزة المقترنة</Text></Button>}
          {devices.length > 0 && (
            <FlatList
              data={devices}
              style={{ marginTop: 10 }}
              renderItem={({ item }) => <Button key={item.id} onPress={() => connectToDevice(item)} style={{ backgroundColor: '#F6F2D4', marginBottom: 5, elevation: 1 }}><Text style={{ color: '#1f1f1f' }}>{item.name}</Text></Button>}
            />
          )}
        </View>
      </Container>
    </Layout>
  )
}

export default DevicesList
