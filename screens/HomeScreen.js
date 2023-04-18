import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import data from '../asset/data.json';
import Swiper from 'react-native-swiper/src';


let itemList = [];

const HomeScreen = () => {
  const navigation = useNavigation();

  console.log(data.languages.length);
  return (
    <><View style={styles.header}>
      <Text style={styles.headerFirstText}>Bonjour Samy !{"\n"}{"\n"}{"\n"}{"\n"}Pret pour une nouvelle partie ?</Text>
    </View>
      <View style={styles.container}>
        <Swiper>
          <View style={styles.parentGrid}>
            <Pressable onPress={() => navigation.navigate('Options', {theme: "linux"})}  style={styles.childGrid}>
              <View style={styles.iconsImageBackground}>
                <Image style={styles.iconsImage} source={require('../asset/linux.png')} />
              </View>
              <Text style={styles.iconsTitle}>Linux</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Options', {theme: "bash"})}  style={styles.childGrid}>
              <View style={styles.iconsImageBackground}>
                <Image style={styles.iconsImage} source={require('../asset/bash.png')} />
              </View>
              <Text style={styles.iconsTitle}>BASH</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Options', {theme: "php"})}  style={styles.childGrid}>
              <View style={styles.iconsImageBackground}>
                <Image style={styles.iconsImage} source={require('../asset/php.png')} />
              </View>
              <Text style={styles.iconsTitle}>PHP</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Options', {theme: "docker"})}  style={styles.childGrid}>
              <View style={styles.iconsImageBackground}>
                <Image style={styles.iconsImage} source={require('../asset/docker.png')} />
              </View>
              <Text style={styles.iconsTitle}>Docker</Text>
            </Pressable>
          </View>
          <View style={styles.parentGrid}>
            <Pressable onPress={() => navigation.navigate('Options', {theme: "html"})}  style={styles.childGrid}>
              <View style={styles.iconsImageBackground}>
                <Image style={styles.iconsImage} source={require('../asset/html.png')} />
              </View>
              <Text style={styles.iconsTitle}>HTML</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Options', {theme: "mysql"})}  style={styles.childGrid}>
              <View style={styles.iconsImageBackground}>
                <Image style={styles.iconsImage} source={require('../asset/mysql.png')} />
              </View>
              <Text style={styles.iconsTitle}>MySQL</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Options', {theme: "wordpress"})}  style={styles.childGrid}>
              <View style={styles.iconsImageBackground}>
                <Image style={styles.iconsImage} source={require('../asset/wordpress.png')} />
              </View>
              <Text style={styles.iconsTitle}>WordPress</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Options', {theme: "laravel"})}  style={styles.childGrid}>
              <View style={styles.iconsImageBackground}>
                <Image style={styles.iconsImage} source={require('../asset/laravel.png')} />
              </View>
              <Text style={styles.iconsTitle}>Laravel</Text>
            </Pressable>
          </View>
          <View style={styles.parentGrid}>
            <Pressable onPress={() => navigation.navigate('Options', {theme: "kubernetes"})}  style={styles.childGrid}>
              <View style={styles.iconsImageBackground}>
                <Image style={styles.iconsImage} source={require('../asset/kubernetes.png')} />
              </View>
              <Text style={styles.iconsTitle}>Kubernetes</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Options', {theme: "javascript"})}  style={styles.childGrid}>
              <View style={styles.iconsImageBackground}>
                <Image style={styles.iconsImage} source={require('../asset/javascript.png')} />
              </View>
              <Text style={styles.iconsTitle}>JavaScript</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Options', {theme: "devops"})}  style={styles.childGrid}>
              <View style={styles.iconsImageBackground}>
                <Image style={styles.iconsImage} source={require('../asset/devops.png')} />
              </View>
              <Text style={styles.iconsTitle}>DevOps</Text>
            </Pressable>
           
          </View>
        </Swiper>
      </View>
      <View style={styles.footer}>
        <Image style={styles.footerImage} source={require('../asset/random.png')} />
        <Text style={styles.footerTitle}>Aleatoire</Text>
      </View></>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  header: {
    width: '80%',
    backgroundColor: '#0782F9',
    padding: '3%',
    marginLeft: '10%',
    marginTop: '20%',
    borderRadius: '15px'
  },
  headerFirstText: {
    color: 'white',
    fontSize: 18
  },
  container: {
    width: '100%',
    height: '50%',
  },
  parentGrid: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: "wrap",
    marginLeft: '10%'
  },
  childGrid: {
    width: '25%',
    height: '25%',
    margin: '10%',
  },
  iconsImageBackground: {
    borderRadius: '15px',
    borderColor: '#0782F9',
    borderWidth: 2,
    backgroundColor: 'white',
    padding: 10

  },
  iconsImage: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    width: '80%',
    height: '80%',
    aspectRatio : '1/1',
    objectFit : 'contain'
  },
  iconsTitle: {
    color: '#0782F9',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '5%',
    fontSize : 18,
    fontWeight : 'bold',
    marginBottom: 'auto',

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
  footerImage : {
    width : '30%',
    marginLeft : '10%',
    left:0,
  },
  footerTitle : {
    color: 'white',
    fontSize : 24,
    fontWeight : 'bold',
    marginLeft : '10%'
    

  }
})