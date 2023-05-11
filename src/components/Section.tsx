import { useState } from 'react';
import { Button, Box, IconButton, Typography, Input } from '@mui/material';

import AddIcon from '@/assets/add-icon.svg'
import BackIcon from '@/assets/back-icon.svg'
import EditIcon from '@/assets/edit-icon.svg'

interface Props {
  title?: string;
  onAdd?: () => void;
  onBack?: () => void;
  onEditTitle?: (value: string | undefined) => void;
  children: React.ReactNode
}

export default (props: Props) => {
  const { title, onAdd, onBack, onEditTitle, children } = props
  const [edit, setEdit] = useState<boolean>(false)
  const [value, setValue] = useState<string | undefined>('')

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

  return (
    <section>
      <Box mb="49px" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box display="flex" alignItems="center" gap="19px">
          {!!onBack && (
            <IconButton onClick={handleBack}>
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
            <Typography variant="h2" component="h2" fontWeight={700} fontSize={36}>
              {value || title}
            </Typography>
          )}


          {!!onEditTitle && (
            <IconButton onClick={handleOpenEdit}>
              <img src={EditIcon} alt="back" width="24px" height="24px" />
            </IconButton>
          )}
        </Box>

        {!!onAdd && (
          <Button
            variant="contained"
            disableElevation
            startIcon={<img src={AddIcon} alt="add" />}
            sx={{ borderRadius: "45px", fontWeight: 600 }}
            onClick={onAdd}
          >
            Tambah
          </Button>
        )}
      </Box>

      {children}

    </section>
  )
}