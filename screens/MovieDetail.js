import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import { WebView } from 'react-native-webview';
import axios from 'axios'

export default function MovieDetail({ navigation, route }) {

    const [movies,setMovies] = useState({
        genre: []
    })

    useEffect(() => {
        const itemId = route.params.id
        axios.get(`https://movie-api.igeargeek.com/movies/${itemId}`)
            .then(res => {
            const movies = res.data;
            setMovies(movies)
        })
      }, [])

   return (
        <ScrollView
        showsVerticalScrollIndicator={false} 
        style={{flex:1}}
        contentContainerStyle={{flex:1}}>
            <WebView
                allowsFullscreenVideo
                source={{uri: movies.youtubeUrl}}
                style={{height: 200,flex:1}}
            />
            <View style={{flex:2,padding:15,backgroundColor:'#362420'}}>
                <View style={{flexDirection: 'row'}}>
                    <Image 
                        source={{ uri: movies.posterUrl }} 
                        style={{ flex:1, height: 180 }}
                        resizeMode={'stretch'}
                    />
                    <View style={{flex:2, marginLeft:15}}>
                        <Text style={{ color: 'white', fontSize:17 }}>{movies.name}</Text>
                        <Text style={{ color: 'white' }}> ประเภท : {movies.genre.join(', ')}</Text>
                    </View>
                </View>
            </View>

        </ScrollView>
    )
}