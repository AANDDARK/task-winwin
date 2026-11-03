import { FilterItem } from '@shared/api/types/Filter'
import filterData from '@shared/temp/filterData.json'

import QueryBlock from '@components/queryBlock'

const data: FilterItem[] = filterData.filterItems

interface ModalQueryProps {
	open: boolean
	onClose: () => void
}

const ModalQuery = ({ open, onClose }: ModalQueryProps) => {
	if (!open) {
		return null
	}

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
			onClick={onClose}
		>
			<div
				role="dialog"
				aria-modal="true"
				className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
				onClick={e => e.stopPropagation()}
			>
				{data.map(filter => (
					<QueryBlock
						key={filter.id}
						name={filter.name}
						options={filter.options}
					/>
				))}
			</div>
		</div>
	)
}

export default ModalQuery
