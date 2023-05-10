import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { fetcher } from "@/utils/clients"

import useSWR from 'swr'
import Stack from "@mui/material/Stack"

import Card from "@/components/Card"
import Section from "@/components/Section"
import DeleteConfirmation from "@/components/DeleteConfirmation"
import { formatDate } from "@/utils/helpers"

interface DialogState {
  open: boolean;
  id: number | undefined;
}

const DEFAULT_STATE_DIALOG: DialogState = {
  open: false,
  id: undefined
}

export default () => {
  const navigate = useNavigate();
  const [dialog, setDialog] = useState<DialogState>(DEFAULT_STATE_DIALOG)

  const handleClose = () => {
    setDialog(DEFAULT_STATE_DIALOG)
  }

  const { data, error, isLoading } = useSWR('/activity-groups?email=test@email.com', fetcher)

  console.log({ data, error, isLoading })

  if (error) {
    throw new Error("error");
  }

  return (
    <Section>
      <Stack direction="row" gap="26px 20px" flexWrap="wrap">
        {data?.data.map((res: any) => (
          <Card
            key={res.id}
            title={res.title}
            date={formatDate(res.created_at)}
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