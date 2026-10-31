import { createBrowserRouter } from 'react-router-dom'
import { WelcomePage } from '../features/welcome/WelcomePage'
import { ConsentPage } from '../features/consent/ConsentPage'
import { ProfilePage } from '../features/profile/ProfilePage'
import { ResultsPage } from '../features/results/ResultsPage'
import { SchemeDetailPage } from '../features/scheme-detail/SchemeDetailPage'
import { DocumentScanPage } from '../features/documents/DocumentScanPage'
import { ChecklistPage } from '../features/checklist/ChecklistPage'
import { HelperPage } from '../features/helper/HelperPage'
import { FamilyDetailPage } from '../features/helper/FamilyDetailPage'
import { NotFoundPage } from '../features/not-found/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <WelcomePage />,
  },
  {
    path: '/consent',
    element: <ConsentPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/results',
    element: <ResultsPage />,
  },
  {
    path: '/schemes/:schemeId',
    element: <SchemeDetailPage />,
  },
  {
    path: '/documents/:schemeId',
    element: <DocumentScanPage />,
  },
  {
    path: '/checklist/:schemeId',
    element: <ChecklistPage />,
  },
  {
    path: '/helper',
    element: <HelperPage />,
  },
  {
    path: '/helper/families/:id',
    element: <FamilyDetailPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
