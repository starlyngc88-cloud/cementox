# Reglas de Medición de Asentamiento (100% Parametrizable)

## 1. Principio de diseño para MVP
Al no contar aún con criterios cerrados por un especialista o cliente final, **todo parámetro físico, matemático y de clasificación debe ser configurable** para ajustarlo sin tocar código tras las primeras revisiones del MVP.

## 2. Parámetros configurables (`config/measurement.json`)
- **Tipo de ensayo/medición:** `slump_cone` (cono de Abrams), `spread` (extensión/flujo), `vertical_drop` (caída vertical) o `custom`.
- **Unidad de salida:** `cm`, `mm`, `in`.
- **Calibración y referencia visual:** activada/desactivada, tipo de referencia (objeto conocido, marcador o proporción de cono) y dimensiones base en la unidad configurada.
- **Rangos de consistencia:** intervalos configurables (ej. seca, plástica, fluida) asociados a tokens de color y mensajes.
- **Umbrales de confianza:** porcentaje mínimo para estado `success`, rango para `warning` y umbral debajo del cual se marca como `error` (no concluyente).

## 3. Validación de evidencia
- Si la foto o video no alcanza los mínimos configurados de resolución, nitidez, iluminación o visibilidad del material, el motor debe devolver estado **no concluyente** con la causa específica en lugar de inventar una medida.