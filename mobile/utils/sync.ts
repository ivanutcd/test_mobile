// import NetInfo from '@react-native-community/netinfo';
// import { executeSql } from '../database/database';
// import axios from 'axios';

// export const sincronizarRespuestas = async () => {
//   const net = await NetInfo.fetch();
//   if (!net.isConnected) return;

//   const result = await executeSql(`SELECT * FROM respuestas WHERE enviada = 0`);
//   const respuestas = result.rows._array;

//   for (const r of respuestas) {
//     try {
//       await axios.post('https://mi-api.com/respuestas', {
//         id: r.id,
//         formularioId: r.formularioId,
//         contenido: JSON.parse(r.contenido),
//         fecha: r.fecha
//       });

//       await executeSql(`UPDATE respuestas SET enviada = 1 WHERE id = ?`, [r.id]);
//     } catch (e) {
//       console.error('Error enviando respuesta:', e);
//     }
//   }
// };
