import React, {useEffect,useState} from 'react'
import { View, Text, TouchableHighlight, ActivityIndicator, FlatList ,StyleSheet,Image} from 'react-native'
import axios from 'axios'
import moment from 'moment'

export default function MoviesList({navigation}) {

    const[movies,setMovies] = useState([])
    const [isLoading,setLoading] = useState(true)
    useEffect(() => {
        axios.get(`https://movie-api.igeargeek.com/movies`)
            .then(res => {
            const movies = res.data.data;
            setMovies(movies)
            setLoading(false)
        })
      }, [])

      if (isLoading){
          return(
            <View style={{flex:1,justifyContent:'center'}} >
                <ActivityIndicator/>
            </View>
          )
          
      }
 
    return (
        <View style={{flex: 1,backgroundColor:'black'}}>
            <FlatList
                 data={movies}
                numColumns={2}
                horizontal={false}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                    return( 
                        <TouchableHighlight
       	                    style={styles.cardMovie}
                            activeOpacity={1}
                            onPress={() =>
            		            navigation.navigate(
                                'MovieDetail',
                                { id: item.id }
                                )
                            }>
       	                    <View style={{flex: 1,backgroundColor:'black'}}>
                                <Image source={{uri: item.posterUrl}}
                                        style={styles.movieImage} />
            		                <View style={{padding: 20}}>
                        <Text style={styles.textDate}>{moment(item.showingAt).format('DD/MM/YYYY')}</Text>
                  		                <Text style={styles.textTitle}>{item.name}</Text>
                                    </View>
                            </View>
                        </TouchableHighlight>
                    )
                       
                    
                }}

            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    textDate: {
        color: '#e1e12c'
    },
    textTitle: {
        color:'#ffffff',
        marginTop:5,
        fontSize:18,
        lineHeight:27
    },
    cardMovie: {
        flex:0.5
    },
    movieImage: {
        height:300
    },
 })