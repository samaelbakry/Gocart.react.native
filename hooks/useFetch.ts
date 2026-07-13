import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

type UseFetchProps<T> = {
  queryKey: (string | number | undefined)[];
  queryFn: () => Promise<T>;
  enabled?: boolean;
} & Omit<UseQueryOptions<T>, "queryKey" | "queryFn">;

export function useFetch<T>({ queryKey, queryFn, enabled = true, ...Options}: UseFetchProps<T>) {
  const query = useQuery({
    queryKey,
    queryFn,
    enabled,
    ...Options,
  });
  return query;
}