import React from 'react'
import { View, StyleSheet } from 'react-native'

export default function Container ({ children, ...props }) {
  return (
    <View {...props} style={{ ...styles.container, ...props.style }}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    direction: 'rtl'
  }
})
