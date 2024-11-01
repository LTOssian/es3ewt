export async function makeUrl(path: string) {
  const slashlessPath = path.startsWith("/") ? path.slice(1) : path;
  return `http://localhost:8080/${slashlessPath}`; // TODO: use env variables
}

async function authorizedFetch(
  path: string,
  options: RequestInit = {},
): Promise<{ data?: any; error?: string; status: number }> {
  const url = await makeUrl(path);

  try {
    const response = await fetch(url, {
      ...options,
      headers: options.headers
        ? options.headers
        : {
            "Content-Type": "application/json",
          },
      credentials: "include",
    });

    const status = response.status;
    const data = await response.json().catch(() => null); // Catch JSON parse errors
    if (!response.ok) {
      // Handle non-200 responses as errors
      return { error: data?.message || "Request failed", status };
    }

    return { data, status };
  } catch (error) {
    // Handle network or unexpected errors
    return { error: "Network error", status: 0 };
  }
}

export async function basicPost(path: string) {
  return await fetch(await makeUrl(path), {
    method: "POST",
  });
}

// CRUD operations

export async function authorizedGet(path: string) {
  return await authorizedFetch(path);
}

export async function authorizedPost<T>(
  path: string,
  body: any,
  options = { stringify: true },
) {
  return await authorizedFetch(path, {
    method: "POST",
    body: options.stringify ? JSON.stringify(body) : body,
    ...options,
  });
}

export async function authorizedPatch<T>(path: string, body: T) {
  return await authorizedFetch(path, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export async function authorizedDelete(path: string) {
  return await authorizedFetch(path, {
    method: "DELETE",
  });
}
