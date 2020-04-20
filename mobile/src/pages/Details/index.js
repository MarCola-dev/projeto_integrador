import React from 'react';
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer'



import logoImg from '../../assets/logo.png'

import styles from './styles'

export default function Details() {
    const navigation = useNavigation();
    const route = useRoute();

    const caso = route.params.caso;
    const message = `Olá ${caso.nameU}, estou entrando em contato pois gostaria de ajudar no caso "${caso.title}" com o tipo sanguineo ${caso.type}`;

    function navigateBack() {
        navigation.goBack()
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Doador para: ${caso.nameC}`,
            recipients: [caso.email],
            body: message,
        })
    }

    function sendWhatsApp() {
        Linking.openURL(`whatsapp://send?phone=${caso.whatsapp}&text=${message}`)
    }

    return(
        <View  style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                
                <TouchableOpacity  onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E02140" />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, { marginTop: 0 }]}>Nome / Cidade / Estado:</Text>
                <Text style={styles.incidentValue}>{caso.nameC} de {caso.city} / {caso.uf}</Text>

                <Text style={styles.incidentProperty}>TIPO SANGUINEO:</Text>
                <Text style={styles.incidentValue}>{caso.type}</Text>

                <Text style={styles.incidentProperty}>Descrição:</Text>
                <Text style={styles.incidentValue}>{caso.description}</Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Doe sangue, doe vida!</Text>

                <Text style={styles.heroDescription}>Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    );
}
