import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

export default function Button ({ children, ...props }) {
  return (
    <TouchableOpacity {...props} style={{ ...styles.button, ...props.style }}>
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#95D1CC',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 4,
    elevation: 4
  }
})
