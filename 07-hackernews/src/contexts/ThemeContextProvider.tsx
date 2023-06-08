import { createContext, useState } from 'react'

type ThemeContextType = "light" | "dark"

// This creates the actual context and sets the context's initial/default value
export const ThemeContext = createContext<ThemeContextType>("dark")

interface IProps {
	children: React.ReactNode
}

// This allows us to wrap <App /> and provide the theme to our children and grandchildren etcetera
const ThemeContextProvider: React.FC<IProps> = ({ children }) => {
	const [theme, setTheme] = useState<ThemeContextType>("dark")

	return (
		<ThemeContext.Provider value={theme}>
			{ children }
		</ThemeContext.Provider>
	)
}

export default ThemeContextProvider
