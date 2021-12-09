import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native'
import RNBluetoothClassic from 'react-native-bluetooth-classic'
import Button from '../components/button'
import Container from '../components/container'
import Text from '../components/text'
import Icon from 'react-native-vector-icons/Ionicons'
import Layout from '../components/layout'

const team = [
  'محمد فياض',
  'أحمد حسن',
  'أحمد مهران',
  'هيثم مجدي',
  'زياد خالد',
  'أحمد السيد',
  'أحمد محمد',
  'عبدالله أحمد'
]

const About = () => {
  return (
    <Layout>
      <Container>
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: '#2f2f2f' }}>هذا التطبيق هو جزء من مشروع لكلية الهندسة - جامعة الاسكندرية.</Text>
          <Text style={{ color: '#2f2f2f' }}>تمت البرمجة باستخدام React Native وبعض المكتبات الأخرى.</Text>
          <Text style={{ textAlign: 'center', color: '#000', fontSize: 18, marginTop: 10 }}><Icon name='trophy' color='#dbda13' size={18} /> الأبطال (فريق العمل) <Icon name='trophy' color='#dbda13' size={18} /></Text>
          <FlatList
            data={team}
            renderItem={({ item }) => <Text style={{ textAlign: 'center', color: '#222' }}>{item}</Text>}
          />
        </View>
      </Container>
    </Layout>
  )
}

export default About
