# Work DeMolay - Plan de implementacion

## Vision

Work DeMolay sera un directorio web responsive para encontrar profesionales, negocios, oficios, productos y emprendimientos de una comunidad de hermanos DeMolay en Bolivia. La primera version no sera marketplace: no tendra pagos internos ni chat propio. Su funcion central sera recibir solicitudes de perfiles, revisarlas antes de publicarlas y facilitar contacto directo por WhatsApp o llamada.

## Arquitectura tecnica

- Frontend y backend web: Next.js con App Router, React y TypeScript.
- Estilos: Tailwind CSS con modo claro/oscuro y componentes propios.
- Base de datos: PostgreSQL administrado por Supabase.
- Autenticacion: Supabase Auth.
- Archivos: Supabase Storage para logos, fotos de perfil y galerias.
- Validacion: Zod y React Hook Form.
- Iconos: Lucide React.
- Despliegue: Vercel, usando variables de entorno publicas y privadas segun corresponda.

## Estructura prevista

- `src/app`: rutas publicas y panel administrativo.
- `src/components`: componentes reutilizables de UI, navegacion, tarjetas, formularios y dashboards.
- `src/lib`: clientes Supabase, utilidades, validaciones, datos demo y reglas de permisos.
- `src/types`: tipos compartidos de dominio y base de datos.
- `supabase/migrations`: SQL versionado para tablas, indices, funciones, triggers, RLS, politicas y datos iniciales.
- `public`: imagenes estaticas seguras, iconos y placeholders.

## Modelo de datos

Tablas principales:

- `profiles`: perfil extendido del usuario autenticado.
- `user_roles`: roles administrativos, inicialmente `admin` y `moderator`.
- `businesses`: registro principal del negocio o profesional, con `slug` unico y estado editorial.
- `categories` y `subcategories`: clasificacion administrable.
- `departments` y `cities`: ubicacion normalizada, inicialmente Bolivia.
- `business_services`: productos y servicios ofrecidos.
- `business_images`: logo, foto principal y galeria.
- `business_social_links`: redes y enlaces externos.
- `business_hours`: horarios por dia.
- `favorites`: favoritos de usuarios autenticados.
- `profile_views`: visitas a perfiles.
- `contact_clicks`: clics de WhatsApp y llamada.
- `reports`: reportes de informacion incorrecta o contenido inapropiado.
- `notifications`: avisos administrativos del sistema.
- `audit_logs`: historial de acciones administrativas.

Estados de perfil administrado:

- `draft`
- `pending`
- `approved`
- `rejected`
- `suspended`

## Seguridad

- Row Level Security activo en tablas sensibles.
- Politicas por rol en Supabase, no solo validaciones frontend.
- Los perfiles publicos solo mostraran negocios aprobados por el administrador.
- La carga y mejora de perfiles se realizara desde el panel administrativo, no desde formularios publicos.
- Se requerira autorizacion explicita para publicar datos.
- Subidas limitadas a JPG, PNG y WebP, con tamanos maximos.
- Variables privadas fuera del repositorio y documentadas en `.env.example`.

## Fases

### Fase 1: base visual y navegacion

- Inicializar Next.js, TypeScript y Tailwind.
- Configurar estructura base, metadata, fuentes y tema claro/oscuro.
- Crear header, footer, navegacion responsive y componentes base.
- Crear pagina principal responsive con hero, buscador, categorias destacadas, perfiles recientes demo y seccion de funcionamiento.
- Usar identidad visual inspirada en el ambiente DeMolay: rojo, negro, blanco y acentos dorados, sin copiar assets oficiales sin autorizacion.
- Verificar lint, TypeScript y build.

### Fase 2: Supabase y datos

- Crear migraciones SQL completas.
- Agregar tablas, relaciones, indices, triggers y RLS.
- Crear datos iniciales de Bolivia, categorias y datos ficticios.
- Configurar clientes Supabase y tipos TypeScript.

### Fase 3: directorio publico

- Implementar buscador por texto, categoria, departamento y ciudad.
- Crear paginas `/buscar`, `/categorias`, `/categoria/[slug]` y `/perfil/[slug]`.
- Implementar tarjetas, resultados vacios, paginacion y enlaces WhatsApp/telefono.

### Fase 4: autenticacion administrativa

- Implementar inicio de sesion administrativo con Supabase Auth.
- Crear formulario interno multi-paso con React Hook Form y Zod para carga y mejora de perfiles.
- Implementar subida de imagenes y validaciones.
- Permitir crear negocios como `draft`, `pending` o `approved` segun decision administrativa.

### Fase 5: panel de gestion

- Crear panel protegido para gestion de perfiles.
- Permitir editar datos, servicios, imagenes, horarios y estado editorial.
- Mostrar visitas y contactos.

### Fase 6: administracion

- Crear dashboard `/admin`.
- Implementar solicitudes, perfiles, categorias, usuarios, reportes e historial.
- Agregar filtros, busqueda, paginacion, confirmaciones y audit logs.

### Fase 7: calidad, SEO y despliegue

- Metadata dinamica, Open Graph, sitemap y robots.
- Mejoras de accesibilidad y rendimiento.
- Pruebas para slugs, filtros, permisos, formularios y enlaces.
- README completo y guia de Supabase.
- Build final listo para Vercel.

## Decisiones principales

- El home y el directorio usaran componentes server-first cuando no requieran interaccion compleja.
- Los formularios y filtros interactivos seran Client Components acotados.
- La busqueda inicial podra funcionar con parametros de URL y consultas optimizadas; si el volumen crece, se podra agregar busqueda full-text de PostgreSQL.
- La UI priorizara celulares: navegacion simple, controles grandes, jerarquia clara y botones de contacto visibles.
- La aplicacion incluira datos ficticios claramente marcados mientras no exista Supabase configurado.
- No se usaran pagos, chat interno, Firebase ni datos personales reales.
