import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ThemeMode = 'light' | 'dark'

interface ThemeState {
    mode: ThemeMode
    toggleMode: () => void
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            mode: 'light',
            toggleMode: () =>
                set((state) => ({
                    mode: state.mode === 'light' ? 'dark' : 'light',
                })),
        }),
        {
            name: 'soma-theme-storage',
        }
    )
)



