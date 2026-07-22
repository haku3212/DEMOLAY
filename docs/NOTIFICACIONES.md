# Notificaciones de Telegram

La app puede enviar avisos a Telegram cuando:

- llega una nueva solicitud de negocio;
- un visitante reporta informacion incorrecta en un perfil.

## Variables en Vercel

Agrega estas variables en el proyecto de Vercel:

```env
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
NEXT_PUBLIC_SITE_URL=https://demolay-flax.vercel.app
```

Despues de guardar las variables, haz redeploy.

## Como conseguir los datos

1. En Telegram, abre `@BotFather`.
2. Envia `/newbot`.
3. Copia el token del bot y usalo como `TELEGRAM_BOT_TOKEN`.
4. Escribe un mensaje a tu bot desde tu cuenta.
5. Abre esta URL en el navegador, cambiando el token:

```text
https://api.telegram.org/botTU_TOKEN/getUpdates
```

6. Busca `"chat":{"id":...}` y copia ese numero como `TELEGRAM_CHAT_ID`.
