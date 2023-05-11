import { useState } from 'react';
import { Button, Box, IconButton, Typography, Input } from '@mui/material';

import AddIcon from '@/assets/add-icon.svg'
import BackIcon from '@/assets/back-icon.svg'
import EditIcon from '@/assets/edit-icon.svg'
import SortIcon from '@/assets/sort-icon.svg'

import SortMenu from './SortMenu';

interface Props {
  title?: string;
  sort?: string;
  onAdd?: () => void;
  onBack?: () => void;
  onSort?: (value: string) => void;
  onEditTitle?: (value: string | undefined) => void;
  children: React.ReactNode;
  cytitle?: string
  cybutton?: string
  cyback?: string
  cyeditbutton?: string
  cysortbutton?: string
}

export default (props: Props) => {
  const { title, sort, onAdd, onBack, onEditTitle, onSort, children, cybutton, cytitle, cyback, cyeditbutton, cysortbutton } = props
  const [edit, setEdit] = useState<boolean>(false)
  const [value, setValue] = useState<string | undefined>('')
  const [anchorSort, setAnchorSort] = useState<null | HTMLElement>(null)

  const handleOpenEdit = () => {
    setValue(title)
    setEdit(true)
  }

  const handleEditTitle = () => {
    setEdit(false)

    if (!!onEditTitle) {
      onEditTitle(value)
    }
  }

  const handleBack = () => {
    setValue('')
    if (!!onBack) {
      onBack()
    }
  }

  const handleOpenSort = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorSort(e.currentTarget);
  }

  return (
    <section>
      <Box mb="49px" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box display="flex" alignItems="center" gap="19px">
          {!!onBack && (
            <IconButton data-cy={cyback} onClick={handleBack}>
              <img src={BackIcon} alt="back" />
            </IconButton>
          )}

          {edit ? (
            <Input
              autoFocus
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={handleEditTitle}
              sx={{ fontWeight: '700', fontSize: '36px' }}
            />
          ) : (
            <Typography
              variant="h2"
              component="h2"
              fontWeight={700}
              fontSize={36}
              data-cy={cytitle}
            >
              {value || title}
            </Typography>
          )}


          {!!onEditTitle && (
            <IconButton onClick={handleOpenEdit} data-cy={cyeditbutton}>
              <img src={EditIcon} alt="back" width="24px" height="24px" />
            </IconButton>
          )}
        </Box>

        <Box gap="18px" display="flex">
          {!!onSort && (
            <SortMenu
              id="sort"
              sort={sort}
              open={Boolean(anchorSort)}
              onClose={() => setAnchorSort(null)}
              anchorEl={anchorSort}
              onSort={onSort}
              data-cy={cysortbutton}
            >
              <IconButton
                id="sort"
                sx={{ width: "54px", height: '54px', border: '1px solid #E5E5E5' }}
                onClick={handleOpenSort}
              >
                <img src={SortIcon} alt="sort" />
              </IconButton>
            </SortMenu>
          )}

          {!!onAdd && (
            <Button
              variant="contained"
              disableElevation
              startIcon={<img src={AddIcon} alt="add" />}
              sx={{ borderRadius: "45px", fontWeight: 600 }}
              onClick={onAdd}
              data-cy={cybutton}
            >
              Tambah
            </Button>
          )}
        </Box>
      </Box>

      {children}

    </section>
  )
}