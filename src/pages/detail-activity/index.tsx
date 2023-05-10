import { useState } from "react"
import { Types } from "@/utils/constants";

import ListItem from "@/components/ListItem"
import Section from "@/components/Section"
import DeleteConfirmation from "@/components/DeleteConfirmation"
import FormActivity from "@/components/FormActivity";

interface DialogState {
  open: boolean;
  id: number | undefined;
  type: Types;
  title: string;
}

const DEFAULT_STATE_DIALOG: DialogState = {
  open: false,
  id: undefined,
  type: Types.ADD,
  title: ''
}

const dataTest = [
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
    setDialog({ open: true, id, type, title: 'ok' })
  }

  return (
    <Section onAdd={() => handleOpen(Types.ADD)}>
      {dataTest?.map((res, idx) => (
        <ListItem
          key={idx}
          title={res.title}
          onDelete={() => handleOpen(Types.DELETE, res.id)}
          onEdit={() => handleOpen(Types.EDIT, res.id)}
        />
      ))}

      <DeleteConfirmation
        open={dialog.open && dialog.type === Types.DELETE}
        title={dialog.title}
        type="List Item"
        onCancel={handleClose}
        onDelete={handleClose}
      />

      <FormActivity
        open={dialog.open && dialog.type !== Types.DELETE}
        onClose={handleClose}
        type={dialog.type}
      />
    </Section>
  )
}