import { useState } from "react"
import { useParams } from "react-router-dom";
import { PRIORITY_COLOR, Types } from "@/utils/constants";
import { addListItem, deleteActivity, getter, updateListItem } from "@/utils/clients";

import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

import ListItem from "@/components/ListItem"
import Section from "@/components/Section"
import DeleteConfirmation from "@/components/DeleteConfirmation"
import FormActivity from "@/components/FormActivity";

interface OpenAciton {
  type: Types,
  id?: number,
  title?: string
  priority?: string
}

interface DialogState extends OpenAciton {
  open: boolean;
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
  title: '',
  priority: ''
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

  const { trigger: addItem } = useSWRMutation('/todo-items', addListItem)
  const { trigger: updateItem } = useSWRMutation('/todo-items', updateListItem)
  const { trigger: deleteListItem } = useSWRMutation('/todo-items', deleteActivity)

  const handleClose = () => {
    setDialog(DEFAULT_STATE_DIALOG)
  }

  const handleOpen = ({ type, id, title, priority }: OpenAciton) => {
    setDialog({ open: true, id, type, title: title || '', priority: priority || '' })
  }

  if (error) {
    throw new Error("error");
  }

  const handleDelete = async () => {
    await deleteListItem(dialog.id)
    handleClose()
    await mutate(DETAIL_ACTIVITY)
  }

  const handleSubmit = async (values: {
    name: string;
    priority: string;
  }) => {
    handleClose()
    if (dialog.type === Types.ADD) {
      await addItem({ ...values, groupId: id })
    } else {
      await updateItem({ ...values, id: dialog.id })
    }
    await mutate(DETAIL_ACTIVITY)
  }

  return (
    <Section title={detailActivity.title || 'New Activity'} onAdd={() => handleOpen({ type: Types.ADD })}>
      {detailActivity?.todo_items?.map((res: any) => (
        <ListItem
          key={res.id}
          title={res.title}
          dotcolor={PRIORITY_COLOR[res.priority]}
          onDelete={() => handleOpen({ type: Types.DELETE, id: res.id, title: res.title })}
          onEdit={() => handleOpen({ type: Types.EDIT, id: res.id, title: res.title, priority: res.priority })}
        />
      ))}

      <DeleteConfirmation
        open={dialog.open && dialog.type === Types.DELETE}
        title={dialog.title}
        type="List Item"
        onCancel={handleClose}
        onDelete={handleDelete}
      />

      <FormActivity
        open={dialog.open && dialog.type !== Types.DELETE}
        onClose={handleClose}
        onSubmit={handleSubmit}
        type={dialog.type}
        groupId={id}
        priority={dialog.priority}
        name={dialog.title}
      />
    </Section>
  )
}