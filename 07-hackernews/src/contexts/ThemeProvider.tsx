import { createContext, useState } from 'react'

type ThemeContextType = {
	isLightMode: boolean
	toggleTheme: () => void
}

// This creates the actual context and sets the context's initial/default value
export const ThemeContext = createContext<ThemeContextType>({
	isLightMode: false,
	toggleTheme: () => {
		// we can provide a default implemenatation that throws an error if trying to use outside of context
		throw new Error("Trying to use function toggleTheme outside of context")
	}
})

interface IProps {
	children: React.ReactNode
}

// This allows us to wrap <App /> and provide the theme to our children and grandchildren etcetera
const ThemeProvider: React.FC<IProps> = ({ children }) => {
	const [isLightMode, setIsLightMode] = useState<boolean>(false)

	const toggleTheme = () => {
		setIsLightMode(!isLightMode)
	}

	return (
		<ThemeContext.Provider value={{ isLightMode, toggleTheme }}>
			{ children }
		</ThemeContext.Provider>
	)
}

export default ThemeProvider
