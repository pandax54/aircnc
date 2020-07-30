// aula 04 1:03:00

import React, { useEffect, useState } from 'react';
import { withNavigation } from 'react-navigation'
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
// FlatList aula 04 1:13:00
import api from '../services/api'


function SpotList({ tech, navigation }) {

    // para armazenar os sposts resgatados no banco de dados
    const [spots, setSpots] = useState([])

    useEffect(() => {
        // aula 04 1:08:00
        async function loadSposts() {
            const response = await api.get('/spots', {
                params: { tech }
            })

            console.log(response.data);

            setSpots(response.data)
        }
        loadSposts()
    }, [])

    // aula 04 1:21:00
    // id do spot
    function handleNavigate(id) {
        navigation.navigate('Book', { id })
    }

    return <View style={styles.container}>
        <Text style={styles.title}>Empresas que usam <Text style={styles.bold}>{tech}</Text></Text>
        <FlatList
            style={styles.list}
            data={spots}
            keyExtractor={spot => spot._id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
                <View style={styles.listItem}>
                    {/* // uri aula 04 1:15:40 */}
                    <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url }} />
                    <Text style={styles.company}>{item.company}</Text>
                    <Text style={styles.price}>{item.price ? `R$${item.price}/dia` : 'GRATUITO'}</Text>
                    <TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.button}>
                        <Text style={styles.buttonText}>Solicitar reserva</Text>
                    </TouchableOpacity>
                </View>
            )}
        />
    </View>
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30
    },
    title: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15
    },
    bold: {
        fontWeight: 'bold'
    },
    list: {
        paddingHorizontal: 20
    },
    listItem: {
        marginRight: 15

    },
    thumbnail: {
        width: 200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 2
    },
    company: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10
    },
    price: {
        fontSize: 15,
        color: '#999'
    },
    button: {
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15,
    }

})


export default withNavigation(SpotList)