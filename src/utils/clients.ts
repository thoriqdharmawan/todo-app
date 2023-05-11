import { API_URL, GLOBAL_EMAIL } from "./global"

export const getter = async (url: string) => {
  return await fetch(`${API_URL}${url}`).then(res => res.json())
}

export const addActivity = async (url: string) => {
  await fetch(`${API_URL}${url}`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: GLOBAL_EMAIL,
      title: 'New Activity'
    })
  })
}

export const deleteActivity = async (url: string, { arg }: { arg: number | undefined }) => {
  await fetch(`${API_URL}${url}/${arg}`, {
    method: 'DELETE',
    headers: { "Content-Type": "application/json" },
  })
}

interface FormField {
  name: string;
  priority: string;
}

interface ArgAddListItem extends FormField {
  groupId: string | number | undefined;
}

interface ArgUpdateListItem extends FormField {
  id: string | number | undefined;
}

export const addListItem = async (url: string, { arg }: { arg: ArgAddListItem }) => {
  const { groupId, name, priority } = arg

  await fetch(`${API_URL}${url}`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      activity_group_id: groupId,
      is_active: 1,
      priority: priority,
      title: name,
    })
  })
}

export const updateListItem = async (url: string, { arg }: { arg: ArgUpdateListItem }) => {
  const { id, name, priority } = arg

  await fetch(`${API_URL}${url}/${id}`, {
    method: 'PATCH',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      priority: priority,
      title: name,
    })
  })
}

export const updateTitleGroup = async (url: string, { arg }: { arg: { id: string | number | undefined; title: string } }) => {
  const { id, title } = arg

  await fetch(`${API_URL}${url}/${id}`, {
    method: 'PATCH',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  })
}