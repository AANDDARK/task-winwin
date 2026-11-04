import { FilterItem } from '@shared/api/types/Filter'

const loadData = async (): Promise<FilterItem[]> => {
	try {
		const { filterItems } = await import('@shared/temp/filterData.json')
		return filterItems as FilterItem[]
	} catch (e) {
		throw new Error('Cant load filterData', { cause: e })
	}
}
export default loadData
