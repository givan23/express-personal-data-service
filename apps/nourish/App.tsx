/*import {Provider} from "react-redux";*/
import {StatusBar} from 'expo-status-bar';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {StyleSheet, Text, View} from 'react-native';
import {Home} from "./src/screens/home/home";
/*import {store} from "./src/store/store";*/

export default function App() {
    const queryClient = new QueryClient();

    return (
        /*<Provider store={store}>*/
        <QueryClientProvider client={queryClient}>
            <View style={styles.container}>
                <Home/>
                <StatusBar style="auto"/>
            </View>
        </QueryClientProvider>
        /*</Provider>*/
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
