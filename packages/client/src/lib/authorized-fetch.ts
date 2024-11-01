export async function makeUrl(path: string) {
  const slashlessPath = path.startsWith("/") ? path.slice(1) : path;
  //   const domainResponse = await fetch("/api-info.json");
  //   const { domain } = await domainResponse.json();
  //   const domainSlash = domain.endsWith("/") ? domain : `${domain}/`;
  //   return `${domainSlash}${slashlessPath}`;
  return `http://localhost:8080/${slashlessPath}`; // TODO: use env variables
}

async function authorizedFetch(
  path: string,
  options: RequestInit = {},
): Promise<{ data: any; status: number }> {
  const url = await makeUrl(path);
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include",
  });

  const data = await response.json();
  return data;
}

// CRUD operations

export async function authorizedGet(path: string) {
  return authorizedFetch(path);
}

export async function authorizedPost<T>(path: string, body: T) {
  return authorizedFetch(path, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function authorizedPatch<T>(path: string, body: T) {
  return authorizedFetch(path, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export async function authorizedDelete(path: string) {
  return authorizedFetch(path, {
    method: "DELETE",
  });
}
