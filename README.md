# Work DeMolay

Directorio web para mostrar profesionales, negocios, servicios y emprendimientos de hermanos DeMolay. La vista publica permite buscar, filtrar y contactar directamente por WhatsApp o llamada.

Esta version esta preparada como prototipo funcional con datos ficticios. La carga real de datos esta pensada para hacerse solo desde administracion.

## Tecnologias

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Lucide React
- Supabase preparado para fases siguientes
- Zod y React Hook Form preparados para formularios administrativos

## Ejecutar localmente

```bash
npm install
npm run dev
```

Luego abre:

```text
http://localhost:3000
```

## Como lo ve un visitante

- Inicio: `http://localhost:3000`
- Busqueda: `http://localhost:3000/buscar`
- Categorias: `http://localhost:3000/categorias`
- Perfil publico de ejemplo: `http://localhost:3000/perfil/veterinaria-san-jose`

El visitante puede:

- Buscar por nombre, rubro, especialidad, ciudad o departamento.
- Filtrar por departamento y ciudad.
- Abrir una tarjeta de perfil.
- Tocar WhatsApp para abrir una conversacion con mensaje predeterminado.
- Tocar llamada para marcar al numero registrado.

## Donde cambiar telefonos y WhatsApp

Edita el archivo:

```text
src/lib/demo-data.ts
```

Cada perfil tiene este formato:

```ts
{
  id: "demo-1",
  name: "Clinica Familiar Luz",
  owner: "Dr. Mateo Rojas",
  category: "Medicina",
  specialty: "Medicina general",
  city: "Trinidad",
  department: "Beni",
  description: "Atencion medica general...",
  phone: "71122334",
  whatsapp: "71122334",
  initials: "CL"
}
```

Para WhatsApp en Bolivia puedes poner el numero de 8 digitos. El sistema lo convierte automaticamente a formato internacional con `591`.

## Estructura de carpetas

```text
src/
  app/
    page.tsx                 Pagina principal publica
    buscar/page.tsx          Vista del visitante con busqueda y filtros
    categorias/page.tsx      Listado de categorias
    categoria/[slug]/page.tsx
                             Resultados por categoria
    perfil/[slug]/page.tsx   Perfil publico individual
    admin/page.tsx           Panel administrativo inicial
    iniciar-sesion/page.tsx  Acceso administrativo futuro
    registrar/page.tsx       Aviso de registro publico desactivado
    contacto/page.tsx        Contacto y reportes
    privacidad/page.tsx      Politica de privacidad
    terminos/page.tsx        Terminos de uso
    layout.tsx               Layout global, metadata y navegacion
    globals.css              Estilos globales y tema

  components/
    brand-mark.tsx           Logo propio DM en rojo, negro y dorado
    business-card.tsx        Tarjeta publica de cada perfil
    search-panel.tsx         Buscador principal con filtros
    site-header.tsx          Encabezado responsive
    site-footer.tsx          Pie de pagina
    page-shell.tsx           Plantilla simple para paginas informativas
    ui/button.tsx            Botones reutilizables

  lib/
    demo-data.ts             Datos ficticios editables
    directory.ts             Slugs, busqueda, filtros y mensaje WhatsApp
    utils.ts                 Utilidades compartidas
```

## Validaciones

```bash
npm run typecheck
npm run lint
npm run build
```

## Preparacion para GitHub

El proyecto ya incluye `.gitignore`, por lo que no se subiran `node_modules`, `.next` ni variables `.env`.

Para subirlo se necesita un repositorio GitHub de destino, por ejemplo:

```text
tu-usuario/work-demolay
```

Tambien se necesita GitHub CLI (`gh`) instalado o un remoto Git configurado manualmente.
