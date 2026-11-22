# Logs y Memoria del Proyecto

## 1. Directorio `logs/` como memoria limpia
- El directorio `logs/` almacena la memoria viva y limpia del proyecto (por ejemplo, `logs/memoria.md` y registros técnicos relevantes).
- No se usa como volcadero de depuración temporal.

## 2. Política de retención y limpieza (Strict Cleanup)
- **SÍ se conserva:** decisiones de arquitectura, cambios en reglas de `ai/`, estructura de configuraciones, hallazgos clave y parámetros validados por usuarios/expertos.
- **NO se conserva (se elimina):** ensayos fallidos, experimentos descartados, código muerto o funcionalidades eliminadas. Cada vez que se decida quitar algo del proyecto, se eliminan tanto sus archivos/código como sus menciones obsoletas en `logs/`.

## 3. Guardián de coherencia de reglas (Regla crítica)
- Antes o al ejecutar cualquier cambio de código, estructura o flujo, se debe contrastar contra todos los archivos de `ai/`.
- **Si un cambio contradice una regla existente:**
  1. Detener y advertir explícitamente qué regla se está incumpliendo y por qué.
  2. Acordar si se respeta la regla original o si se modifica la regla en `ai/`.
  3. Actualizar el archivo correspondiente en `ai/` y anotar el cambio de criterio en `logs/memoria.md` para evitar repetir errores.