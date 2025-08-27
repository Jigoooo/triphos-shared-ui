// import type { TEditCell } from '../model/table-type.ts';
// import { DatePicker } from '@/ui/date-time-picker';
//
// export function DateEditCell<TData>({
//   cellData,
//   setCellData,
//   setEditType,
//   exitEditMode,
// }: TEditCell<TData>) {
//   return (
//     <DatePicker
//       width={'100%'}
//       dateFormat={'yyyyMMdd'}
//       strategy={'fixed'}
//       value={cellData ? cellData.toString() : undefined}
//       onChange={(dateString) => {
//         setCellData(dateString);
//         setTimeout(() => {
//           exitEditMode();
//         }, 100);
//       }}
//       openListener={(isShowDatePicker) => {
//         if (isShowDatePicker) {
//           setEditType('date');
//         } else {
//           setEditType('none');
//         }
//       }}
//     />
//   );
// }
