'use client';
import { Field, FieldLabel } from '@/components/ui/field';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';

const ROWS_PER_PAGE_OPTIONS = ['10', '25', '50', '100'];
const DEFAULT_LIMIT = '25';

export function PaginationIconsOnly({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Math.max(1, Number(searchParams.get('page') || 1));
  const currentLimit = searchParams.get('limit') ?? DEFAULT_LIMIT;

  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  function onLimitChange(limit: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('limit', limit ?? currentLimit);
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  }
  //  TODO FIX pagination logic
  return (
    <div className="flex items-center justify-between gap-4">
      <Field orientation="horizontal" className="w-fit">
        <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
        <Select value={currentLimit} onValueChange={onLimitChange}>
          <SelectTrigger className="w-20" id="select-rows-per-page">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectGroup>
              {ROWS_PER_PAGE_OPTIONS.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            {hasPrevious ?
              <PaginationPrevious />
            : <PaginationPrevious
                aria-disabled="true"
                className="pointer-events-none opacity-50"
              />
            }
          </PaginationItem>
          <PaginationItem>
            {hasNext ?
              <PaginationNext href="?page=2" />
            : <PaginationNext
                aria-disabled="true"
                className="pointer-events-none opacity-50"
              />
            }
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
