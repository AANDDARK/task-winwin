interface ButtonProps {
	name: string
	onClick?: () => void
}
const Button = ({ name, onClick }: ButtonProps) => {
	return (
		<button
			className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
			onClick={onClick}
		>
			{name}
		</button>
	)
}
export default Button
