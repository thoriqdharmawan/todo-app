import { Box, Menu, MenuItem, Typography } from "@mui/material"

import TerbaruIcon from '@/assets/terbaru-icon.svg'
import CheckIcon from '@/assets/check-icon.svg'

interface Props {
  id: string;
  sort: string | undefined;
  open: boolean;
  onClose: () => void;
  onSort: (label: string) => void;
  anchorEl: null | HTMLElement;
}

const LIST = [
  {
    label: 'Terbaru',
    value: 'terbaru',
    icon: TerbaruIcon
  },
  {
    label: 'Terlama',
    value: 'terlama',
    icon: TerbaruIcon
  },
  {
    label: 'A-Z',
    value: 'az',
    icon: TerbaruIcon
  },
  {
    label: 'Z-A',
    value: 'za',
    icon: TerbaruIcon
  },
  {
    label: 'Belum Selesai',
    value: 'bs',
    icon: TerbaruIcon
  },
]

export default ({ open, sort, onClose, onSort, id, anchorEl }: Props) => {

  const handleSort = (value: string) => {
    onSort(value)
    onClose()
  }

  return (
    <Menu
      id={id}
      aria-labelledby={id}
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      PaperProps={{
        sx: (theme) => ({
          boxShadow: theme.bs[1],
          width: '235px',
          padding: 0
        })
      }}
    >
      {LIST.map(({ label, icon, value }, idx) => (
        <MenuItem
          key={idx}
          onClick={() => handleSort(value)}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%'
            }}
            data-cy="sort-selection"
          >
            <Box display="flex">
              <img src={icon} alt="icon" data-cy="sort-selection-icon" />
              <Typography
                sx={{ fontSize: '16px', fontWeight: '600', marginLeft: '14px' }}
                data-cy="sort-selection-title"
              >
                {label}
              </Typography>
            </Box>
            {sort === value && (
              <img src={CheckIcon} alt="icon" data-cy="sort-selection-selected" />
            )}
          </Box>
        </MenuItem>
      ))}
    </Menu>
  )
}