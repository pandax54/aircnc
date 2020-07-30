## example of component

```=javascript
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Routes from './src/routes';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```


## Add the routes
https://reactnavigation.org/
```
yarn add react-navigation

expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view

yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
```

## criação de components
// aula 04 1:03:00
folder -> components

propriedades de um componente: aula 04 1:04:00

## IMAGES NOT SHOWING
https://stackoverflow.com/questions/38114325/cant-show-image-in-react-native

## Styles
você pode colocar mais de um estilo de uma vez só colocando em um array
style={[styles.cancelButton, styles.cancel]}

## websocket
// aula 05 40:00
