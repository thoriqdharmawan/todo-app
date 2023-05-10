import { API_URL } from "./global"

export const fetcher = async (url: any) => {
  return await fetch(`${API_URL}${url}`).then(res => res.json())
}
