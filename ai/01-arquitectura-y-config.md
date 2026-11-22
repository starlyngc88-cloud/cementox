# Arquitectura, Stack y Configuración

## 1. Stack Tecnológico Aprobado
- **Web (raíz / app web):** Next.js 16.2.11 (App Router), React 19.2.4, TypeScript 5, Supabase (SSR), Tailwind CSS 4, Shadcn UI, Zod 4.
- **Móvil (`mobile/`):** Expo SDK 54, React Native 0.81.5, React 19.1.0, expo-router 6, NativeWind 4, Supabase JS.
- **Código compartido (`shared/`):** Únicamente tipos TypeScript, esquemas de validación Zod y configuraciones parametrizadas. **Prohibido** compartir componentes visuales de React entre Web y Móvil debido a diferencias de runtime y versiones.

## 2. Separación estricta de capas (Obligatorio)
- **UI (Vistas / Pantallas):** Solo renderiza interfaz y captura eventos del usuario. No contiene lógica de negocio, cálculos ni llamadas directas a Supabase/BD.
- **Componentes (`components/`):** Contiene piezas visuales reutilizables y la **capa de conectores/servicios** que se comunica exclusivamente con los endpoints/acciones del Backend.
- **Backend (`app/api/` / Server Actions / Workers):** Único responsable de validar archivos, comunicarse con Supabase (BD, Storage, Auth) y ejecutar o delegar el motor de medición.
- **Prohibición estricta:** Ninguna vista ni componente cliente puede ejecutar consultas directas a tablas de Supabase (`supabase.from(...)`). Supabase opera encapsulado detrás de la capa de Backend/conectores.

## 3. Cero Hardcode y Validación con Zod
- Prohibido escribir valores fijos en código (umbrales, unidades, tamaños máximos, duraciones, rutas, colores o mensajes de estado).
- Toda configuración vive en archivos centralizados (`config/measurement.json`, `config/theme.json`, `config/media.json`) y variables de entorno (`.env`), validados al arrancar mediante **esquemas Zod 4**.

## 4. Código de colores estándar (Tokens semánticos)
Mapeados desde `config/theme.json` hacia Tailwind CSS 4 / Shadcn UI (Web) y NativeWind 4 (Móvil):
- **Éxito / Medición válida (`status.success`):** Verde estándar (`#16A34A`)
- **Advertencia / Baja confianza (`status.warning`):** Ámbar/Amarillo estándar (`#D97706`)
- **Error / No concluyente (`status.error`):** Rojo estándar (`#DC2626`)
- **Información / Procesando (`status.info`):** Azul estándar (`#2563EB`)
- **Neutro / Fondos y bordes (`status.neutral`):** Escala de grises estándar