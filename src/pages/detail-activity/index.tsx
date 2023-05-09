import { useState } from "react"

import ListItem from "@/components/ListItem"
import Section from "@/components/Section"
import Dialog from "@/components/Dialog";
import DeleteConfirmation from "@/components/DeleteConfirmation"

enum Types {
  ADD,
  EDIT,
  DELETE
}

interface DialogState {
  open: boolean;
  id: number | undefined;
  type: Types | undefined;
}

const DEFAULT_STATE_DIALOG: DialogState = {
  open: false,
  id: undefined,
  type: undefined
}

const data = [
  {
    id: 1,
    title: 'Telur Ayam',
  },
  {
    id: 2,
    title: 'Beras 5 kg',
  },
  {
    id: 3,
    title: 'Daging',
  },
  {
    id: 4,
    title: 'Penyedap rasa',
  },
]

export default () => {
  const [dialog, setDialog] = useState<DialogState>(DEFAULT_STATE_DIALOG)

  const handleClose = () => {
    setDialog(DEFAULT_STATE_DIALOG)
  }

  const handleOpen = (id: number, type: Types) => {
    setDialog({ open: true, id, type })
  }

  return (
    <Section>
      {data?.map((res, idx) => (
        <ListItem
          key={idx}
          title={res.title}
          onDelete={() => handleOpen(res.id, Types.DELETE)}
          onEdit={() => handleOpen(res.id, Types.EDIT)}
        />
      ))}

      <Dialog open={dialog.open && dialog.type === Types.DELETE}>
        <DeleteConfirmation
          onCancel={handleClose}
          onDelete={handleClose}
        />
      </Dialog>
    </Section>
  )
}