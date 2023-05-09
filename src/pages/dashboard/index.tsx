import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Stack from "@mui/material/Stack"

import Card from "@/components/Card"
import Section from "@/components/Section"
import DeleteConfirmation from "@/components/DeleteConfirmation"

interface DialogState {
  open: boolean;
  id: number | undefined;
}

const DEFAULT_STATE_DIALOG: DialogState = {
  open: false,
  id: undefined
}

const data = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
]

export default () => {
  const navigate = useNavigate();
  const [dialog, setDialog] = useState<DialogState>(DEFAULT_STATE_DIALOG)

  const handleClose = () => {
    setDialog(DEFAULT_STATE_DIALOG)
  }

  return (
    <Section>
      <Stack direction="row" gap="26px 20px" flexWrap="wrap">
        {data.map((res, idx) => (
          <Card
            key={idx}
            onClick={() => navigate(`detail-activity/${res.id}`)}
            onDelete={() => setDialog({ open: true, id: res.id })}
          />
        ))}
      </Stack>

      <DeleteConfirmation
        open={dialog.open}
        onCancel={handleClose}
        onDelete={handleClose}
      />
    </Section>
  )
}