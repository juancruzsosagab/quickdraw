# QuickDraw Editor 🎨

Un editor visual simple e interactivo construido con **Tldraw**, **Next.js**, **tRPC** y tecnologías modernas de React. Este proyecto es una implementación completa de una prueba técnica que demuestra capacidades de desarrollo full-stack con APIs type-safe y un diseño elegante.

## 🚀 Características Principales

- **Editor Visual Interactivo**: Powered by Tldraw para crear y editar formas
- **Paleta de Colores Personalizada**: Modificación de colores de figuras seleccionadas
- **APIs Type-Safe**: Implementación completa con tRPC
- **Persistencia de Datos**: Guardado automático del estado del editor
- **Panel de Pruebas**: Interfaz dedicada para probar endpoints de API
- **Diseño Responsivo**: UI moderna con TailwindCSS y Shadcn

## 🛠️ Tecnologías Utilizadas

- **[Next.js](https://nextjs.org/)** - Framework de React con App Router
- **[Tldraw](https://tldraw.com/)** - Biblioteca de dibujo y editor visual
- **[tRPC](https://trpc.io/)** - Type-safe APIs para cliente y servidor
- **[TailwindCSS](https://tailwindcss.com/)** - Framework de utilidades CSS
- **[Shadcn/ui](https://ui.shadcn.com/)** - Componentes de UI accesibles
- **TypeScript** - Tipado estático para mayor robustez
- **ESLint** - Linting y calidad de código

## 📋 Requisitos Cumplidos

### ✅ Funcionales
- [x] Página de editor con Tldraw integrado
- [x] Endpoint API para obtener datos del store
- [x] Actualización automática del store tras cambios
- [x] Botón personalizado que modifica formas (paleta de colores)
- [x] API routes de Next.js para operaciones server-side
- [x] Styling con TailwindCSS y componentes Shadcn
- [x] APIs type-safe con tRPC

### ✅ Técnicos
- [x] Aplicación Next.js desde cero
- [x] Configuración TailwindCSS + Shadcn
- [x] Dos endpoints tRPC: `getDocument` y `saveDocument`
- [x] Next.js app routing para navegación
- [x] Manejo de errores y estados de carga
- [x] Documentación completa en README.md

## 🏃‍♂️ Cómo Ejecutar el Proyecto

### 1. Instalación
```bash
# Clona el repositorio
git clone https://github.com/juancruzsosagab/quickdraw.git
cd quickdraw

# Instala las dependencias
npm install
```

### 2. Ejecución en Desarrollo
```bash
# Inicia el servidor de desarrollo
npm run dev
```

### 3. Acceso a la Aplicación
Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## 📱 Cómo Usar la Aplicación

### 🎨 Editor Principal
1. Ve a `/editor` desde la página de inicio
2. **Crea figuras**: Usa las herramientas de Tldraw para dibujar rectángulos, círculos, líneas, etc.
3. **Selecciona una figura**: Haz clic en cualquier forma creada
4. **Cambia colores**: Aparecerá la paleta personalizada - selecciona un color para modificar la figura
5. **Guardado automático**: Todos los cambios se guardan automáticamente cada segundo

### 🧪 Pruebas de API
1. Ve a `/api-test` para acceder al panel de pruebas
2. **GET Document**: Obtiene el documento guardado actual
3. **SAVE Document**: Genera y guarda datos aleatorios de prueba
4. **Observa resultados**: Cada clic genera timestamps únicos, IDs y figuras aleatorias

## 🔍 Testing de APIs

### Método 1: Panel de Pruebas Integrado
- Navega a `/api-test` en la aplicación
- Usa los botones de prueba para verificar cada endpoint
- Observa las respuestas JSON detalladas en tiempo real

### Método 2: Herramientas de Desarrollador
1. Abre las DevTools del navegador (F12)
2. Ve a la pestaña **Network**
3. Navega al editor y dibuja figuras
4. Observa las llamadas tRPC a `/api/trpc/`

### Método 3: Postman (Opcional)
Se incluye una colección de Postman: `QuickDraw.postman_collection.json` en la raíz del proyecto para importarla directamente
1. Importa la colección en Postman
2. Configura la URL base: `http://localhost:3000`
3. Ejecuta las requests de prueba

#### Ejemplo de payload para Postman:
```json
{
  "snapshot": {
    "shapes": [
      {
        "id": "shape_test_1",
        "type": "rectángulo",
        "x": 100,
        "y": 100,
        "width": 150,
        "height": 100,
        "color": "azul"
      }
    ],
    "metadata": {
      "createdBy": "Postman_Test",
      "totalShapes": 1
    }
  }
}
```

## 📊 Endpoints de API

### `GET /api/trpc/getDocument`
- **Descripción**: Obtiene el documento guardado
- **Respuesta**: Objeto con snapshot y timestamp

### `POST /api/trpc/saveDocument`
- **Descripción**: Guarda un snapshot del documento
- **Parámetros**: `{ snapshot: object }`
- **Respuesta**: Documento guardado con timestamp actualizado

## 🏗️ Estructura del Proyecto

```
quickdraw/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Página de inicio
│   ├── editor/            # Editor principal
│   ├── api-test/          # Panel de pruebas API
│   └── api/trpc/          # Endpoints tRPC
├── components/ui/         # Componentes UI (Shadcn)
├── lib/tldraw/           # Utilidades específicas de Tldraw
├── trpc/                 # Configuración tRPC
└── QuickDraw.postman_collection.json
```

## 🎯 Funcionalidad Destacada

### Paleta de Colores Personalizada
La característica principal implementada es un **sistema de modificación de colores** que permite:
- Seleccionar cualquier figura dibujada
- Cambiar su color usando una paleta personalizada
- Actualización en tiempo real del color
- Persistencia automática de los cambios


## 🧪 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Linting con ESLint
```

