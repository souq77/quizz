import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const OptionsScreen = () => {
    return (
        <><View style={styles.header}>
            <Text style={styles.headerText}>Definissez les parametres de la partie</Text>
        </View>
        <View style={styles.rowTitle}>
            <View style={styles.niveaux}>
                <View style={styles.niveau}>
                    <Text style={styles.niveauTitle}>Facile</Text>
                </View>
                <View style={styles.niveau}>
                    <Text style={styles.niveauTitle}>Moyen</Text>
                </View>
                <View style={styles.niveau}>
                    <Text style={styles.niveauTitle}>Difficile</Text>
                </View>
            </View>
        </View>
        <View style={styles.rowTitle}>
            <View style={styles.tags}>
                <View style={styles.niveau}>
                    <Text style={styles.niveauTitle}>Facile</Text>
                </View>
            </View>
        </View>
        </>
    )
}

export default OptionsScreen

const styles = StyleSheet.create({})