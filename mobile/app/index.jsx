import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const index = () => {
  return (
    <View>
      <Text>index</Text>
      <Link href="(auth)/">Login Screen</Link>
      <Link href="(auth)/signup">Sign Up Screen</Link>
    </View>
  )
}

export default index