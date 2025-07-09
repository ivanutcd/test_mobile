import { Pressable, StyleSheet } from 'react-native';
import { Box, HStack, Text } from '@gluestack-ui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import Chip from '../../../components/ui/chip/chip';
import { useNavigation } from '@react-navigation/native';
export interface Asignacion {
    idUsuario: string;
    fechaAsignacion: string;
    movilidad: string;
    clave: string;
    detalle: {
        nombre: string;
        direccion: string;
        telefono: string;
        email: string;
        ciudad: string;
        estado: string;
    };
    estadoCaptura: string;
    estadoSincronizacion: string;
    clientFormId: string;
}
export default function CardItemAsignaciones(item: Asignacion & { key: string }) {
    const color = item.estadoCaptura === 'Completado' ? 'success' : 'warning';

    const colorSincronizacion = item.estadoSincronizacion === 'Completado' ? 'success' : 'warning';
    console.log(item);
    const navigation = useNavigation(); 
    return (

        <Pressable onPress={() => {
            navigation.navigate('FormRenderScreen' as never);
          }}>
        <HStack style={styles.container}  >
            <Box style={styles.box}>
                <Text style={styles.title}>{item.detalle?.nombre}</Text>
                <Text style={styles.subTitle}>#{item.clave}</Text>
                <Text style={styles.caption}>{item.detalle?.telefono}</Text>
                

            </Box>
            <Box style={styles.boxIcon}>
                <Chip text={item.estadoCaptura} color={color} isActive={true} />
                <Chip text={`${item.estadoSincronizacion}`} color={colorSincronizacion} isActive={true} />
                <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
            </Box>
        </HStack>
        </Pressable>  

    )
}



const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#E0E0E0',
        marginHorizontal: 10,
        marginVertical: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',   
        paddingBottom: 16,
    },
    box: {
  

    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    subTitle: {
        fontSize: 14,

    },
    caption: {
        fontSize: 12,
        color: '#666',
    },
    boxIcon: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
});