import { useState } from "react"
import { useParams } from "react-router-dom";
import { Types } from "@/utils/constants";
import { getter } from "@/utils/clients";

import useSWR from 'swr'

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

interface Todo {
  id: number;
  activity_group_id: number;
  is_active: number;
  priority: string;
  title: string;
}

interface DataState {
  title: string;
  created_at: string;
  id: number | undefined;
  todo_items: Todo[]
}

const DEFAULT_STATE_DIALOG: DialogState = {
  open: false,
  id: undefined,
  type: Types.ADD,
  title: ''
}

export default () => {
  const { id } = useParams();
  const DETAIL_ACTIVITY = `/activity-groups/${id}`

  const [detailActivity, setDetailActivity] = useState<DataState>({
    title: '',
    created_at: '',
    id: undefined,
    todo_items: []
  })
  const [dialog, setDialog] = useState<DialogState>(DEFAULT_STATE_DIALOG)

  const { error, mutate } = useSWR(DETAIL_ACTIVITY, getter, {
    onSuccess: (data) => setDetailActivity(data)
  })

  const handleClose = () => {
    setDialog(DEFAULT_STATE_DIALOG)
  }

  const handleOpen = (type: Types, id?: number) => {
    setDialog({ open: true, id, type, title: 'ok' })
  }

  if (error) {
    throw new Error("error");
  }

  return (
    <Section title={detailActivity.title || 'New Activity'} onAdd={() => handleOpen(Types.ADD)}>
      {detailActivity?.todo_items?.map((res: any) => (
        <ListItem
          key={res.id}
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
        onCompleted={() => mutate(DETAIL_ACTIVITY)}
        type={dialog.type}
        groupId={id}
      />
    </Section>
  )
}