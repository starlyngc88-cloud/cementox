# Interfaz y Captura (Web + Móvil)

## 1. Alcance por fases
- **Fase 1 (MVP Actual):** Adjuntar/subir archivos de **foto** y **video** desde Web y Móvil (`mobile/`).
- **Fase 2 (Futura):** Captura directa desde cámara con asistencia en tiempo real. La interfaz de captura debe abstraerse detrás de un contrato común (`MediaInputAdapter`) para incorporar cámara en vivo sin modificar el flujo de análisis ni resultados.

## 2. Flujo de carga y análisis automático
- El usuario adjunta una foto o video y el **sistema lo analiza automáticamente** (sin selección manual de fotogramas en Fase 1).
- Formatos permitidos, peso máximo y duración máxima de video se leen desde `config/media.json` y se validan con Zod antes y después de subir.
- El procesamiento de video/imagen debe soportar flujo asíncrono (`subiendo → analizando → completado | advertencia | error`) con barra/indicador de estado y opción de cancelar o reintentar.

## 3. Presentación de resultados
- Mostrar siempre: valor estimado (con unidad configurada), nivel de confianza, estado visual según tokens de color y motivos si hay advertencias.
- Indicar de forma visible cuando el resultado sea una estimación preliminar sujeta a validación técnica.