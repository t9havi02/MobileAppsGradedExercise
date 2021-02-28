import React from 'react'
import { View, Text } from 'react-native'

export default function makepost() {

    const [state, setState] = useState({
        title : "",
        description : "",
        category : "",
        location : "",
        image : "",
        price : "",
        dateOfPosting : "01-01-2021",
        delivery : "",
        sellerName : "",
        sellerPhone : "",
        sellerEmail : ""

    })
    const handleChange = (e) => {
        const {id, value} = e.target
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }


    return (
        <View>
            <Text>Build-a-post</Text>

            <Text>Title:</Text>
            <TextInput/>
        </View>
    )
}
