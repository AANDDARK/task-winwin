import { useState } from 'react'

import ModalQuery from '@widgets/modalQuery'

import Button from '@components/button'

export const App = () => {
	const [modal, setModal] = useState(false)
	return (
		<div className="w-full h-dvh flex items-center justify-center">
			<Button
				name="Click me"
				onClick={() => setModal(!modal)}
			/>

			<div>
				<ModalQuery
					open={modal}
					onClose={() => setModal(false)}
				/>
			</div>
		</div>
	)
}
