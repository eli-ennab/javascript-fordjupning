import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { BrowserRouter} from 'react-router-dom'
import App from './App.tsx'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			// staleTime: 5 * 60 * 1000, // 5 minutes
			// staleTime: 15 * 1000, // 15 seconds
			staleTime: 1000 * 60 * 15, // 15 minutes
			cacheTime: 1000 * 60 * 60, // 1 hour
		}
	}
})

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</QueryClientProvider>
	</React.StrictMode>,
)
