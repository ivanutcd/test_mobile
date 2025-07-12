#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Diagnosing build configuration...');

// Verificar babel.config.js
console.log('\n📋 Babel Configuration:');
if (fs.existsSync('babel.config.js')) {
    console.log('✅ babel.config.js found');
    try {
        const babelConfig = require('../babel.config.js');
        console.log('✅ babel.config.js is valid');
        console.log('Presets:', babelConfig().presets);
        console.log('Plugins:', babelConfig().plugins.length);
    } catch (error) {
        console.error('❌ babel.config.js has errors:', error.message);
    }
} else {
    console.error('❌ babel.config.js not found');
}

// Verificar metro.config.js
console.log('\n📋 Metro Configuration:');
if (fs.existsSync('metro.config.js')) {
    console.log('✅ metro.config.js found');
    try {
        const metroConfig = require('../metro.config.js');
        console.log('✅ metro.config.js is valid');
    } catch (error) {
        console.error('❌ metro.config.js has errors:', error.message);
    }
} else {
    console.error('❌ metro.config.js not found');
}

// Verificar package.json
console.log('\n📦 Package Dependencies:');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

const requiredDeps = [
    '@babel/core',
    'babel-preset-expo',
    'nativewind',
    'react-native-css-interop'
];

requiredDeps.forEach(dep => {
    if (packageJson.dependencies?.[dep] || packageJson.devDependencies?.[dep]) {
        console.log(`✅ ${dep} found`);
    } else {
        console.warn(`⚠️  ${dep} not found`);
    }
});

// Verificar archivos de entrada
console.log('\n📁 Entry Files:');
const entryFiles = ['index.ts', 'App.tsx'];
entryFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file} found`);
    } else {
        console.error(`❌ ${file} not found`);
    }
});

// Verificar configuración de NativeWind
console.log('\n🎨 NativeWind Configuration:');
if (fs.existsSync('tailwind.config.js')) {
    console.log('✅ tailwind.config.js found');
} else {
    console.warn('⚠️  tailwind.config.js not found');
}

if (fs.existsSync('global.css')) {
    console.log('✅ global.css found');
} else {
    console.warn('⚠️  global.css not found');
}

console.log('\n🎉 Build diagnosis completed!'); 