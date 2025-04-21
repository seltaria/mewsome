import { useSearchParams, useRouter, usePathname } from 'next/navigation'

export function usePagination(defaultPage = 1) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const currentPage = Number(searchParams.get('page')) || defaultPage

  const setPage = (page: string | number) => {
    const params = new URLSearchParams(searchParams)
    console.log({page})
    params.set('page', String(page))
    router.push(`${pathname}?${params.toString()}`)
  }

  return { currentPage, setPage }
}