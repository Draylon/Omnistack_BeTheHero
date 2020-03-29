import React from 'react'
import {Text,View,Image,TouchableOpacity,Linking} from 'react-native'
import {Feather} from "@expo/vector-icons"

import { useNavigation,useRoute } from "@react-navigation/native";

import * as MailComposer from "expo-mail-composer";

import styles from "./styles"
import logoImg from "../../assets/logo.png"

function Detail(){
    const nav = useNavigation();
    const route = useRoute();

    const reCase = route.params.pcase;
    const bodyMsg = `Olá ${reCase.name}, estou entrando em contato, para ajudar no caso "${reCase.title}" com ${Intl.NumberFormat('pt-BR',{style: 'currency',currency: 'BRL'}).format(reCase.value)}`;
    function navigateBack(){
        nav.goBack();
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject: `Herói do caso: ${reCase.title}`,
            recipients: [reCase.email],
            body: bodyMsg
        })
    }
    function sendWPP(){
        Linking.openURL(`whatsapp://send?phone=${reCase.whatsapp}&text=${bodyMsg}`)
    }
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#e82041"/>
                </TouchableOpacity>
            </View>
            <View style={styles.case}>
                <Text style={[styles.caseProperty,{marginTop: 0}]}>Ong: </Text>
    <Text style={styles.caseValue}>{reCase.name} de {reCase.city}/{reCase.uf}</Text>
                
                <Text style={styles.caseProperty}>Caso: </Text>
                <Text style={styles.caseValue}>{reCase.desc}</Text>
                
                <Text style={styles.caseProperty}>Valor: </Text>
                <Text style={styles.caseValue}>{Intl.NumberFormat('pt-BR',{style: 'currency',currency: 'BRL'}).format(reCase.value)}</Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
                <Text style={styles.heroDesc}>Entre em contato:</Text>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWPP}>
                        <Text style={styles.actionText}>
                            Whatsapp
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>
                            Email
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

export default Detail;