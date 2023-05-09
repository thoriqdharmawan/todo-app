
import { useState } from "react";

import { Box, Button, Divider, IconButton, MenuItem, Select, TextField, Typography } from "@mui/material";

import Dialog from "./Dialog"

import CloseIcon from '@/assets/close-icon.svg'

interface Action {
  onClose?: () => void;
  onSubmit?: () => void;
}

interface Props extends Action {
  open: boolean;
}

interface Wrap {
  children: React.ReactNode;
  direction?: string;
  padding?: string;
}

const Wrap = (props: Wrap) => {
  const { children, direction = 'row', padding = '24px 30px' } = props

  return (
    <Box
      sx={{
        padding,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: direction
      }}
    >
      {children}
    </Box>
  )
}

const Header = ({ onClose }: Action) => {
  return (
    <Wrap>
      <Typography sx={{ fontSize: '18px', fontWeight: '600' }}>
        Tambah List Item
      </Typography>
      <IconButton onClick={onClose}>
        <img src={CloseIcon} alt="close" />
      </IconButton>
    </Wrap>
  )
}

interface ValuesState {
  name: string;
  priority: string;
}

interface Content {
  onChange: (value: string, type: string) => void;
  values: ValuesState;
}


const Content = (props: Content) => {
  const { onChange, values } = props

  return (
    <Wrap padding="36px 30px" direction="column">
      <Box width="100%" mb="26px">
        <Typography
          sx={{ fontSuze: '12px', fontWeight: '600' }}
          mb="9px"
        >
          NAMA LIST ITEM
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Tambahkan nama list item"
          size="medium"
          value={values.name}
          onChange={(e) => onChange(e.target.value, 'name')}
        />
      </Box>
      <Box width="100%" mb="26px">
        <Typography
          sx={{ fontSuze: '12px', fontWeight: '600' }}
          mb="9px"
        >
          Priority
        </Typography>
        <Select
          displayEmpty
          value={values.priority}
          placeholder="Pilih priority"
          sx={{ width: '205px' }}
          onChange={(e) => onChange(e.target.value, 'priority')}
          renderValue={(selected) => {
            if (!values.priority) {
              return (
                <Typography
                  sx={{ fontSize: '16px', fontWeight: '400', color: '#111111' }}
                >
                  Pilih priority
                </Typography>
              )
            }

            return selected
          }}
        >
          <MenuItem value="very-high">Very High</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </Select>
      </Box>
    </Wrap>
  )
}

const Footer = ({ onSubmit }: Action) => {
  return (
    <Wrap padding="16px 40px">
      <Box width="100%">
        <Button
          variant="contained"
          onClick={onSubmit}
          sx={{ display: 'block', marginLeft: 'auto' }}
        >
          Simpan
        </Button>
      </Box>
    </Wrap>
  )
}

export default (props: Props) => {
  const { open, onClose } = props
  const [values, setValues] = useState<ValuesState>({
    name: '',
    priority: ''
  })

  const handleChange = (value: string, type: string) => {
    setValues(prev => ({ ...prev, [type]: value }));
  };

  const handleSubmit = () => {
    if (onClose) {
      onClose()
    }
  }

  return (
    <Dialog open={open}>
      <Box sx={{ width: '830px' }}>
        <Header onClose={onClose} />
        <Divider sx={{ border: '1px solid #E5E5E5' }} />
        <Content values={values} onChange={handleChange} />
        <Divider sx={{ border: '1px solid #E5E5E5' }} />
        <Footer onSubmit={handleSubmit} />
      </Box>
    </Dialog>
  )
}