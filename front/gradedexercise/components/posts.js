import { setStatusBarHidden } from 'expo-status-bar'
import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Button, Dimensions, ScrollView } from 'react-native'
import MoreInfo from './moreinfo'

const width = Dimensions.get('window').width;

export default function posts() {

    useEffect(() =>{
        fetchPostInfo();
    }, []);

    const [postData, setData] = useState([]);

    const fetchPostInfo = async () => {
        const data = await fetch(
            'https://t9havi02gradedexerciseapi.herokuapp.com/postings')
        const postData = await data.json();
        setData(postData)
    }



    return (
        <ScrollView>
            {postData.map(post => (
                <>
                <View style={styles.post}>
                    <Text>{post.title}</Text>
                    <Text>{post.sellerName}</Text>
                    <Text>{post.price}€</Text>
                    <Text>{post.location}</Text>
                    <MoreInfo 
                    description={post.description}
                    sellerPhone={post.sellerPhone}
                    sellerEmail={post.sellerEmail}/>
                </View>
                </>
            ))}
        </ScrollView>
    )
    
}

const styles = StyleSheet.create({
    post:{
        width: width * 0.8
    }
  });
  