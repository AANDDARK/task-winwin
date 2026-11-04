import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useQuery } from '@tanstack/react-query'
import loadData from 'src/core/loadData'
import useFiltersState from 'src/core/main.state'
import useModalState from 'src/core/modal.state'

import Button from '@pages/Home/ui/button'

import ApplyModal from './applyModal'
import CheckboxModal from './checkboxModal'

export const App = () => {
	const { t } = useTranslation('filter')
	const open = useModalState(state => state.open)
	const seed = useFiltersState(state => state.seed)

	const {
		data: filters,
		isPending,
		isError
	} = useQuery({
		queryKey: ['filters'],
		queryFn: loadData
	})

	useEffect(() => {
		if (filters) {
			seed(filters)
		}
	}, [filters, seed])

	if (isPending) {
		return <div>{t('filters.loading')}</div>
	}
	if (isError) {
		return <div>{t('filters.loadError')}</div>
	}

	return (
		<div className="flex h-dvh w-full items-center justify-center">
			<Button onClick={() => open('checkbox-modal')}>
				<span>{t('filters.clickMe')}</span>
			</Button>

			<CheckboxModal filtersData={filters} />
			<ApplyModal />
		</div>
	)
}
