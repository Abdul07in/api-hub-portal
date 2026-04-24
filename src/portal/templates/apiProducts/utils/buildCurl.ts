import type { ApiSpec } from "@/common/interfaces/api";

export function buildCurl(api: ApiSpec): string {
  const headers = Object.entries(api.headers)
    .map(([key, value]) => `--header '${key}: ${value}'`)
    .join(" \\\n");

  const data =
    api.method === "GET"
      ? ""
      : ` \\\n--data-raw '${JSON.stringify(api.sampleRequest, null, 2)}'`;

  return `curl --location --request ${api.method} 'https://api.icicipru.com/v2${api.path}' \\\n${headers}${data}`;
}
