# Calidad y Pruebas (MVP)

## 1. Checklist obligatorio antes de cerrar cualquier tarea
- [ ] Cero valores hardcodeados (todo en `.env` o `config/*.json` validado con Zod 4).
- [ ] Separación respetada: `UI → Componentes/Conectores → Backend → Supabase`.
- [ ] Cero componentes visuales compartidos indebidamente entre Web y `mobile/`.
- [ ] Cualquier prueba o funcionalidad descartada fue eliminada del código y limpiada de `logs/`.
- [ ] Si cambió algún comportamiento respecto a las reglas, `ai/` fue actualizado primero.

## 2. Casos de prueba mínimos en Fase 1
- Carga de foto válida en Web y en `mobile/` con respuesta y color de estado correcto.
- Carga de video válido con análisis automático y manejo de estados de progreso.
- Archivo inválido (formato no permitido, corrupto o excedido en peso/duración) rechazado limpiamente por validación Zod.
- Captura deficiente (borrosa, oscura o sin referencia) marcada como `warning` o `no concluyente` según configuración.
- Cambio de unidades, rangos o colores en `config/*.json` reflejado en Web y Móvil sin tocar componentes ni lógica.