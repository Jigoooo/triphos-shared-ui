import { useState } from 'react';

import type { TDataWithIndex, THeader } from '@/ui/table';
import { Table, useTableData } from '@/ui/table';
import { OutlinedButton, SolidButton } from '@/ui/button';
import { FlexColumn, FlexRow, Typography } from '@/ui/view';
import { Input } from '@/ui/input';
import { dialog } from '@/ui/dialog';
import type { TValidationRuleWithHeaderId } from '@/ui/excel';
import { writeExcelFile } from '@/ui/excel';
import { MdOutlineFileDownload } from 'react-icons/md';

export function ExcelEditModal<TData extends TDataWithIndex>({
  excelNm,
  headers,
  validationRules,
  rows,
  maxWidth,
  close,
}: {
  excelNm: string;
  headers: THeader<TData>[];
  validationRules?: TValidationRuleWithHeaderId<TData>[];
  rows: TData[];
  maxWidth: number;
  close: ({ excelNm, dataList }: { excelNm: string; dataList: TData[] }) => void;
}) {
  const [name, setName] = useState(excelNm);
  const { dataList, handelDataList, deleteDataList } = useTableData<TData>(rows);

  const saveExcel = () => {
    const problematicResults = headers.flatMap((header) => {
      if (!validationRules) {
        return [];
      }

      const rule = validationRules.find((r) => r.id === header.id);
      if (!rule) {
        return [];
      }

      return dataList
        .map((data, rowIndex) => {
          const value = data[header.id as keyof TData] as string | number | null;
          const result = rule.validateFn(value);
          if (!result.isValid) {
            return {
              headerId: header.id,
              headerLabel: header.label,
              rowIndex: rowIndex + 1,
              value,
              errorMessage: result.errorMessage,
            };
          }
          return null;
        })
        .filter((item): item is NonNullable<typeof item> => item !== null);
    });

    if (problematicResults.length > 0) {
      const errorMessages = problematicResults.map(
        (result) => `${result.headerLabel} (${result.rowIndex}행): ${result.errorMessage}\n`,
      );
      dialog.info({
        title: '엑셀 유효성 검사 결과',
        contents: (
          <Typography style={{ fontSize: '0.9rem', paddingRight: 12, lineHeight: 2 }}>
            {errorMessages}
          </Typography>
        ),
        overlayClose: true,
      });
      return;
    }

    close({
      excelNm: name,
      dataList,
    });
  };

  const exportExcelFile = () => {
    function isValidKey<TData>(key: string): key is Extract<keyof TData, string> {
      return !['index', 'check', 'button'].includes(key);
    }

    const filteredHeaders = headers.filter(
      (header): header is THeader<TData> & { id: Extract<keyof TData, string> } => {
        return isValidKey<TData>(header.id);
      },
    );

    const excelHeaders = filteredHeaders.map((header) => header.label);
    const excelData = rows.map((row) =>
      filteredHeaders.map((header) => {
        const cellValue = row[header.id as keyof TData];
        return cellValue !== undefined && cellValue !== null ? cellValue.toString() : '';
      }),
    );

    writeExcelFile({
      excelFileName: name,
      sheetName: name,
      rows: [excelHeaders, ...excelData],
      rowDataType: 'array',
    });
  };

  return (
    <FlexColumn style={{ width: '100%', maxWidth, height: '100%', gap: 12 }}>
      <Table
        tableStyle={{
          showVerticalLines: true,
          tableContainerAutoWidth: true,
        }}
        tableHeaders={headers}
        tableDataList={dataList}
        handelDataList={handelDataList}
        deleteDataList={deleteDataList}
        editMode={true}
      />
      <FlexRow style={{ alignItems: 'center', justifyContent: 'flex-end', gap: 12 }}>
        <FlexRow style={{ alignItems: 'center', gap: 4 }}>
          <Typography style={{ fontSize: '0.9rem' }}>엑셀명: </Typography>
          <Input.Outlined value={name} onChange={(event) => setName(event.target.value)} />
        </FlexRow>
        <SolidButton onClick={saveExcel}>저장</SolidButton>
        <OutlinedButton
          style={{ color: '#666666', borderColor: '#333333' }}
          onClick={exportExcelFile}
        >
          <FlexRow style={{ alignItems: 'center', gap: 4 }}>
            <MdOutlineFileDownload style={{ fontSize: '1.2rem', color: '#333333' }} />
            <Typography style={{ fontSize: '0.82rem', color: '#333333' }}>Excel Export</Typography>
          </FlexRow>
        </OutlinedButton>
      </FlexRow>
    </FlexColumn>
  );
}
