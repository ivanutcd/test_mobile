import {
  DataGridProps,
  GridInputRowSelectionModel,
  GridPaginationModel,
  GridRowSelectionModel,
} from '@mui/x-data-grid';

import { PaginateResult } from '@common/hooks/models/paginate-result.ts';

import { NoRowsOverlay } from '@components/grid/components/no-rows-overlay.tsx';
import { ColumnDef } from '@components/grid/models/column-def.tsx';
import { TableGrid } from '@components/grid/table-grid.tsx';

interface Props extends Omit<Partial<DataGridProps>, 'rows'> {
  getRowId?: (row: any) => any;
  paginable?: PaginateResult<any>;
  columnDefs: ColumnDef[];
  deps?: any[];
  handleRowSelection?: (selectionModel: GridRowSelectionModel) => void;
  selectedRowId?: GridInputRowSelectionModel | undefined;
  checkboxSelection?: boolean;
  rowClassNameFn?: (row: any) => string;
}

export const PaginableGrid = ({
  getRowId,
  paginable,
  columnDefs,
  deps = [],
  handleRowSelection,
  selectedRowId,
  checkboxSelection,
  rowClassNameFn,
  slots = {},
  ...otherProps
}: Props) => {
  // const columns = useMemo(() => {
  //   return mapColumns(columnDefs);
  //
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, deps);

  const onPaginationModelChange = (model: GridPaginationModel) => {
    if (model.pageSize !== paginable?.pageSize) {
      paginable?.changeSizePage(model.pageSize);
    }
    if (model.page + 1 !== paginable?.currentPage) {
      paginable?.changePage(model.page + 1);
    }
  };

  const getRowClassName = (params: any) => {
    if (rowClassNameFn) {
      return rowClassNameFn(params.row);
    }
    return '';
  };

  return (
    <TableGrid
      deps={deps}
      slots={{
        noRowsOverlay: NoRowsOverlay,
        ...slots,
      }}
      checkboxSelection={checkboxSelection}
      onPaginationModelChange={onPaginationModelChange}
      rows={paginable?.data || []}
      rowCount={paginable?.total ?? 0}
      paginationMode={'server'}
      paginationModel={{
        page: paginable?.currentPage ? paginable?.currentPage - 1 : 0,
        pageSize: paginable?.pageSize ?? 0,
      }}
      columnDefs={columnDefs}
      hideFooterPagination={false}
      hideFooter={false}
      disableColumnMenu={true}
      pageSizeOptions={paginable?.pageSizeOptions}
      getRowId={x => {
        if (getRowId) {
          return getRowId(x);
        }
        return x.id;
      }}
      onRowSelectionModelChange={handleRowSelection}
      rowSelectionModel={selectedRowId}
      disableRowSelectionOnClick={handleRowSelection ? false : true}
      getRowClassName={getRowClassName}
      {...otherProps}
    />
  );
};
