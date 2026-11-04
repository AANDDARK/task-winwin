import { useTranslation } from 'react-i18next'

import useFiltersState from 'src/core/main.state'
import useModalState from 'src/core/modal.state'

import XCross from './XCross'
import Button from './button'

const ApplyModal = () => {
	const { t } = useTranslation('filter')
	const isOpen = useModalState(state => state.modals['apply-modal'])
	const close = useModalState(state => state.close)
	const closeAll = useModalState(state => state.closeAll)
	const apply = useFiltersState(state => state.apply)
	const reset = useFiltersState(state => state.reset)

	if (!isOpen) {
		return null
	}

	const handleApply = () => {
		apply()
		closeAll()
	}

	const handleUseOld = () => {
		reset()
		closeAll()
	}

	return (
		<div
			className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
			onClick={() => close('apply-modal')}
		>
			<div
				role="dialog"
				aria-modal="true"
				aria-labelledby="apply-title"
				className="w-full max-w-3xl rounded-xl bg-white px-8 pb-10 pt-8 shadow-xl"
				onClick={e => e.stopPropagation()}
			>
				<div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
					<span aria-hidden="true" />
					<h2
						id="apply-title"
						className="text-center text-3xl font-medium text-gray-700"
					>
						{t('applyModal.title')}
					</h2>
					<button
						type="button"
						aria-label={t('common.close')}
						onClick={() => close('apply-modal')}
						className="flex size-10 cursor-pointer items-center justify-center justify-self-end rounded-full text-gray-700 hover:bg-gray-100 hover:text-black"
					>
						<XCross size={20} />
					</button>
				</div>
				<div className="mt-16 flex flex-wrap items-center justify-center gap-6">
					<Button
						variant="outline"
						onClick={handleUseOld}
						className="h-12 w-52"
					>
						{t('applyModal.useOld')}
					</Button>
					<Button
						onClick={handleApply}
						className="h-12 w-52"
					>
						{t('applyModal.applyNew')}
					</Button>
				</div>
			</div>
		</div>
	)
}

export default ApplyModal
