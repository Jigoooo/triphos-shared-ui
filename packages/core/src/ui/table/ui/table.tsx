import { useElementSize } from 'hooks';
import { type JSX, type RefObject, useEffect, useRef, useState } from 'react';

import { TableBody } from './table-body.tsx';
import { TableHeader } from './table-header.tsx';
import { TableContext } from '../model/table-context.ts';
import {
  type THeaderGroup,
  type THeader,
  type TTableContext,
  type TTableStyle,
  type TDataWithIndex,
} from '../model/table-type.ts';
import { useTableChecked } from '../model/use-table-checked.ts';
import { useTableSorting } from '../model/use-table-sorting.ts';
import { FlexRow } from '@/ui/layout';
import { Typography } from '@/ui/typography';

/*
 * - 하단 페이징
 *    체크박스 페이징 시 초기화
 *    기타 상태도 초기화
 * - flex 레이아웃
 * --------------------------------
 * - 컬럼 수정
 * - 컬럼 숨기고 보이기
 * - 컬럼이동
 * - 로우이동
 * - 가로스크롤 속도 최적화
 * */

const defaultTableStyle: TTableStyle = {
  tableContainerAutoWidth: false,
  showVerticalLines: false,
  tableResizeColor: '#bbbbbb',
  tableBorderColor: '#bdc3c7',
  tableBorder: '1px solid #bdc3c7',
  tableFixedBorder: '1.6px solid #bdc3c7',
  tableBorderRadius: 4,
  tableHeaderHeight: 36,
  tableBodyHeight: 38,
  tableHeaderBackgroundColor: '#efefef',
  tableBodyBackgroundColor: '#ffffff',
  tableBodyOddBackgroundColor: '#f9f9f9',
  tableHeaderColor: 'rgba(0, 0, 0, 0.7)',
  tableBodyColor: 'rgba(0, 0, 0, 1)',
  tableFooterHeight: 40,
  tableBodyHoverBackgroundColor: '#eaeaea',
};

