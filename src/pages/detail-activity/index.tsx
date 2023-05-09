import { useState } from "react"

import ListItem from "@/components/ListItem"
import Section from "@/components/Section"
import DeleteConfirmation from "@/components/DeleteConfirmation"
import FormActivity from "@/components/FormActivity";

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

  const handleOpen = (type: Types, id?: number) => {
    setDialog({ open: true, id, type })
  }

  return (
    <Section onAdd={() => handleOpen(Types.ADD)}>
      {data?.map((res, idx) => (
        <ListItem
          key={idx}
          title={res.title}
          onDelete={() => handleOpen(Types.DELETE, res.id)}
          onEdit={() => handleOpen(Types.EDIT, res.id)}
        />
      ))}

      <DeleteConfirmation
        open={dialog.open && dialog.type === Types.DELETE}
        onCancel={handleClose}
        onDelete={handleClose}
      />

      <FormActivity
        open={dialog.open && dialog.type === Types.ADD}
        onClose={handleClose}
      />
    </Section>
  )
}