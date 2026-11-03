import { FilterChooseOption } from '@/shared/api/types/Filter'

interface QueryBlockProps {
	name: string
	options: FilterChooseOption[]
}
const QueryBlock = (props: QueryBlockProps) => {
	return (
		<div>
			<h2>{props.name}</h2>
			{props.options.map(option => (
				<div key={option.id}>
					<input
						type="checkbox"
						id={option.id}
						name={option.name}
					/>
					<label htmlFor={option.id}>{option.name}</label>
				</div>
			))}
			<hr />
		</div>
	)
}
export default QueryBlock
