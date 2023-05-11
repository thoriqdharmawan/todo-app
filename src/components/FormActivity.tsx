
import { useEffect, useState } from "react";

import { Box, Button, Divider, IconButton, MenuItem, Select, TextField, Typography } from "@mui/material";
import { PRIORITY, PRIORITY_COLOR, PRIORITY_LABEL, Types } from "@/utils/constants";

import CloseIcon from '@/assets/close-icon.svg'

import Dialog from "./Dialog"
import Dot from "./Dot";

interface Cypres {
  cylabelname?: string;
  cylabelpriority?: string;
  cyformname?: string;
  cyformpriority?: string;
  cyitemdropwdown?: string;
}

interface ValuesState {
  name: string;
  priority: string;
}

interface Props extends Cypres, Partial<ValuesState> {
  open: boolean;
  type: Types;
  onClose: () => void;
  onSubmit: (values: ValuesState) => void;
  groupId: string | number | undefined;
  cytitle?: string;
  cyclose?: string;
  cysave?: string;
}

interface Wrap {
  children: React.ReactNode;
  direction?: string;
  padding?: string;
}

interface Content extends Cypres {
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
  const { onChange, values, cylabelname, cylabelpriority, cyformname, cyformpriority, cyitemdropwdown } = props

  return (
    <Wrap padding="36px 30px" direction="column">
      <Box width="100%" mb="26px">
        <Typography
          sx={{ fontSuze: '12px', fontWeight: '600' }}
          mb="9px"
          data-cy={cylabelname}
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
          data-cy={cyformname}
        />
      </Box>
      <Box width="100%" mb="26px">
        <Typography
          sx={{ fontSuze: '12px', fontWeight: '600' }}
          mb="9px"
          data-cy={cylabelpriority}
        >
          Priority
        </Typography>
        <Select
          displayEmpty
          value={values.priority}
          placeholder="Pilih priority"
          sx={{ width: '205px', backgroundColor: values.priority ? 'unset' : '#E5E5E5' }}
          onChange={(e) => onChange(e.target.value, 'priority')}
          data-cy={cyformpriority}
          renderValue={(selected) => {
            if (!values.priority) {
              return (
                <Typography data-cy={cyitemdropwdown} sx={{ fontSize: '16px', fontWeight: '400', color: '#111111' }}>
                  Pilih priority
                </Typography>
              )
            }

            return (
              <Box data-cy={cyitemdropwdown} display="flex" alignItems="center">
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
  const { open, type, onClose, onSubmit, priority, name } = props
  const { cylabelname, cylabelpriority, cyformname, cyformpriority, cytitle, cyclose, cysave } = props
  const [values, setValues] = useState<ValuesState>({
    name: '',
    priority: ''
  })

  useEffect(() => {
    if (type === Types.EDIT) {
      setValues({
        name: name || '',
        priority: priority || ''
      })
    }
  }, [type])

  const handleReset = () => setValues({ name: '', priority: '' })

  const handleChange = (value: string, valuetype: string) => {
    setValues(prev => ({ ...prev, [valuetype]: value }));
  };

  const handleSubmit = () => {
    if (values.name && values.priority) {
      onSubmit(values)
      handleReset()
    }
  }

  const handleClose = () => {
    handleReset()
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box sx={{ width: '830px' }}>
        <Wrap>
          <Typography data-cy={cytitle} sx={{ fontSize: '18px', fontWeight: '600' }}>
            {type === Types.ADD ? 'Tambah List Item' : 'Ubah List Item'}
          </Typography>
          <IconButton data-cy={cyclose} onClick={handleClose}>
            <img src={CloseIcon} alt="close" />
          </IconButton>
        </Wrap>

        <Divider sx={{ border: '1px solid #E5E5E5' }} />

        <Content
          values={values}
          onChange={handleChange}
          cylabelname={cylabelname}
          cylabelpriority={cylabelpriority}
          cyformname={cyformname}
          cyformpriority={cyformpriority}

        />
        <Divider sx={{ border: '1px solid #E5E5E5' }} />

        <Wrap padding="16px 40px">
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ display: 'block', marginLeft: 'auto' }}
            disabled={!values.name || !values.priority}
            data-cy={cysave}
          >
            Simpan
          </Button>
        </Wrap>
      </Box>
    </Dialog>
  )
}