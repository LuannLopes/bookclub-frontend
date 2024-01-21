import { unauthRoutes } from 'modules/unauthenticated/routes'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([...unauthRoutes])
