import { create } from 'zustand'

type ModalName = 'checkbox-modal' | 'apply-modal'

interface State {
	modals: Record<ModalName, boolean>
}
interface Action {
	open(who: ModalName): void
	close(who: ModalName): void
	closeAll(): void
}
const useModalState = create<State & Action>()(set => ({
	modals: { 'checkbox-modal': false, 'apply-modal': false },

	open: who => set(state => ({ modals: { ...state.modals, [who]: true } })),
	close: who => set(state => ({ modals: { ...state.modals, [who]: false } })),
	closeAll: () =>
		set({ modals: { 'checkbox-modal': false, 'apply-modal': false } })
}))
export default useModalState
