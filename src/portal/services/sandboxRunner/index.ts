import type { ApiSpec } from "@/common/interfaces/api";

export interface SandboxResult {
  status: number;
  latencyMs: number;
  body: unknown;
}

const PAN_RE = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function runSandbox(
  api: ApiSpec,
  payload: Record<string, unknown>,
): Promise<SandboxResult> {
  const start = performance.now();
  await sleep(280 + Math.random() * 320);

  // Validate required fields
  for (const f of api.requestFields) {
    const v = payload[f.name];
    if (f.required && (v === undefined || v === null || v === "")) {
      return finish(start, 400, {
        status: "ERROR",
        code: "MISSING_FIELD",
        message: `Field '${f.name}' is required.`,
      });
    }
  }

  // PAN-specific validation
  const pan = typeof payload.pan === "string" ? payload.pan.toUpperCase() : undefined;
  if (pan !== undefined && !PAN_RE.test(pan)) {
    return finish(start, 400, {
      status: "ERROR",
      code: "INVALID_PAN",
      message: "PAN format is invalid. Expected AAAAA9999A.",
    });
  }

  // Pick a deterministic response based on PAN suffix
  const variantIdx =
    pan && api.responses.length > 1 ? pan.charCodeAt(9) % Math.min(api.responses.length, 2) : 0;
  const chosen = api.responses[variantIdx] ?? api.responses[0];

  // Echo PAN if present in template
  let body = chosen.body;
  if (pan && body && typeof body === "object") {
    body = { ...(body as object), pan };
  }
  return finish(start, chosen.status, body);
}

function finish(start: number, status: number, body: unknown): SandboxResult {
  return { status, latencyMs: Math.round(performance.now() - start), body };
}
