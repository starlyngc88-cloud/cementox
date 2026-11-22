# Memoria del Proyecto — Medición de Asentamiento de Cemento

## Decisiones Activas
- **Arquitectura:** Separación estricta `UI → Componentes/Conectores → Backend → Supabase`. Sin conexiones directas a BD desde cliente.
- **Parametrización:** 100% configurable mediante `config/*.json` y `.env` validados con Zod 4.
- **Stack Web:** Next.js 16.2.11 (App Router), React 19.2.4, TypeScript 5, Supabase (SSR), Tailwind CSS 4, Shadcn UI, Zod 4.
- **Stack Móvil (`mobile/`):** Expo SDK 54, React Native 0.81.5, React 19.1.0, expo-router 6, NativeWind 4, Supabase JS.
- **Alcance Fase 1:** Solo carga de foto y video con análisis automático (cámara en vivo reservada para Fase 2).

## Historial de Ajustes de Reglas
- *Sin desviaciones registradas hasta la fecha.*