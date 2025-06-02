# 🖥️ CartXUI - Sistema de Checkout Automático

**Aplicación Electron de doble pantalla para el portón de checkout automático con RFID**

[![Electron](https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=Electron&logoColor=white)](https://www.electronjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=TensorFlow&logoColor=white)](https://www.tensorflow.org/)

---

## 📋 Descripción

CartXUI es el sistema de interfaz de usuario que funciona en el portón de checkout automático. Proporciona una experiencia de doble pantalla para clientes en entornos de kiosco, integrando escaneo RFID, detección de presencia humana y procesamiento de pagos para experiencias de compra automatizadas.

## 🏗️ Arquitectura Dual-Screen

### Procesos Separados
- **StartUI:** Interfaz de selección de método de compra para el cliente
- **OverviewUI:** Interfaz principal de checkout y gestión de pedidos
- **Main Process:** Controladores y comunicación entre procesos

### Comunicación IPC
Los procesos se comunican mediante APIs `contextBridge` seguras definidas en scripts de preload, permitiendo navegación controlada entre pantallas.

## 🚀 Características Principales

### Interfaz Kiosco
- Ventanas sin marco (`frame: false`)
- No redimensionables (`resizable: false`)
- Tamaño estándar 1024x600 para pantallas de retail
- Navegación controlada por el proceso principal

### Detección Inteligente
- **Detección de Presencia:** TensorFlow.js para identificar usuarios
- **Escaneo RFID:** Comunicación serie con lectores RFID
- **Múltiples Métodos:** Carrito, cesta o productos en mano

### Experiencia Multiidioma
- Soporte para 6 idiomas diferentes
- Interfaz adaptativa según selección del usuario
- Instrucciones contextuales por método de compra

## 🛠️ Stack Tecnológico

### Core
- **Electron 36.3.2** - Framework de aplicación desktop
- **React 19.1.0** - Librería de componentes UI
- **TypeScript 5.8.3** - JavaScript tipado
- **React Router 7.6.1** - Enrutamiento client-side

### Hardware & AI
- **@tensorflow/tfjs-node** - Runtime de machine learning
- **@tensorflow-models/pose-detection** - Detección de presencia humana
- **serialport** - Comunicación con scanner RFID

### UX & Interactions
- **react-i18next** - Internacionalización
- **react-toastify** - Notificaciones de usuario
- **react-simple-keyboard** - Teclado en pantalla
- **sweetalert2** - Diálogos modales

## 🎯 Métodos de Compra

1. **🛒 Carrito** - Productos en carrito de compras
2. **🧺 Cesta** - Productos en cesta de mano
3. **✋ En Mano** - Productos llevados directamente

Cada método tiene instrucciones específicas y flujos de procesamiento adaptados.

## ⚙️ Instalación y Desarrollo

```bash
# Clonar repositorio
git clone https://github.com/tu-org/CartXUI.git
cd CartXUI

# Instalar dependencias
npm install

# Desarrollo con hot reload
npm run dev

# Compilar para producción
npm run build

# Empaquetar aplicación
npm run package
```

## 🔧 Configuración

### Variables de Entorno
- Configuración cargada mediante `dotenv`
- Configuración específica por entorno de despliegue
- Ajustes de hardware y conectividad

### Build System
- **Electron Forge** con plugin Webpack
- Compilación TypeScript con source maps
- Procesamiento CSS y reubicación de módulos nativos
- Empaquetado multi-plataforma (Windows, macOS, Linux)

## 🖼️ Estructura de Pantallas

### StartUI (Pantalla Cliente)
- Selección de idioma
- Selección de método de compra
- Instrucciones contextuales

### OverviewUI (Pantalla Principal)
- Display de productos escaneados
- Totales y cálculos en tiempo real
- Interfaz de pago
- Estado de transacción

---

**Parte del ecosistema CartX - TFG DAM 2023-2025**