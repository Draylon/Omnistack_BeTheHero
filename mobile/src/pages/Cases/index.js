import React, {useState,useEffect} from 'react'
import { Feather } from "@expo/vector-icons"
import {FlatList,View,Image,Text,TouchableOpacity} from 'react-native'
import { useNavigation } from "@react-navigation/native";

import logoImg from "../../assets/logo.png"

import styles from "./styles"
import api from '../../services/api';

export default function Cases(){
    const navigation = useNavigation();
    const [cases,setCases] = useState("");
    const [totalItems,setTotalItems] = useState(0);
    const [tiText,setTiText] = useState("casos");
    const [page,setPage] = useState(1);
    const [loading,setLoading] = useState(false);

    function navToDetail(pcase){
        navigation.navigate('Detail',{pcase});
    }

    async function loadCases(){
        if(loading)
            return;
        if(totalItems>0 && cases.length == totalItems)
            return;
        setLoading(true);
        const resp = await api.get("cases",{
            params: {page}
        });
        setCases([...cases,...resp.data]);
        setTotalItems(resp.headers["x-total-count"]);
        
        if(totalItems>1)
            setTiText("casos")
        else
            setTiText("caso")
        setLoading(false);
        setPage(page+1);
    }

    useEffect(() => {
        loadCases();
    },[])

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{totalItems} {tiText}.</Text>
                </Text>
            </View>
            <Text style={styles.title}>Bem-Vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia!</Text>

            <FlatList data={cases}
            style={styles.caseList}
            keyExtractor={kCase=>String(kCase.id)}
            showsVerticalScrollIndicator={false}
            onEndReached={loadCases}
            onEndReachedThreshold={0.2}
            renderItem={({item:icase})=>(
                    <View style={styles.case}>
                        <Text style={styles.caseProperty}>Ong:</Text>
                        <Text style={styles.caseValue}>{icase.name}</Text>
                        
                        <Text style={styles.caseProperty}>Caso:</Text>
                        <Text style={styles.caseValue}>{icase.title}</Text>
                        
                        <Text style={styles.caseProperty}>Valor:</Text>
                        <Text style={styles.caseValue}>{Intl.NumberFormat('pt-BR',{style: 'currency',currency: 'BRL'}).format(icase.value)}</Text>
                        <TouchableOpacity style={styles.detailsButton} onPress={()=> navToDetail(icase)}>
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#e02041"/>
                        </TouchableOpacity>
                    </View>
                )}/>
        </View>
    )
}