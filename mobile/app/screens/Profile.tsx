import React, { useState, FunctionComponent } from 'react';
import { StyleSheet, ViewStyle, TextStyle, Pressable } from 'react-native';
import { Box, View, Card, Heading, Text, VStack, HStack, Link, LinkText } from '@gluestack-ui/themed';
import { Button, ButtonText } from "@/components/ui/button";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogBody, AlertDialogBackdrop } from "@/components/ui/alert-dialog";
import { MaterialIcons } from '@expo/vector-icons';
import { useUserStore } from '@/src/store/useUserStore';
import { useAuth } from '@/src/context/AuthProvider';

import { config as themeConfig } from '@/gluestack-style.config';

interface ProfileOptionProps {
  icon: string;
  color: string;
  text: string;
  onPress: () => void;
}

interface LogoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

interface Styles {
  container: ViewStyle;
  avatarContainer: ViewStyle;
  name: TextStyle;
  email: TextStyle;
  avatar: ViewStyle;
  avatarText: TextStyle;
  logoutText: TextStyle;
}

const Profile: FunctionComponent = () => {
    const { user } = useUserStore();
    const { logout } = useAuth();
    const [showAlertDialog, setShowAlertDialog] = useState(false);

    const handleClose = () => setShowAlertDialog(false);

    const handleLogout = async () => {
        console.log('Cerrando sesión');
        await logout();
    }

    return (
        <View style={styles.container}>
            <Box style={styles.avatarContainer}>
                <Avatar size="xl" style={styles.avatar}>
                    <AvatarFallbackText style={styles.avatarText}>{user?.name}</AvatarFallbackText>
                </Avatar>
                <Text style={styles.name}>{user?.name} </Text>
                <Text style={styles.email}>{user?.email} </Text>
            </Box>
            <VStack space="md" reversed={false}>
                <ProfileOption icon="lock" color="#616161" text="Cambiar contraseña" />
                <Pressable onPress={() => setShowAlertDialog(true)}>
                    <ProfileOption icon="logout" color="red" text="Cerrar sesión"  />
                </Pressable>
            </VStack>
            <LogoutDialog isOpen={showAlertDialog} onClose={handleClose} onLogout={handleLogout} />
        </View>
    )
}

const ProfileOption: FunctionComponent<ProfileOptionProps> = ({ icon = 'lock', color = '#616161', text = 'Cambiar contraseña', onPress = () => {} }) => (
    <Box className="h-12 w-full flex-row items-center  gap-2 justify-start align-center" >
        <MaterialIcons name={icon as any} size={24} color={color} />
        <Text style={{ ...styles.logoutText, color }}>{text}</Text>
        <MaterialIcons name="chevron-right" style={{ marginLeft: 'auto' }} size={24} color={color} />
    </Box>
);

const LogoutDialog: FunctionComponent<LogoutDialogProps> = ({ isOpen = false, onClose = () => {}, onLogout = () => {} }) => (
    <AlertDialog isOpen={isOpen} onClose={onClose} size="md">
        <AlertDialogBackdrop  />
        <AlertDialogContent style={{ borderRadius: 20, padding: 16 }}>
            <AlertDialogHeader>
                <Heading  style={{ fontSize: 20, fontWeight: 'bold' }}>
                ¿Deseas cerrar sesión?
                </Heading>
            </AlertDialogHeader>
            <AlertDialogBody className="">
                <Text size="lg">
                Perderás el acceso hasta volver a iniciar sesión.
                </Text>
            </AlertDialogBody>
            <AlertDialogFooter className="">
                <Button variant="outline" action="secondary" onPress={onClose} size="sm">
                    <ButtonText>Cancelar</ButtonText>
                </Button>
                <Button size="sm" onPress={onLogout}>
                    <ButtonText>Cerrar sesión</ButtonText>
                </Button>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
);

const styles = StyleSheet.create<Styles>({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    avatarContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    email: {
        fontSize: 16,
        marginBottom: 10,
    },
    avatar: {
        backgroundColor: '#F1F1F4',
    },
    avatarText: {
        color: themeConfig.themes.light.colors.primary,
    },
    logoutText: {
        fontSize: 16,
        color: 'red',
    },
});

export default Profile;
