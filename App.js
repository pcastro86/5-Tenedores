import React from 'react';
import Navigation from './app/navigation/Navigation';
import { StyleSheet, Text, View } from 'react-native';
import { firebaseApp } from "./app/utils/FireBase";


export default function App() {
  return (
    <Navigation />
  );
}

