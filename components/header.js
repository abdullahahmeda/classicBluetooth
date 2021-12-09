import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Container from './container'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useRoute, useNavigation } from '@react-navigation/core'

export default function Header () {
  const route = useRoute()
  const navigation = useNavigation()
  console.log(route)
  return (
    <View style={styles.header}>
      <Container style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={styles.brand}>{route.name}</Text>
        <TouchableOpacity onPress={() => navigation.openDrawer()}><Icon name='menu' size={30} color='#fff' /></TouchableOpacity>
      </Container>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#22577E',
    paddingVertical: 15,
    elevation: 8
  },
  brand: {
    color: '#fff',
    fontFamily: 'ReadexPro-Medium',
    fontSize: 18
  }
})
