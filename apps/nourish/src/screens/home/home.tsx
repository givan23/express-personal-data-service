import {View, Text, Animated} from "react-native";
import {useUsersQuery} from "../../features/user/hooks/use-users-query";
import FlatList = Animated.FlatList;
import {styles} from './home.styles';

const Home = () => {

    const {data, isLoading} = useUsersQuery();

    if (isLoading) {
        return <Text>Loading...</Text>
    }

    return (
        <View>
            <FlatList
                data={data ?? []}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                renderItem={({item}) => (
                    <View style={styles.item}>
                        <Text>ID: {item.id}</Text>
                        <Text>Email: {item.email}</Text>
                    </View>
                )}
            />
        </View>
    )
}

export {Home};