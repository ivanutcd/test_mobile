import { Text, Pressable , StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Box, HStack,  } from '@gluestack-ui/themed';
import Chip from '../../../components/ui/chip/chip';
import { MaterialIcons } from '@expo/vector-icons';


export default function CardItemFormularios(item: any) {
    const navigation = useNavigation();
    const onGetFormPress = () => {
        navigation.navigate('FormRenderScreen' as never);
      };
      const color = item.item.estado === 'Completado' ? 'success' : 'warning';
    return (

        <Pressable onPress={onGetFormPress}>
             <HStack style={styles.container}       >
      <Box  style={{flex: 1}}>
        <Text style={styles.text}>{item.item.nombreTecnico}</Text>
        <Text style={styles.subText}>{item.item.movilidadAsociada}</Text>
        <Text style={styles.caption}>{item.item.fechaActualizacion}</Text>
      </Box>
   
   <Box style={styles.boxIcon}>
        <Chip text={item.item.estado} color={color} isActive={true} />
        <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
        
   </Box>
   
    </HStack>
           
        </Pressable>

    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'flex-start',
        borderBottomWidth: 0.2,
        borderBottomColor: '#E0E0E0',
        paddingBottom: 10,
        marginBottom: 10,

    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    subText: {
        fontSize: 14,

        color: '#000',
        marginBottom: 10,
    },
    caption: {
        fontSize: 10,
        color: '#666',
    },
    icon: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#E0E0E0',
    },
    boxIcon: {
        flexDirection: 'row',
        gap: 10,
        height: 70,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
});