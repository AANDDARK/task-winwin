interface ButtonProps {
	children: React.ReactNode
	onClick?: () => void
	variant?: 'primary' | 'outline'
	className?: string
}

const variants = {
	primary: 'bg-orange-500 hover:bg-orange-700 text-white',
	outline: 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-400'
}

const Button = ({
	children,
	onClick,
	variant = 'primary',
	className = ''
}: ButtonProps) => {
	return (
		<button
			type="button"
			className={`font-bold py-2 px-4 rounded cursor-pointer ${variants[variant]} ${className}`}
			onClick={onClick}
		>
			{children}
		</button>
	)
}
export default Button
