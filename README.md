# Cementox

Aplicacion web para el analisis del asentamiento / revertimiento del concreto y su consistencia, a partir de foto o video.

## Funcionalidad principal

- Analisis del **acentamiento / revertimiento del concreto** junto con su **consistencia**.
- Captura de **foto o video** (upload) y analisis automatico.
- Resultado con **valor estimado en pulgadas (`in`)**, nivel de confianza, consistencia, estado y motivos.

## Estado actual

- MVP inicial implementada (solo **web**, sin login).
- Flujo: upload -> `POST /api/analyze` -> validacion Zod -> motor de analisis -> resultado.
- Motor actualmente determinista (base para integrar vision real).
- Pendiente: captura por camara (`MediaInputAdapter`) y app movil (Expo/RN).

## Stack

- Web: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Zod 4.
- Compartido (`shared/`): tipos y esquemas para web y movil.
- Pendiente: Supabase (BD/storage/auth).

## Comandos

- `npm run dev` -> desarrollo en http://localhost:3000
- `npm run build` -> build de produccion
- `npm run start` -> servir build
- `npm run typecheck` -> verificacion de tipos

## Estructura

- `src/app` -> rutas (pagina, API).
- `src/components` -> UI y servicios/conectores.
- `src/lib` -> config, validacion, motor.
- `shared/` -> tipos y esquemas compartidos.
- `config/` -> configuraciones (validadas con Zod).
- `ai/` -> reglas del proyecto.
- `logs/` -> memoria del proyecto.

## Contexto

- Concepto: acentamiento o revertimiento del concreto - consistencia.
- Normas de referencia: ASTM C143, NTC 396, INV 404-07.