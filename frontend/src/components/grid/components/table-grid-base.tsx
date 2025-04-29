import { DataGrid } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import { DataGridProps } from '@mui/x-data-grid/models/props/DataGridProps';

import { NoRowsOverlay } from '@components/grid/components/no-rows-overlay.tsx';
import { mapColumns } from '@components/grid/utils/map-columns.tsx';
import { ColumnDef } from '@components/grid/models/column-def.tsx';

const useStyles = makeStyles({
  root: {
    '&.MuiDataGrid-root .MuiDataGrid-withBorderColor': {
      borderColor: 'transparent !important',
    },
    '&.MuiDataGrid-root': {
      '--unstable_DataGrid-radius': '20px',
      borderWidth: '0px',
    },
  },
});
interface Props extends Omit<Partial<DataGridProps>, 'rows' | 'columns'> {
  rows?: any[];
  columnDefs: ColumnDef[];
  deps?: any[];
  hideBorders?: boolean;
  rowHeight?: number;
}

export const TableGridBase = ({
  rows,
  columnDefs,
  deps = [],
  hideBorders = false,
  rowHeight,
  slots = {},
  ...otherProps
}: Props) => {
  const classes = useStyles();

  const columns = useMemo(() => {
    return mapColumns(columnDefs);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return (
    <>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rowHeight={rowHeight}
          disableColumnMenu={true}
          getRowId={x => x.id}
          disableRowSelectionOnClick={true}
          hideFooterPagination={true}
          hideFooter={true}
          className={hideBorders ? classes.root : ''}
          slots={{
            noRowsOverlay: NoRowsOverlay,
            ...slots,
          }}
          {...(otherProps ?? {})}
          rows={rows || []}
          columns={columns}
        />
      </Box>
    </>
  );
};
