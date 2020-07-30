import React, { useState, useEffect } from 'react'
// aula 04 SafeAreaView 1:01:00
import { View, AsyncStorage, Text, Image, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';

// aula 05 websocket 42:30
import socketio from 'socket.io-client';

import logo from '../assets/logo.png'
import SpotList from '../components/SpotList';

export default function List() {
    // const [email, setEmail] = useState('')
    const [techs, setTechs] = useState([])

    useEffect(() => {

        // pegar o usuário logado
        // aula 05 websocket 42:30
        AsyncStorage.getItem('user_id').then(user_id => {
            const socket = socketio('http://192.168.0.2:5000', {
                query: { user_id }
            })

            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'} `)
            })
        })
    }, [])
    useEffect(
        () => {
            AsyncStorage.getItem('techs').then(techs => {
                // transforma a string techs em array
                // trim = tirar o espaço em branco
                const techsArray = techs.split(',').map(tech => tech.trim())

                // salvar a techs como um array
                setTechs(techsArray);
            })
        },
        []
    );

    return <SafeAreaView style={styles.container}>
        <Image style={styles.logo} source={logo} />

        <ScrollView>
            {techs.map(tech => (
                <SpotList key={tech} tech={tech} />
            ))}
        </ScrollView>
    </SafeAreaView>
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 10
    },
});