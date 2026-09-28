import { getCredentials } from "./credentials.ts";

export async function apiFetch(
  path: string,
  options: RequestInit = {},
) {
  const { serverUrl, accessToken } = getCredentials();

  return fetch(`${serverUrl}${path}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  })
}