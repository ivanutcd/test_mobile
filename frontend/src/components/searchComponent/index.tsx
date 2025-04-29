import { useState } from 'react';
import { Box, InputAdornment, TextField, Paper, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { ListFilterIcon } from '@common/icon-svg/list-filter.icon.tsx';
import { SearchComponentProps } from './props';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { ToolbarButton } from '@components/toolbar-button/toolbar-button.tsx';

const SearchComponent = <T,>({
  ChildComponent,
  save,
  includeToolbar = true,
  actions = [],
}: SearchComponentProps<T>) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleKeyPress = (event: any) => {
    if (!anchorEl && event.key === 'Enter') {
      console.log('Enter pressed! Value:', inputValue);

      if (save) {
        save({ generalSearch: inputValue } as T);
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'left',
        width: '100%',
        justifyContent: 'left',
        marginBottom: '2.5%',
        height: '40px',
      }}
    >
      <TextField
        autoComplete="off"
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        onFocus={handleClose}
        sx={{
          width: '100%',
          height: '40px',
          color: '#616161',
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: '500',
          lineHeight: 'normal',
        }}
        variant="outlined"
        value={inputValue}
        placeholder="Buscar"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon
                sx={{
                  width: '18px',
                  height: '18px',
                }}
              />
            </InputAdornment>
          ),
          endAdornment: ChildComponent && (
            <InputAdornment position="end">
              <span onClick={handleClick} style={{ cursor: 'pointer' }}>
                <ListFilterIcon />
              </span>
              {anchorEl && (
                <Paper
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '100%',
                    zIndex: 2,
                    padding: '16px',
                    width: '526px',
                    borderRadius: '20px',
                    border: '1px solid var(--gris-stroke, #EFF0F8)',
                    background: 'var(--blanco, #FDFDFD)',
                  }}
                >
                  <>
                    <Stack
                      direction={'row'}
                      sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginBottom: '4.5%',
                      }}
                    >
                      <Box position="relative">
                        <IconButton
                          onClick={handleClose}
                          sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                      </Box>
                    </Stack>
                    <ChildComponent
                      open={anchorEl ?? false}
                      onClose={handleClose}
                      save={save}
                    />
                  </>
                </Paper>
              )}
            </InputAdornment>
          ),
        }}
      />

      {includeToolbar && (
        <span
          style={{
            marginLeft: '12px',
            width: '125px',
            height: '40px',
          }}
        >
          <ToolbarButton actions={actions} />
        </span>
      )}
    </Box>
  );
};

export default SearchComponent;
