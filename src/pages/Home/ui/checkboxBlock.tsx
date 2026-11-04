import { memo } from 'react'

import { FilterChooseOption } from '@shared/api/types/Filter'
import useFiltersState from 'src/core/main.state'

const CHECK_ICON = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3.5 8.5l3 3 6-7'/%3E%3C/svg%3E")`

const FilterCheckboxComponent = ({
	option
}: {
	option: FilterChooseOption
}) => {
	const checked = useFiltersState(
		state => state.filtersCheckboxState.get(option.id) ?? false
	)
	const toggle = useFiltersState(state => state.toggle)

	return (
		<label
			title={option.description}
			className="flex cursor-pointer items-center gap-4 text-sm text-gray-600"
		>
			<input
				type="checkbox"
				id={option.id}
				name={option.name}
				checked={checked}
				onChange={() => toggle(option.id)}
				className="size-5 shrink-0 cursor-pointer appearance-none rounded-sm border-2 border-gray-600 bg-contain bg-center bg-no-repeat checked:border-orange-500 checked:bg-orange-500 checked:bg-[image:var(--check)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
			/>
			{option.name}
		</label>
	)
}

const FilterCheckbox = memo(FilterCheckboxComponent)

interface CheckboxBlockProps {
	name: string
	options: FilterChooseOption[]
}

const CheckboxBlock = ({ name, options }: CheckboxBlockProps) => (
	<section className="border-b border-gray-300 py-6">
		<h2 className="mb-4 text-xl text-gray-700">{name}</h2>
		<div
			className="grid grid-flow-col grid-cols-3 grid-rows-[repeat(var(--rows),auto)] gap-x-8 gap-y-3"
			style={
				{
					'--rows': Math.ceil(options.length / 3),
					'--check': CHECK_ICON
				} as React.CSSProperties
			}
		>
			{options.map(option => (
				<FilterCheckbox
					key={option.id}
					option={option}
				/>
			))}
		</div>
	</section>
)

export default CheckboxBlock
