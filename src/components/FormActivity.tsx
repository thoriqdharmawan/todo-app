
import { useState } from "react";

import { Box, Button, Divider, IconButton, MenuItem, Select, TextField, Typography } from "@mui/material";
import { PRIORITY, PRIORITY_COLOR, PRIORITY_LABEL, Types } from "@/utils/constants";
import { addListItem } from "@/utils/clients";

import useSWRMutation from 'swr/mutation'

import CloseIcon from '@/assets/close-icon.svg'

import Dialog from "./Dialog"
import Dot from "./Dot";
interface Props {
  open: boolean;
  type: Types;
  onClose: () => void;
  onCompleted: () => void;
  groupId: string | number | undefined;
}

interface Wrap {
  children: React.ReactNode;
  direction?: string;
  padding?: string;
}

interface ValuesState {
  name: string;
  priority: string;
}

interface Content {
  onChange: (value: string, type: string) => void;
  values: ValuesState;
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
          sx={{ width: '205px', backgroundColor: values.priority ? 'unset' : '#E5E5E5' }}
          onChange={(e) => onChange(e.target.value, 'priority')}
          renderValue={(selected) => {
            if (!values.priority) {
              return (
                <Typography sx={{ fontSize: '16px', fontWeight: '400', color: '#111111' }}>
                  Pilih priority
                </Typography>
              )
            }

            return (
              <Box display="flex" alignItems="center">
                <Dot color={PRIORITY_COLOR[selected]} />
                <Typography sx={{ fontSize: '16px', fontWeight: '400', color: '#111111' }}>
                  {PRIORITY_LABEL[selected]}
                </Typography>
              </Box>

            )
          }}
        >
          {PRIORITY.map(({ value, label, color }) => (
            <MenuItem value={value} key={value}>
              <Dot color={color} />
              <Typography>{label}</Typography>
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Wrap>
  )
}


export default (props: Props) => {
  const { open, onClose, onCompleted, type, groupId } = props
  const [values, setValues] = useState<ValuesState>({
    name: '',
    priority: ''
  })

  const handleReset = () => setValues({ name: '', priority: '' })

  const { trigger } = useSWRMutation('/todo-items', addListItem)

  const handleChange = (value: string, type: string) => {
    setValues(prev => ({ ...prev, [type]: value }));
  };

  const handleSubmit = async () => {
    if (values.name && values.priority) {
      await trigger({...values, groupId})
      onCompleted()
      handleClose()
    }
  }

  const handleClose = () => {
    handleReset()
    onClose()
  }

  return (
    <Dialog open={open}>
      <Box sx={{ width: '830px' }}>
        <Wrap>
          <Typography sx={{ fontSize: '18px', fontWeight: '600' }}>
            {type === Types.ADD ? 'Tambah List Item' : 'Ubah List Item'}
          </Typography>
          <IconButton onClick={handleClose}>
            <img src={CloseIcon} alt="close" />
          </IconButton>
        </Wrap>

        <Divider sx={{ border: '1px solid #E5E5E5' }} />

        <Content values={values} onChange={handleChange} />
        <Divider sx={{ border: '1px solid #E5E5E5' }} />

        <Wrap padding="16px 40px">
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ display: 'block', marginLeft: 'auto' }}
            disabled={!values.name || !values.priority}
          >
            Simpan
          </Button>
        </Wrap>
      </Box>
    </Dialog>
  )
}