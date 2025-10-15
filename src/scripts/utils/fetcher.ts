interface ApiResponse<T> {
  data?: T | null;
  message?: string | null;
  error?: string | null;
}
export async function fetcher<T>(
  url: string,
  loaderId: string
): Promise<ApiResponse<T>> {
  const loader = document.querySelector<HTMLDivElement>(loaderId);
  if (loader) loader.classList.add("active");

  try {
    const res = await fetch(url);

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
