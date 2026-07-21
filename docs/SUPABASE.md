# Guia Supabase

## 1. Crear proyecto

Entra a Supabase, crea un proyecto y espera a que termine la preparacion.

## 2. Ejecutar SQL

Abre SQL Editor y ejecuta el contenido de:

```text
supabase/migrations/0001_initial_schema.sql
```

Esto crea:

- tabla `business_submissions`
- estado `pending`, `approved`, `rejected`, `suspended`
- indices
- trigger `updated_at`
- politicas RLS
- bucket publico `business-profile-images`

## 3. Variables en Vercel

En Vercel, entra al proyecto y agrega:

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=https://tu-dominio.vercel.app
ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=
```

## 4. Probar

1. Abre `/registrar`.
2. Envia una solicitud con foto.
3. Abre Supabase y revisa `business_submissions`.
4. Abre `/iniciar-sesion`, entra con `ADMIN_PASSWORD` y luego revisa `/admin`.

## Nota

El formulario usa Supabase cuando las variables existen. Si no existen, guarda la solicitud localmente como modo de prueba para no romper la experiencia.
