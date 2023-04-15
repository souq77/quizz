import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react';
import { TextInput } from 'react-native'
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';


const OptionsScreen = () => {
    const [limit, setLimit] = useState(5);
    const [selectedLvl, setSelectedLvl] = useState(null);
    const handleLvlPress = (lvl) => {
        console.log(lvl);
        setSelectedLvl(lvl);
    };
    const navigation = useNavigation();

    return (
        <><View style={styles.header}>
            <Text style={styles.headerText}>Definissez les parametres de la partie</Text>
        </View>
            <View style={styles.rowTitle}>
                <Text style={styles.rowTitleText}>Niveau : </Text>
                <View style={styles.niveaux}>
                    <TouchableOpacity
                        onPress={() => handleLvlPress('Facile')}
                        style={{
                            backgroundColor: selectedLvl === 'Facile' ? '#6d9eeb' : '#c4c4c4',
                            marginTop: '5%',
                            borderRadius: '15px',
                            marginRight: '15%',
                        }}>
                        <Text style={styles.niveauTitle}>Facile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleLvlPress('Moyen')}
                        style={{
                            backgroundColor: selectedLvl === 'Moyen' ? '#6d9eeb' : '#c4c4c4',
                            marginTop: '5%',
                            borderRadius: '15px',
                            marginRight: '15%',
                        }}>
                        <Text style={styles.niveauTitle}>Moyen</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => handleLvlPress('Difficile')}
                        style={{
                            backgroundColor: selectedLvl === 'Difficile' ? '#6d9eeb' : '#c4c4c4',
                            marginTop: '5%',
                            borderRadius: '15px',
                            marginRight: '15%',
                        }}>
                        <Text style={styles.niveauTitle}>Difficile</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.rowTitle}>
                <Text style={styles.rowTitleText}>Tags : </Text>
                <View style={styles.Tags}>
                    <TextInput
                        placeholder="Linux, Bash, chmod ..."
                        style={styles.TagsText}
                    ></TextInput>
                </View>
            </View>
            <View style={styles.rowTitle}>
                <Text style={styles.rowTitleText}>Nombre de questions : {limit}</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={5}
                    maximumValue={20}
                    value={limit}
                    onValueChange={(newValue) => setLimit(newValue)}
                    step={1}
                />
            </View>
            <Pressable  onPress={() => navigation.navigate('Questions')} style={styles.footer}>
                <Text style={styles.footerTitle}>Valider</Text>
            </Pressable>
        </>
    )
}

export default OptionsScreen

const styles = StyleSheet.create({
    header: {
        width: '80%',
        backgroundColor: '#0782F9',
        padding: '3%',
        marginLeft: '10%',
        marginTop: '20%',
        borderRadius: '15px',
    },
    headerText: {
        color: 'white',
        fontSize: 24
    },
    rowTitle: {
        marginTop: '10%',
        marginLeft: '10%',
    },
    rowTitleText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    niveaux: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    niveau: {
        marginTop: '5%',
        borderRadius: '15px',
        marginRight: '15%',
    },
    niveauTitle: {
        color: 'white',
        fontSize: 16,
        padding: '3%'
    },
    Tags: {
        marginTop: '5%',
        backgroundColor: '#D9D9D9',
        borderRadius: '15px',
        marginRight: '15%',
        height: '20%',
        padding: '3%'
    },
    slider: {
        width: '90%',

    },
    footer: {
        width: '80%',
        backgroundColor: '#0782F9',
        padding: '3%',
        height: '12%',
        marginLeft: '10%',
        borderRadius: '15px',
        flexDirection:'row', 
        flexWrap:'wrap',
        alignItems : 'center',
        marginRight : 'auto',
        
      },
      footerTitle : {
        color: 'white',
        fontSize : 24,
        fontWeight : 'bold',
        marginLeft : 'auto',
        marginRight : 'auto',
        
        
    
      }
})