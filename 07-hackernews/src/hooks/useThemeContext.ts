import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContextProvider'

export const useThemeContext = () => {
	return useContext(ThemeContext)
}

export default useThemeContext
