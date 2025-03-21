import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

const _Layout = () => {
  return (
    <Tabs>
    <Tabs.Screen name="index" options={{ title: 'Home', headerShown: false }} />


    <Tabs.Screen name="search" options={{ title: 'Search', headerShown: false }} />
    <Tabs.Screen name="save" options={{ title: 'Save', headerShown: false }} />
    <Tabs.Screen name="profile" options={{ title: 'Profile', headerShown: false }} />

    </Tabs>
  )
}

export default _Layout

const styles = StyleSheet.create({})