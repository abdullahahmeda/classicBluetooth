import React from 'react'
import { Text as RNText } from 'react-native'

export default function Text ({ children, ...props }) {
  return <RNText {...props} style={{ fontFamily: 'ReadexPro-Regular', color: '#000', ...props.style }}>{children}</RNText>
}
