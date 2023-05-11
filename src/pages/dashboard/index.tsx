import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { addActivity, deleteActivity, getter } from "@/utils/clients"
import { formatDate } from "@/utils/helpers"
import { GLOBAL_EMAIL } from "@/utils/global"

import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import Stack from "@mui/material/Stack"

import Card from "@/components/Card"
import Section from "@/components/Section"
import DeleteConfirmation from "@/components/DeleteConfirmation"

import EmptyStateActivity from '@/assets/empty-state-activity.svg'
import EmptyState from "@/components/EmptyState"

interface DialogState {
  open: boolean;
  title: string;
  id: number | undefined;
}

const DEFAULT_STATE_DIALOG: DialogState = {
  open: false,
  title: '',
  id: undefined
}

const LIST_ACTIVITY = `/activity-groups?email=${GLOBAL_EMAIL}`

export default () => {
  const navigate = useNavigate();
  const [dialog, setDialog] = useState<DialogState>(DEFAULT_STATE_DIALOG)

  const { error, mutate, data } = useSWR(LIST_ACTIVITY, getter)

  const { trigger: addAct } = useSWRMutation('/activity-groups', addActivity)
  const { trigger: deleteAct } = useSWRMutation('/activity-groups', deleteActivity)

  if (error) {
    throw new Error("error");
  }

  const handleClose = () => {
    setDialog(DEFAULT_STATE_DIALOG)
  }

  const handleAddActivity = async () => {
    await addAct()
    await mutate()
  }

  const handleDelete = async () => {
    handleClose()
    await deleteAct(dialog.id)
    await mutate()
  }

  return (
    <Section title="Activity" onAdd={handleAddActivity}>
      <Stack direction="row" gap="26px 20px" flexWrap="wrap">
        {data?.data?.length === 0 && (
          <EmptyState src={EmptyStateActivity} />
        )}
        {data?.data?.map((res: any) => (
          <Card
            key={res.id}
            title={res.title}
            date={formatDate(res.created_at)}
            onClick={() => navigate(`detail-activity/${res.id}`)}
            onDelete={() => setDialog({ open: true, id: res.id, title: res.title })}
          />
        ))}
      </Stack>

      <DeleteConfirmation
        type="activity"
        open={dialog.open}
        title={dialog.title}
        onCancel={handleClose}
        onDelete={handleDelete}
      />
    </Section>
  )
}