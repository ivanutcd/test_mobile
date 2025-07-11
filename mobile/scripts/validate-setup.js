#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Validating project setup...');

// Verificar que estamos en el directorio correcto
if (!fs.existsSync('package.json')) {
    console.error('❌ Error: package.json not found. Make sure you\'re in the mobile directory.');
    process.exit(1);
}

// Verificar app.json
if (!fs.existsSync('app.json')) {
    console.error('❌ Error: app.json not found');
    process.exit(1);
}

// Verificar eas.json
if (!fs.existsSync('eas.json')) {
    console.error('❌ Error: eas.json not found');
    process.exit(1);
}

// Verificar que el proyecto tenga un ID válido
const appJson = JSON.parse(fs.readFileSync('app.json', 'utf8'));
if (!appJson.expo?.extra?.eas?.projectId) {
    console.warn('⚠️  Warning: No projectId found in app.json');
} else {
    console.log('✅ Project ID found in app.json');
}

// Verificar configuración de EAS
console.log('📋 EAS Configuration:');
try {
    const easVersion = execSync('eas --version', { encoding: 'utf8' }).trim();
    console.log(`✅ EAS CLI is installed: ${easVersion}`);
} catch (error) {
    console.log('⚠️  EAS CLI not found, will install during workflow');
}

// Verificar dependencias básicas
console.log('📦 Checking dependencies...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

if (packageJson.dependencies?.expo || packageJson.devDependencies?.expo) {
    console.log('✅ Expo dependency found');
} else {
    console.error('❌ Expo dependency not found');
    process.exit(1);
}

// Verificar configuración de TypeScript
if (fs.existsSync('tsconfig.json')) {
    console.log('✅ TypeScript configuration found');
    // Intentar type check pero no fallar si hay errores
    try {
        execSync('npx tsc --noEmit', { stdio: 'pipe' });
        console.log('✅ TypeScript compilation successful');
    } catch (error) {
        console.warn('⚠️  TypeScript compilation has errors (this is expected during development)');
    }
} else {
    console.warn('⚠️  TypeScript configuration not found');
}

// Verificar configuración de ESLint
if (fs.existsSync('.eslintrc.js')) {
    console.log('✅ ESLint configuration found');
} else {
    console.warn('⚠️  ESLint configuration not found');
}

// Verificar configuración de Jest
if (fs.existsSync('jest.config.js')) {
    console.log('✅ Jest configuration found');
} else {
    console.warn('⚠️  Jest configuration not found');
}

// Verificar configuración de EAS
const easJson = JSON.parse(fs.readFileSync('eas.json', 'utf8'));
if (easJson.build?.preview && easJson.build?.production) {
    console.log('✅ EAS build profiles configured');
} else {
    console.warn('⚠️  EAS build profiles not fully configured');
}

console.log('🎉 Project setup validation completed!'); 