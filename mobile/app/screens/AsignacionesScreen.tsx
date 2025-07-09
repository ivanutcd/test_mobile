import React, { FunctionComponent, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from '@gluestack-ui/themed';
import { useUserStore } from '@/src/store/useUserStore';
import CardItemAsignaciones, { Asignacion } from './components/cardItemAsignaciones';
import { config as themeConfig } from '@/gluestack-style.config';



const AsignacionesScreen: FunctionComponent = () => {
    const { user } = useUserStore();
    const [asignaciones, setAsignaciones] = useState<Asignacion[]>([


        {
            idUsuario: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            fechaAsignacion: "2025-07-09T20:53:37.080Z",
            movilidad: "Cobro Prejuridico",
            clave: "1234567890",
            detalle: {
                nombre: "Daniel Perez",
                direccion: "Direccion 1",
                telefono: "1234567890",
                email: "cliente1@gmail.com",
                ciudad: "Ciudad 1",
                estado: "Estado 1",
           
            },
            estadoCaptura: "Completado",
            estadoSincronizacion: "Pendiente",
            clientFormId: "1234567890"
          },
          {
            idUsuario: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            fechaAsignacion: "2025-07-09T20:53:37.080Z",
            movilidad: "Cobro Prejuridico",
            clave: "1234567890",
            detalle: {
                nombre: "Juan Perez",
                direccion: "Direccion 2",
                telefono: "1234567890",
                email: "cliente2@gmail.com",
                ciudad: "Ciudad 2",
                estado: "Estado 2",
            },
            estadoCaptura: "Completado",
            estadoSincronizacion: "Completado",
            clientFormId: "1234567890"
          }

    ]); 


    return (
        <View style={styles.container}>

          <FlatList
            data={asignaciones}
         
            renderItem={({ item  }) =>  <CardItemAsignaciones {...item} key={item.idUsuario} />}
          />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 16,
        color: themeConfig.themes.light.colors.primary,
    },
});

export default AsignacionesScreen;
