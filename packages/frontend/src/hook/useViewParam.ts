import { useSearchParams } from 'next/navigation';

export default function useViewParams() {
  const searchParams = useSearchParams();
  const viewType = searchParams.get('view') ?? 'notFound';

  return {
    viewType,
  };
}
