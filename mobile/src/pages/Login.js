import React, { useState, useEffect } from 'react'
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, AsyncStorage } from 'react-native';
// AsyncStorage == LocalStorage
import { BorderlessButton } from 'react-native-gesture-handler';
import api from '../services/api'

import logo from '../assets/logo.png'

// navigation == history
export default function Login({ navigation }) {
    // email, techs
    const [email, setEmail] = useState('')
    const [techs, setTechs] = useState('')

    // se o user já estiver logado ele nao precisa logar novamente
    useEffect(
        () => {
            AsyncStorage.getItem('user_id').then(user => {
                if (user) {
                    navigation.navigate('List')
                }
            })
        },
        []
    );

    async function handleSubmit() {
        console.log(email)
        console.log(techs)
        // login
        const response = await api.post('/sessions', {
            email
        })

        const { _id } = response.data

        console.log(_id)

        await AsyncStorage.setItem('user_id', _id);
        await AsyncStorage.setItem('techs', techs);

        navigation.navigate('List');
    }


    return <KeyboardAvoidingView behavior="padding" enabled={Platform.OS === "ios"} style={styles.container}>
        <Image source={logo} />

        <View style={styles.form}>
            <Text style={styles.label}>SEU E-MAIL*</Text>
            <TextInput
                style={styles.input}
                placeholder="Seu e-mail"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                // aula 04 48:20
                onChangeText={setEmail}
            ></TextInput>

            <Text style={styles.label}>TECNOLOGIAS*</Text>
            <TextInput
                style={styles.input}
                placeholder="Tecnologias de interesse"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={techs}
                // aula 04 48:20
                onChangeText={setTechs}
            ></TextInput>

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Encontrar spots</Text>
            </TouchableOpacity>
        </View>

    </KeyboardAvoidingView>
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },
    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    }
});