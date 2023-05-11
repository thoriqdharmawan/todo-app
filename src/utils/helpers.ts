export const formatDate = (date: Date) => new Date(date).toLocaleDateString("id-ID", { year: 'numeric', month: 'long', day: 'numeric' })

interface DataItem {
  id: number;
  title: string;
  activity_group_id: number;
  is_active: number;
  priority: string;
}

type SortingType = 'terbaru' | 'terlama' | 'az' | 'za' | 'bs' | string | undefined;

export const sortItem = (data: DataItem[], sortingType: SortingType): DataItem[] => {
  switch (sortingType) {
    case 'terbaru':
      return data.sort((a, b) => b.id - a.id);
    case 'terlama':
      return data.sort((a, b) => a.id - b.id);
    case 'az':
      return data.sort((a, b) => a.title.localeCompare(b.title));
    case 'za':
      return data.sort((a, b) => b.title.localeCompare(a.title));
    case 'bs':
      return data.filter(item => item.is_active === 1)
        .concat(data.filter(item => item.is_active === 0));
    default:
      return data;
  }
}