import { useState } from 'react';

import type { TTablePagination } from '@/ui';

export function useTablePaging<T>({
  dataList = [],
  initialPagination = { currentPage: 1, pageSize: 10 },
}: {
  dataList?: T[];
  initialPagination?: TTablePagination;
} = {}) {
  const [pagination, setPagination] = useState<TTablePagination>(initialPagination);

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const handlePageSizeChange = (pageSize: number) => {
    if (!pageSize) {
      return;
    }
    setPagination((prev) => ({ ...prev, currentPage: 1, pageSize: pageSize }));
  };

  const totalPages = Math.ceil(dataList.length / pagination.pageSize);

  const currentPageDataList = () => {
    const pageIndex = pagination.currentPage - 1;

    const start = pageIndex * pagination.pageSize;
    const end = start + pagination.pageSize;
    return dataList.slice(start, end);
  };

  return {
    pagination,
    totalPages,
    currentPageDataList: currentPageDataList(),
    handlePageChange,
    handlePageSizeChange,
  };
}
