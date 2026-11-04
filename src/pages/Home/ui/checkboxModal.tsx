import { useTranslation } from 'react-i18next'

import { FilterItem, FilterType } from '@shared/api/types/Filter'
import useFiltersState from 'src/core/main.state'
import useModalState from 'src/core/modal.state'

import XCross from './XCross'
import Button from './button'
import CheckboxBlock from './checkboxBlock'

interface CheckboxModalProps {
	filtersData: FilterItem[]
}

const CheckboxModal = ({ filtersData }: CheckboxModalProps) => {
	const { t } = useTranslation('filter')
	const isOpen = useModalState(state => state.modals['checkbox-modal'])
	const { open, close } = useModalState()
	const reset = useFiltersState(state => state.reset)
	const toInactiveAll = useFiltersState(state => state.toInactiveAll)
	if (!isOpen) {
		return null
	}

	const handleClose = () => {
		reset()
		close('checkbox-modal')
	}

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
			onClick={handleClose}
		>
			<div
				role="dialog"
				aria-modal="true"
				aria-labelledby="filter-title"
				className="flex max-h-[90vh] w-full max-w-5xl flex-col rounded-xl bg-white shadow-xl [@media(min-height:2700px)]:max-h-none"
				onClick={e => e.stopPropagation()}
			>
				<header className="relative border-b border-gray-300 px-8 py-5">
					<h1
						id="filter-title"
						className="text-center text-3xl font-medium text-gray-700"
					>
						{t('filterModal.title')}
					</h1>
					<button
						type="button"
						aria-label={t('common.close')}
						onClick={handleClose}
						className="absolute right-8 top-1/2 -translate-y-1/2 cursor-pointer text-gray-700 hover:text-black"
					>
						<XCross size={20} />
					</button>
				</header>

				<div className="flex-1 overflow-y-auto px-8 [@media(min-height:2700px)]:overflow-visible">
					{filtersData.map(filter =>
						filter.type === FilterType.OPTION ? (
							<CheckboxBlock
								key={filter.id}
								name={filter.name}
								options={filter.options}
							/>
						) : null
					)}
				</div>

				<footer className="flex items-center justify-center gap-6 px-8 py-5">
					<Button onClick={() => open('apply-modal')}>
						<span>{t('filterModal.apply')}</span>
					</Button>
					<button
						type="button"
						onClick={() => toInactiveAll()}
						className="cursor-pointer text-lg font-medium text-teal-700 underline underline-offset-4 hover:text-teal-900"
					>
						{t('filterModal.clearAll')}
					</button>
				</footer>
			</div>
		</div>
	)
}

export default CheckboxModal
