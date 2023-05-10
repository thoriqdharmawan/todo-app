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