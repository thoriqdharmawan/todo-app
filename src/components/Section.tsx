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
}

export default (props: Props) => {
  const { title, sort, onAdd, onBack, onEditTitle, onSort, children, cybutton, cytitle, cyback, cyeditbutton } = props
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
      <Box
        sx={(theme) => ({
          p: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: "49px",
          [theme.breakpoints.down("md")]: {
            p: "0px 38px",
          },
        })}
      >
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
              sx={(theme) => ({
                fontWeight: '700',
                fontSize: '36px',
                [theme.breakpoints.down("md")]: {
                  fontSize: '18px',
                },
              })}
            />
          ) : (
            <Typography
              variant="h2"
              component="h2"
              sx={(theme) => ({
                fontWeight: '700',
                fontSize: '36px',
                [theme.breakpoints.down("md")]: {
                  fontSize: '18px',
                },
              })}
              data-cy={cytitle}
              onClick={!!onEditTitle ? handleOpenEdit : undefined}
            >
              {value || title}
            </Typography>
          )}


          {!!onEditTitle && (
            <IconButton
              onClick={handleOpenEdit}
              data-cy={cyeditbutton}
              sx={{
                "& img": {
                  width: "24px",
                  height: "24px",
                }
              }}>
              <img src={EditIcon} alt="back" />
            </IconButton>
          )}
        </Box>

        <Box sx={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
          {!!onSort && (
            <Box
              id="todo-sort-button"
              data-cy="todo-sort-button"
              onClick={handleOpenSort}
              sx={{
                width: "54px",
                height: '54px',
                border: '1px solid #E5E5E5',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <img src={SortIcon} alt="sort" />
            </Box>
          )}

          <span data-cy={cybutton} onClick={onAdd}>
            <Button
              variant="contained"
              disableElevation
              startIcon={<img src={AddIcon} alt="add" />}
              sx={{
                borderRadius: "45px",
                fontWeight: 600
              }}
            >
              Tambah
            </Button>
          </span>
        </Box>
      </Box>

      <Box
        sx={(theme) => ({
          p: 0,
          [theme.breakpoints.down("md")]: {
            p: "0px 38px",
          },
        })}
      >
        {children}
      </Box>

      {!!onSort && (
        <SortMenu
          id="todo-sort-button"
          sort={sort}
          open={Boolean(anchorSort)}
          onClose={() => setAnchorSort(null)}
          anchorEl={anchorSort}
          onSort={onSort}
        />
      )}
    </section>
  )
}