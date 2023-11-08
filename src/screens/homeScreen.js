import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { url } from '../utils/config';

function HomeScreen() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(url)
            .then((resp) => resp.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    return(
        <View style={styles.container}>
        {loading ? (
            <Text>Loading...</Text>
        ) : (
            data.map((post) => {
                return (
                    <View>
                        <Text style={styles.title}>{post.title}</Text>
                        <Text>{post.body}</Text>
                    </View>
                );
            })
        )}
    </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "grey",
        padding: 8,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
    },
});

export default HomeScreen;