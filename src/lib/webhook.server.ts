const WEBHOOK_URL = "https://webhook.site/333f7411-59f5-4010-914a-77bd28aa075b";

/** Envoi JSON silencieux (n'interrompt jamais la commande). */
export async function postWebhookJson(payload: unknown) {
  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    console.error("[webhook] json failed", e);
  }
}

/** Envoi multipart avec fichiers réels. */
export async function postWebhookForm(
  payload: Record<string, unknown>,
  files: { name: string; type: string; bytes: Uint8Array }[],
) {
  try {
    const form = new FormData();
    for (const [k, v] of Object.entries(payload)) {
      form.append(k, typeof v === "string" ? v : JSON.stringify(v));
    }
    form.append("payload_json", JSON.stringify(payload));
    files.forEach((f, i) => {
      form.append(
        `file_${i + 1}`,
        new Blob([f.bytes as unknown as BlobPart], { type: f.type }),
        f.name,
      );
    });
    await fetch(WEBHOOK_URL, { method: "POST", body: form });
  } catch (e) {
    console.error("[webhook] form failed", e);
  }
}