export function Table<TData extends TDataWithIndex & Record<string, any>>({
  tableHeaderGroups = [],
  tableHeaders,
  tableDataList,
  handelDataList,
  deleteDataList,
  handleSyncCheckList,
  tableStyle = {},
  dataKey = 'index',
  editMode = false,
  filterRowEnabled = true,
  tableRowClick,
}: {
  tableHeaderGroups?: THeaderGroup<TData>[];
  tableHeaders: THeader<TData>[];
  tableDataList: TData[];
  handelDataList: (dataIndex: number, key: string, value: any) => void;
  deleteDataList: (dataIndex: number) => void;
  handleSyncCheckList?: (checkedList: string[]) => void;
  tableStyle?: Partial<TTableStyle>;
  dataKey?: keyof TData;
  editMode?: boolean;
  filterRowEnabled?: boolean;
  tableRowClick?: (data: TData) => void;
}) {
  const applyTableStyle = {
    ...defaultTableStyle,
    ...tableStyle,
  };
  const tableRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyXRef = useRef<HTMLDivElement>(null);
  const bodyYRef = useRef<HTMLDivElement>(null);

  useSyncScroll(tableDataList, headerRef, bodyXRef);

  const tableSize = useElementSize(tableRef);

  const [headers, setHeaders] = useState<THeader<TData>[]>(tableHeaders);
  const onChangeFilterValue = (headerId: string, value: string) => {
    setHeaders((prevState) => {
      return prevState.map((header) => {
        if (header.id === headerId) {
          return {
            ...header,
            filter: {
              ...header.filter,
              filterValue: value,
            },
          };
        }
        return header;
      }) as THeader[];
    });
  };

  const { checkList, isChecked, handleCheck, handleCheckAll, checkedState } = useTableChecked({
    dataList: tableDataList,
    dataKey,
  });

  useEffect(() => {
    handleSyncCheckList?.(checkList);
  }, [checkList, handleSyncCheckList]);

  const [verticalScrollWidth, setVerticalScrollWidth] = useState(0);
  useEffect(() => {
    const element = bodyYRef.current;
    if (!element) return;

    const checkScroll = () => {
      if (element.scrollHeight > element.clientHeight) {
        setVerticalScrollWidth(14);
      } else {
        setVerticalScrollWidth(0);
      }
    };

    checkScroll();

    const resizeObserver = new ResizeObserver(() => {
      checkScroll();
    });
    resizeObserver.observe(element);

    element.addEventListener('scroll', checkScroll);

    return () => {
      resizeObserver.disconnect();
      element.removeEventListener('scroll', checkScroll);
    };
  }, [bodyYRef]);

  const totalWidth = headers.reduce((acc, cur) => acc + (cur?.width ?? 0), 0) + verticalScrollWidth;
  const leftPinWidth = headers
    .filter((header) => header.pin === 'left')
    .reduce((acc, cur) => acc + (cur?.width ?? 0), 0);
  const rightPinWidth = headers
    .filter((header) => header.pin === 'right')
    .reduce((acc, cur) => acc + (cur?.width ?? 0), 0);

  const viewportWidth =
    tableSize.width - leftPinWidth - rightPinWidth + (verticalScrollWidth === 0 ? 2 : 2);

  const headerHeight =
    applyTableStyle.tableHeaderHeight *
    (filterRowEnabled && tableHeaderGroups.length > 0
      ? 3
      : filterRowEnabled || tableHeaderGroups.length > 0
        ? 2
        : 1);

  let bodyMaxHeight = tableSize.height - headerHeight - applyTableStyle.tableFooterHeight;

  if (bodyMaxHeight < 0) {
    bodyMaxHeight = 0;
  }

  const filteredDataList = filterRowEnabled
    ? tableDataList.filter((data) => {
        return headers.every((header) => {
          const filterValue = header.filter?.filterValue || '';

          if (filterValue === '') return true;
          const cellValue = String(data[header.id]).toLowerCase();
          return cellValue.includes(filterValue.toLowerCase());
        });
      })
    : tableDataList;

  const { sortedHeaders, sortedDataList, handleSort } = useTableSorting({
    headers,
    dataList: filteredDataList,
  });

  const cacheCellRef = useRef<Map<string, { data: any; element: JSX.Element }>>(new Map());

  const tableContextValue: TTableContext<TData> = {
    cacheCellRef,
    tableStyle: applyTableStyle,
    bodyYRef,
    viewportWidth,
    bodyMaxHeight,
    headerHeight,
    verticalScrollWidth,
    headerGroups: tableHeaderGroups,
    headers,
    sortedHeaders,
    dataList: sortedDataList,
    handelDataList,
    deleteDataList,
    editMode,
    filterRowEnabled,
    onChangeFilterValue,
    isChecked,
    checkedState,
    handleCheckAll,
    handleCheck,
    handleSort,
    tableRowClick,
  };

  return (
    <TableContext value={tableContextValue}>
      <div
        ref={tableRef}
        className={'table-root selection-none'}
        style={{
          ...{
            position: 'relative',
            height: '100%',
            width: '100%',
            maxWidth: applyTableStyle.tableContainerAutoWidth ? '100%' : totalWidth,
            border: applyTableStyle.tableBorder,
            borderRadius: applyTableStyle.tableBorderRadius,
            overflow: 'hidden',
          },
        }}
      >
        <TableHeader ref={headerRef} />

        <TableBody bodyXRef={bodyXRef} />

        <FlexRow
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: applyTableStyle.tableFooterHeight,
            backgroundColor: '#ffffff',
            borderTop: applyTableStyle.tableBorder,
            alignItems: 'center',
            paddingLeft: 12,
          }}
        >
          <Typography style={{ fontSize: '0.86rem', color: '#999999' }}>
            Rows:{' '}
            {filteredDataList.length !== tableDataList.length && (
              <>
                <Typography style={{ color: '#000000' }}>{filteredDataList.length}</Typography>
                &nbsp;
                <Typography style={{ color: '#000000' }}>of</Typography>
                &nbsp;
              </>
            )}
            <Typography style={{ fontSize: '0.86rem', color: '#000000' }}>
              {tableDataList.length}
            </Typography>
          </Typography>
        </FlexRow>
      </div>
    </TableContext>
  );
}

function useSyncScroll<TData>(
  tableDataList: TData[],
  headerRef: RefObject<HTMLDivElement | null>,
  bodyRef: RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    if (tableDataList.length > 0) {
      if (headerRef.current) {
        headerRef.current.scrollLeft = 0;
      }
      if (bodyRef.current) {
        bodyRef.current.scrollLeft = 0;
      }
    }
  }, [bodyRef, headerRef, tableDataList.length]);

  useEffect(() => {
    const headerEl = headerRef.current;
    const bodyEl = bodyRef.current;
    if (!headerEl || !bodyEl) return;

    const onBodyScroll = () => {
      headerEl.scrollLeft = bodyEl.scrollLeft;
    };

    const onHeaderScroll = () => {
      bodyEl.scrollLeft = headerEl.scrollLeft;
    };

    bodyEl.addEventListener('scroll', onBodyScroll);
    headerEl.addEventListener('scroll', onHeaderScroll);

    return () => {
      bodyEl.removeEventListener('scroll', onBodyScroll);
      headerEl.removeEventListener('scroll', onHeaderScroll);
    };
  }, [headerRef, bodyRef]);
}
