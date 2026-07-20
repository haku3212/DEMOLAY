# Guia para cargar datos

Los datos actuales son ficticios y viven en:

```text
src/lib/demo-data.ts
```

## Cambiar un WhatsApp

Busca el perfil y cambia:

```ts
whatsapp: "71122334"
```

Puedes escribir el numero como 8 digitos bolivianos. El enlace final se genera automaticamente asi:

```text
https://wa.me/59171122334
```

## Cambiar llamada

Cambia:

```ts
phone: "71122334"
```

El boton de llamada usa automaticamente:

```text
tel:+59171122334
```

## Agregar un nuevo perfil ficticio

Copia un objeto existente dentro de `demoBusinesses` y cambia:

- `id`
- `name`
- `owner`
- `category`
- `specialty`
- `city`
- `department`
- `description`
- `phone`
- `whatsapp`
- `initials`

No uses datos personales reales hasta tener autorizacion de publicacion.
