import { FilterItem, FilterType } from '@shared/api/types/Filter'
import { enableMapSet } from 'immer'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

enableMapSet()

interface State {
	inMemoryCheckboxState: Map<string, boolean>
	filtersCheckboxState: Map<string, boolean>
	seeded: boolean
}

interface Action {
	seed(filtersData: FilterItem[]): void
	toggle(id: string): void
	toActive(id: string): void
	toInactiveAll(): void
	active(): string[]
	inactive(): string[]
	apply(): void
	reset(): void
}

const useFiltersState = create<State & Action>()(
	immer((set, get) => ({
		filtersCheckboxState: new Map<string, boolean>(),
		inMemoryCheckboxState: new Map<string, boolean>(),
		seeded: false,

		seed: filtersData =>
			set(state => {
				if (state.seeded) {
					return
				}

				const entries: [string, boolean][] = filtersData
					.filter(filter => filter.type === FilterType.OPTION)
					.flatMap(filter =>
						filter.options.map(
							option =>
								[option.id, filter.allowAll === true] as [string, boolean]
						)
					)

				state.filtersCheckboxState = new Map(entries)
				state.inMemoryCheckboxState = new Map(entries)
				state.seeded = true
			}),

		toggle: id =>
			set(state => {
				if (!state.seeded) {
					return
				}
				state.filtersCheckboxState.set(id, !state.filtersCheckboxState.get(id))
			}),

		toInactiveAll: () =>
			set(state => {
				if (!state.seeded) {
					return
				}
				state.filtersCheckboxState.forEach((_, id) =>
					state.filtersCheckboxState.set(id, false)
				)
			}),

		active: () =>
			[...get().filtersCheckboxState]
				.filter(([, isChecked]) => isChecked)
				.map(([id]) => id),

		inactive: () =>
			[...get().filtersCheckboxState]
				.filter(([, isChecked]) => !isChecked)
				.map(([id]) => id),

		toActive: id =>
			set(state => {
				if (!state.seeded) {
					return
				}
				state.filtersCheckboxState.set(id, true)
			}),

		apply: () =>
			set(state => {
				if (!state.seeded) {
					return
				}
				state.inMemoryCheckboxState = new Map(state.filtersCheckboxState)
			}),

		reset: () =>
			set(state => {
				if (!state.seeded) {
					return
				}
				state.filtersCheckboxState = new Map(state.inMemoryCheckboxState)
			})
	}))
)

export default useFiltersState
