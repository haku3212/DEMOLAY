type SubmissionNotification = {
  id: string;
  owner: string;
  businessName: string;
  category: string;
  city: string;
  department: string;
  whatsapp: string;
};

type ReportNotification = {
  profileName: string;
  profileSlug: string;
  reason: string;
};

export async function notifyNewSubmission(submission: SubmissionNotification) {
  const adminUrl = `${getSiteUrl()}/admin/${submission.id}`;
  await sendTelegramMessage(
    [
      "Nueva solicitud para revisar",
      "",
      `Negocio: ${submission.businessName}`,
      `Hermano: ${submission.owner}`,
      `Categoria: ${submission.category}`,
      `Ubicacion: ${submission.city}, ${submission.department}`,
      `WhatsApp: ${submission.whatsapp}`,
      "",
      `Revisar: ${adminUrl}`
    ].join("\n")
  );
}

export async function notifyProfileReport(report: ReportNotification) {
  const profileUrl = `${getSiteUrl()}/perfil/${report.profileSlug}`;
  await sendTelegramMessage(
    [
      "Nuevo reporte de perfil",
      "",
      `Perfil: ${report.profileName}`,
      `Motivo: ${report.reason}`,
      "",
      `Ver perfil: ${profileUrl}`,
      `Panel admin: ${getSiteUrl()}/admin`
    ].join("\n")
  );
}

async function sendTelegramMessage(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (!token || !chatId) {
    return;
  }

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true
      })
    });
  } catch {
    // La notificacion no debe bloquear solicitudes ni reportes.
  }
}

function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, "");
  }

  const vercelUrl = process.env.VERCEL_URL?.trim();

  if (vercelUrl) {
    return `https://${vercelUrl}`;
  }

  return "https://demolay-flax.vercel.app";
}
