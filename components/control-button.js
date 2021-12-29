import React from 'react'
import { StyleSheet, TouchableHighlight } from 'react-native'

export default function ControlButton ({ children, signal, moveStopSignal, sendSignal, ...props }) {
  let timer = null
  const handlePressIn = () => {
    sendSignal(signal)
    timer = setTimeout(handlePressIn, 10)
  }

  const handlePressOut = () => {
    clearTimeout(timer)
    if (moveStopSignal) sendSignal(moveStopSignal)
  }

  return (
    <TouchableHighlight {...props} onPressIn={handlePressIn} onPressOut={handlePressOut} style={{ ...styles.button, ...props.style }}>
      {children}
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderColor: '#ccc',
    borderWidth: 0.5
  }
})
