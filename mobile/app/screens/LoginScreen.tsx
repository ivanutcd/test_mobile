
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
 
 
const Stack = createNativeStackNavigator();
 
export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}


// import React from 'react';
// import {
//   Text,
//   Image,
//   StyleSheet,
//   SafeAreaView,
//   View,
//   TouchableOpacity,
//   Keyboard,
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
// import { Link } from '@react-navigation/native';

// const loginSchema = Yup.object().shape({
//   email: Yup.string().email('Correo inválido').required('Correo requerido'),
//   password: Yup.string()
//     .min(6, 'Mínimo 6 caracteres')
//     .required('Contraseña requerida'),
//   rememberPassword: Yup.boolean().required(),
// });

// type LoginFormValues = {
//   email: string;
//   password: string;
//   rememberPassword: boolean;
// };

// export default function LoginScreen() {
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginFormValues>({
//     resolver: yupResolver(loginSchema),
//   });
//   const { login } = useAuth();

//   const onSubmit = (data: LoginFormValues) => {
//     console.log(data);
//     login();
//   };

//   return (
//     <TouchableOpacity style={styles.container} onPress={Keyboard.dismiss}>
//       <SafeAreaView style={styles.container}>
//         <Box style={styles.box}>
//           <Image
//             source={require('@/assets/images/logoEnee.png')}
//             style={styles.logo}
//           />
//           <Text style={styles.title}>Bienvenido/a</Text>
//           <Text style={styles.description}>
//             Ingresa con tu correo empresarial
//           </Text>

//           <View style={styles.formContainer}>
//             <Controller
//               control={control}
//               render={({ field: { onChange, value } }) => (
//                 <FormControl isInvalid={!!errors.email} isRequired>
//                   <FormControlLabel>
//                     <FormControlLabelText>
//                       Correo electrónico
//                     </FormControlLabelText>
//                   </FormControlLabel>
//                   <Input
//                     variant="outline"
//                     size="md"
//                     isInvalid={!!errors.email}
//                     isRequired
//                     onChangeText={onChange}
//                     value={value}
//                     placeholder="Correo electrónico"
//                   >
//                     <InputField placeholder="Correo electrónico" />
//                   </Input>
//                 </FormControl>
//               )}
//               name="email"
//               rules={{ required: true }}
//               defaultValue=""
//             />

//             <Controller
//               control={control}
//               render={({ field: { onChange, value } }) => (
//                 <FormControl isInvalid={!!errors.password} isRequired>
//                   <FormControlLabel>
//                     <FormControlLabelText>Contraseña</FormControlLabelText>
//                   </FormControlLabel>
//                   <Input
//                     variant="outline"
//                     size="md"
//                     onChangeText={onChange}
//                     value={value}
//                     placeholder="Contraseña"
//                   >
//                     <InputField placeholder="Contraseña" />
//                   </Input>
//                 </FormControl>
//               )}
//               name="password"
//               rules={{ required: true }}
//               defaultValue=""
//             />
//             <Box style={styles.checkboxContainer}>
//               <Controller
//                 control={control}
//                 render={({ field: { onChange, value } }) => (
//                   <Checkbox
//                     size="md"
//                     isChecked={value}
//                     onCheckedChange={onChange}
//                   >
//                     <CheckboxIndicator>
//                       <CheckboxIcon as={CheckIcon} />
//                     </CheckboxIndicator>
//                     <CheckboxLabel>Recuerdame</CheckboxLabel>
//                   </Checkbox>
//                 )}
//                 name="rememberPassword"
//                 defaultValue={false}
//               />

//               <Link href="/forgot-password" action={{ type: 'push' }}>
//                 <Text style={styles.forgotPassword}>Olvidé mi contraseña</Text>
//               </Link>
//             </Box>
//             <Button
//               size="md"
//               action="primary"
//               variant="solid"
//               onPress={handleSubmit(onSubmit)}
//             >
//               <ButtonText>Iniciar sesión</ButtonText>
//             </Button>
//             <Button
//               size="md"
//               action="secondary"
//               variant="outline"
//               onPress={login}
//             >
//               <Image
//                 source={require('@/assets/splash-icon.png')}
//                 style={{ width: 20, height: 20 }}
//               />
//               <ButtonText>Iniciar con SSO</ButtonText>
//             </Button>
//           </View>
//         </Box>
//       </SafeAreaView>
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignItems: 'stretch',
//     backgroundColor: '#fff',
//     gap: 16,
//   },
//   box: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     gap: 0,
//   },
//   formContainer: {
//     width: '100%',
//     padding: 16,
//     gap: 16,
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   logo: {
//     width: 200,
//     height: 40,
//     marginBottom: 50,
//     marginTop: 80,
//   },
//   description: {
//     fontSize: 16,
//     marginBottom: 16,
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//     gap: 16,
//   },
//   forgotPassword: {
//     fontSize: 14,
//     color: '#616161',
//   },
// });
