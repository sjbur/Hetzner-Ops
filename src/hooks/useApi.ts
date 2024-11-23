import useSWR from 'swr'
import { client } from '@api/client'

const fetcher = (url: string) => client.get(url).then((res) => res.data)

export function useApi<T>(url: string) {
  const { data, error, isLoading, mutate } = useSWR<T>(url, fetcher)

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}
