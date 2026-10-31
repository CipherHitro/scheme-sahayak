import { RouterProvider } from 'react-router-dom'
import { JourneyProvider } from './app/JourneyContext'
import { router } from './app/router'

export default function App() {
  return (
    <JourneyProvider>
      <RouterProvider router={router} />
    </JourneyProvider>
  )
}
