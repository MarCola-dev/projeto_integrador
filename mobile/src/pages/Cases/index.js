import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api'

import logoImg from '../../assets/logo.png'

import styles from './styles'

export default function Incidents() {
    const [cases, setCases] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation();
    
    function navigateToDetail(caso) {
        navigation.navigate('Details', { caso })
    }
    async function loadCases() {
        if (loading) {
            return;
        }

        if (total > 0 && cases.length === total) {
            return;
        }

        setLoading(true);

        const response = await api.get('cases', {
            params: { page }
        });

        setCases([...cases, ...response.data]);
        setTotal(response.headers['x-total-count'])
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadCases();
    }, [])

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                {/* <Image source={} /> */}
                <Text style={styles.headerText}>
                    Total de {total} <Text style={styles.headerTextBold}>casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem-Vindo</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>


            <FlatList 
                data={cases}
                style={styles.incidentList}
                keyExtractor={caso => String(caso.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadCases}
                onEndReachedThreshold={0.2}
                renderItem={({ item: caso  }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>NOME:</Text>
                        <Text style={styles.incidentValue}>{caso.nameC}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{caso.title}</Text>

                        <Text style={styles.incidentProperty}>TIPO SANGUINEO:</Text>
                        <Text style={styles.incidentValue}>{caso.type}</Text>

                        <Text style={styles.incidentProperty}>CIDADE / ESTADO:</Text>
                        <Text style={styles.incidentValue}>{caso.city} / {caso.uf}</Text>

                        <TouchableOpacity 
                            style={styles.detailsButton} 
                            onPress={() => navigateToDetail(caso)}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}