# Configuración de Resend para Emails de Waitlist

Resend es un servicio gratuito que permite enviar hasta **3,000 emails/mes** y **100 emails/día** sin costo.

## Pasos para configurar:

### 1. Crear cuenta en Resend

1. Andá a [resend.com](https://resend.com)
2. Creá una cuenta gratuita
3. Verificá tu email

### 2. Obtener tu API Key

1. Una vez en el dashboard, andá a **API Keys**
2. Hacé click en **Create API Key**
3. Dale un nombre (ej: "Fuga Waitlist")
4. Copiá la API key que te genera (empieza con `re_`)

### 3. Agregar la API Key a tu proyecto

En v0, agregá la variable de entorno:

```
RESEND_API_KEY=re_tu_api_key_aqui
```

**Importante:** Pegá esto en la sección **Vars** del sidebar de v0.

### 4. Configurar dominio (Opcional pero recomendado)

Por defecto, los emails se envían desde `onboarding@resend.dev`. Para usar tu propio dominio:

1. En Resend, andá a **Domains**
2. Agregá tu dominio (ej: `fuga.com`)
3. Configurá los registros DNS que te indica Resend
4. Una vez verificado, actualizá el `from` en `/app/api/waitlist/route.ts`:

```typescript
from: 'Fuga <notificaciones@tudominio.com>',
```

## Cómo funciona

Cuando alguien se suscribe a la waitlist:

1. Los datos se guardan en Supabase
2. Se envía un email automático a **huevos.fuga@gmail.com** con:
   - Nombre del suscriptor
   - Email
   - Teléfono (si lo proporcionó)
   - Zona (si la proporcionó)
   - Fecha y hora de suscripción

## Límites del plan gratuito

- **3,000 emails/mes**
- **100 emails/día**
- Dominio compartido (`onboarding@resend.dev`)

Para más emails o dominio personalizado, Resend tiene planes pagos muy accesibles.

## Troubleshooting

Si no te llegan los emails:

1. Verificá que la API key esté bien configurada
2. Revisá la carpeta de spam de `huevos.fuga@gmail.com`
3. Verificá los logs en el dashboard de Resend
