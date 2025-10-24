export async function fetcher<T, B = undefined>(
  url: string,
  loaderId: string,
  options: FetchOptions<B> = {},
): Promise<ApiResponse<T>> {
  const loader = document.querySelector<HTMLDivElement>(loaderId);
  if (loader) loader.classList.add("active");

  try {
    const { method = "GET", body, headers = {} } = options;

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      return { data: null, error: `HTTP error: ${res.status}` };
    }

    const json = (await res.json()) as T;
    return { data: json, error: null };
  } catch (err) {
    console.error("Fetch error:", err);
    return { data: null, error: "Failed to fetch data" };
  } finally {
    if (loader) loader.classList.remove("active");
  }
}
