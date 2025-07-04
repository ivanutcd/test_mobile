// import React from 'react';
// import {
//   Text,
//   Image,
//   StyleSheet,
//   SafeAreaView,
//   View,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as Yup from 'yup';
// import { useAuth } from '@hooks/useAuth';
// import { Box } from '@/components/ui/box';
// import { Button, ButtonText } from '@/components/ui/button';
// import { Input, InputField } from '@/components/ui/input';
// import {
//   Checkbox,
//   CheckboxIcon,
//   CheckboxIndicator,
//   CheckboxLabel,
// } from '@/components/ui/checkbox';
// import {
//   FormControl,
//   FormControlLabel,
//   FormControlLabelText,
// } from '@/components/ui/form-control';
// import { CheckIcon } from '@gluestack-ui/themed';

// const loginSchema = Yup.object().shape({
//   email: Yup.string().email('Correo inválido').required('Correo requerido'),
//   password: Yup.string()
//     .min(6, 'Mínimo 6 caracteres')
//     .required('Contraseña requerida'),
//   rememberPassword: Yup.boolean(),
// });

// type LoginFormValues = {
//   email: string;
//   password: string;
//   rememberPassword: boolean;
// };

// const LoginScreen: React.FC = () => {
//   const {
//     control,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<LoginFormValues>({
//     resolver: yupResolver(loginSchema),
//     defaultValues: {
//       email: '',
//       password: '',
//       rememberPassword: false,
//     },
//   });

//   const { login } = useAuth();

//   const onSubmit = async (data: LoginFormValues) => {
//     try {
//       await login(); // No navegues desde aquí, RootNavigator manejará el cambio
//     } catch (error) {
//       Alert.alert('Error', 'No se pudo iniciar sesión');
//       console.error('Login error:', error);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Box style={styles.box}>
//         <Image
//           source={require('@/assets/images/logoEnee.png')}
//           style={styles.logo}
//           resizeMode="contain"
//         />
//         <Text style={styles.title}>Bienvenido/a</Text>
//         <Text style={styles.description}>
//           Ingresa con tu correo empresarial
//         </Text>

//         <View style={styles.formContainer}>
//           {/* Email */}
//           <Controller
//             control={control}
//             name="email"
//             render={({ field: { onChange, value } }) => (
//               <FormControl isInvalid={!!errors.email} isRequired>
//                 <FormControlLabel>
//                   <FormControlLabelText>
//                     Correo electrónico
//                   </FormControlLabelText>
//                 </FormControlLabel>
//                 <Input variant="outline" size="md">
//                   <InputField
//                     placeholder="Correo electrónico"
//                     value={value}
//                     onChangeText={onChange}
//                     keyboardType="email-address"
//                     autoCapitalize="none"
//                   />
//                 </Input>
//               </FormControl>
//             )}
//           />

//           {/* Contraseña */}
//           <Controller
//             control={control}
//             name="password"
//             render={({ field: { onChange, value } }) => (
//               <FormControl isInvalid={!!errors.password} isRequired>
//                 <FormControlLabel>
//                   <FormControlLabelText>Contraseña</FormControlLabelText>
//                 </FormControlLabel>
//                 <Input variant="outline" size="md">
//                   <InputField
//                     placeholder="Contraseña"
//                     value={value}
//                     onChangeText={onChange}
//                     secureTextEntry
//                   />
//                 </Input>
//               </FormControl>
//             )}
//           />

//           {/* Checkbox */}
//           <View style={styles.checkboxContainer}>
//             <Controller
//               control={control}
//               name="rememberPassword"
//               render={({ field: { onChange, value } }) => (
//                 <Checkbox isChecked={value} onCheckedChange={onChange}>
//                   <CheckboxIndicator>
//                     <CheckboxIcon as={CheckIcon} />
//                   </CheckboxIndicator>
//                   <CheckboxLabel>Recuérdame</CheckboxLabel>
//                 </Checkbox>
//               )}
//             />
//             <Text style={styles.forgotPassword}>Olvidé mi contraseña</Text>
//           </View>

//           {/* Botón Login */}
//           <Button
//             size="md"
//             action="primary"
//             variant="solid"
//             onPress={handleSubmit(onSubmit)}
//             isDisabled={isSubmitting}
//           >
//             {isSubmitting ? (
//               <ActivityIndicator color="#fff" />
//             ) : (
//               <ButtonText>Iniciar sesión</ButtonText>
//             )}
//           </Button>

//           {/* Botón SSO */}
//           <Button
//             size="md"
//             action="secondary"
//             variant="outline"
//             onPress={login}
//             isDisabled={isSubmitting}
//           >
//             <Image
//               source={require('@/assets/splash-icon.png')}
//               style={{ width: 20, height: 20, marginRight: 8 }}
//             />
//             <ButtonText>Iniciar con SSO</ButtonText>
//           </Button>
//         </View>
//       </Box>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   box: {
//     flex: 1,
//     alignItems: 'center',
//     paddingTop: 50,
//     paddingHorizontal: 16,
//   },
//   logo: {
//     width: 200,
//     height: 40,
//     marginBottom: 30,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   description: {
//     fontSize: 16,
//     marginBottom: 20,
//     color: '#666',
//   },
//   formContainer: {
//     width: '100%',
//     gap: 16,
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   forgotPassword: {
//     fontSize: 14,
//     color: '#616161',
//   },
// });

// export default LoginScreen;


import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import TestScreen from './TestRender';
 
 
const Stack = createNativeStackNavigator();
 
export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={TestScreen} />
    </Stack.Navigator>
  );
}
 