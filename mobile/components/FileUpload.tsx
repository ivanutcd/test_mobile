import React from 'react';
import { View, Text, Pressable, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Feather } from '@expo/vector-icons';

interface FileUploadProps {
  onChange: (files: DocumentPicker.DocumentPickerAsset[]) => void;
  label: string;
  multiple?: boolean;
  type?: string;
  maxSize?: number;
}

const FileUpload = ({ label, onChange }: FileUploadProps) => {
  const [selectedFiles, setSelectedFiles] = React.useState<DocumentPicker.DocumentPickerAsset[]>([]);

  const handlePick = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
      multiple: true,
      copyToCacheDirectory: true,
    });

    if (!result.canceled && result.assets) {
      setSelectedFiles(result.assets);
      onChange(result.assets);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.uploadBox,
          selectedFiles.length > 0 && styles.uploadBoxFilled
        ]}
        onPress={handlePick}
      >
        <Feather name="upload" size={40} color="#5FD0DF" />
        <Text style={styles.uploadText}>Haz click para agregar archivos</Text>
        <Text style={styles.hintText}>Tamaño máximo: sin límite</Text>
      </Pressable>

      {selectedFiles.map((file, index) => {
  const isImage = file.mimeType?.startsWith('image/');
  
  return (
    <View key={index} style={styles.fileItem}>
      {isImage ? (
        <Image 
          source={{ uri: file.uri }} 
          style={{ width: 40, height: 40, borderRadius: 4, marginRight: 8 }}
          resizeMode="cover"
        />
      ) : (
        <Feather 
          name={
            file.name?.endsWith('.pdf') ? 'file-text' : 
            ['doc', 'docx'].some(ext => file.name?.endsWith(ext)) ? 'file-text' :
            ['xls', 'xlsx'].some(ext => file.name?.endsWith(ext)) ? 'file-text' :
            ['ppt', 'pptx'].some(ext => file.name?.endsWith(ext)) ? 'file-text' :
            'file'
          } 
          size={24} 
          color="#555" 
          style={{ marginRight: 8 }}
        />
      )}
      <View style={{ flex: 1 }}>
        <Text style={styles.fileName}>{file.name}</Text>
        <Text style={styles.fileSize}>
          {typeof file.size === 'number' ? `${(file.size / 1024).toFixed(2)} KB` : 'Tamaño desconocido'}
        </Text>
      </View>
      <TouchableOpacity 
        onPress={() => {
          const newFiles = [...selectedFiles];
          newFiles.splice(index, 1);
          setSelectedFiles(newFiles);
          onChange(newFiles);
        }}
        style={styles.deleteButton}
      >
        <Feather name="trash-2" size={18} color="#ff4444" />
      </TouchableOpacity>
    </View>
  );
})}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
    textAlign: 'center',
  },
  uploadBox: {
    borderWidth: 2,
    borderColor: '#5FD0DF',
    borderStyle: 'dashed',
    borderRadius: 10,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  uploadText: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
  },
  hintText: {
    marginTop: 4,
    fontSize: 12,
    color: '#777',
  },
  uploadBoxFilled: {
    backgroundColor: '#e0f7fa', // fondo distinto si hay archivos
    borderColor: '#5FD0DF',
  },

  fileName: {
    marginLeft: 6,
    fontSize: 12,
    color: '#333',
  },
  fileItem: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 8,
  padding: 8,
  backgroundColor: '#f5f5f5',
  borderRadius: 4,
    fontSize: 12,
  color: '#333',
},
fileSize: {
  fontSize: 10,
  color: '#777',
},
deleteButton: {
  padding: 4,
  marginLeft: 8,
}

});

export default FileUpload;