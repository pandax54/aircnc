import React from 'react';
import Routes from './src/routes';
import { YellowBox } from 'react-native';

// aula 05 45:00
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
])

export default function App() {
  return (
    <Routes />
  );
}  