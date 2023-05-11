import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { PRIORITY_COLOR, Types } from "@/utils/constants";
import { addListItem, deleteActivity, getter, updateListItem, updateStatusItem, updateTitleGroup } from "@/utils/clients";
import { sortItem } from "@/utils/helpers";

import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

import ListItem from "@/components/ListItem"
import Section from "@/components/Section"
import DeleteConfirmation from "@/components/DeleteConfirmation"
import FormActivity from "@/components/FormActivity";
import EmptyState from "@/components/EmptyState";

import EmptyStateTodo from '@/assets/empty-state-todo.svg'

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

const DEFAULT_STATE_DIALOG: DialogState = {
  open: false,
  id: undefined,
  type: Types.ADD,
  title: '',
  priority: ''
}

export default () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dialog, setDialog] = useState<DialogState>(DEFAULT_STATE_DIALOG)
  const [sort, setSort] = useState<string | undefined>('terbaru')

  const { data, error, mutate } = useSWR(`/activity-groups/${id}`, getter)

  const { trigger: addItem } = useSWRMutation('/todo-items', addListItem)
  const { trigger: updateItem } = useSWRMutation('/todo-items', updateListItem)
  const { trigger: updateTitle } = useSWRMutation('/activity-groups', updateTitleGroup)
  const { trigger: updateStatus } = useSWRMutation('/todo-items', updateStatusItem)
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
    await mutate()
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
    await mutate()
  }

  const handleEditTitle = (title: string = '') => {
    updateTitle({ title, id })
  }

  const handleChangeStatus = async (checked: boolean, id: number) => {
    await updateStatus({ is_active: !checked, id })
    await mutate()
  }

  return (
    <Section
      title={data?.title}
      onBack={() => navigate('/')}
      onAdd={() => handleOpen({ type: Types.ADD })}
      onEditTitle={handleEditTitle}
      onSort={setSort}
      sort={sort}
      cytitle="todo-title"
    >
      {data?.todo_items?.length === 0 && (
        <EmptyState src={EmptyStateTodo} onAdd={() => handleOpen({ type: Types.ADD })} />
      )}

      {sortItem(data?.todo_items || [], sort)?.map((res: Todo) => (
        <ListItem
          key={res.id}
          title={res.title}
          active={res.is_active}
          dotcolor={PRIORITY_COLOR[res.priority]}
          onChageStatus={(checked: boolean) => handleChangeStatus(checked, res.id)}
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