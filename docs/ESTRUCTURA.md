# Estructura del proyecto

## Raiz

- `package.json`: dependencias y comandos.
- `package-lock.json`: versiones exactas instaladas.
- `next.config.ts`: configuracion de Next.js.
- `tsconfig.json`: configuracion de TypeScript.
- `eslint.config.mjs`: reglas de lint.
- `.env.example`: ejemplo de variables de entorno.
- `PLAN_IMPLEMENTACION.md`: arquitectura y fases.
- `README.md`: guia principal del proyecto.

## `src/app`

Contiene las rutas de la aplicacion usando App Router.

- `/`: experiencia principal del visitante.
- `/buscar`: listado filtrable.
- `/categorias`: categorias publicas.
- `/categoria/[slug]`: categoria especifica.
- `/perfil/[slug]`: perfil publico.
- `/admin`: panel administrativo inicial.

## `src/components`

Componentes reutilizables de interfaz. Aqui esta el logo `DM`, tarjetas, buscador, header, footer y botones.

## `src/lib`

Codigo de dominio y datos.

- `demo-data.ts`: perfiles ficticios y ubicaciones.
- `directory.ts`: busqueda, filtros, slugs y mensaje de WhatsApp.
- `utils.ts`: normalizacion de telefono y enlaces.

## `docs`

Guias sencillas para editar datos y entender el proyecto.
