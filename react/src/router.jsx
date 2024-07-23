import {createBrowserRouter, Navigate} from 'react-router-dom'
import Welcome from './pages/public/Welcome'
import Discovery from './pages/public/Discovery'
import ExploreMap from './pages/public/ExploreMap'
import Mydataset from './pages/user/researcher/Mydataset'
import SiteList from './pages/user/researcher/SiteList'
import SampleList from './pages/user/researcher/SampleList'
import SampleDetails from './pages/user/researcher/SampleDetails'
import SampleCreate from './pages/user/researcher/SampleCreate'
import Summary from './pages/user/researcher/Summary'
import UserLayout from './pages/UserLayout'
import PublicLayout from './pages/PublicLayout'
import Login from './pages/public/Login'
import Register from './pages/public/Register'
import Swiper from './components/Swiper'
import Analysis from './pages/user/researcher/Analysis'
import Repository from './pages/user/researcher/Repository'
import RepoDetails from './pages/user/researcher/RepoDetails'
import SharedDataset from './pages/user/researcher/SharedDataset'
import SharedSite from './pages/user/researcher/SharedSite'
import SharedSample from './pages/user/researcher/SharedSample'
import SampleReview from './pages/user/researcher/SampleReview'
import ManageUsers from './pages/user/researcher/ManageUsers'
import SpeciesList from './pages/public/SpeciesList'
import SpeciesDetails from './pages/public/SpeciesDetails'
import ManageProfile from './pages/user/researcher/ManageProfile'
import ManageInfo from './pages/user/researcher/ManageInfo'
import CreateFamily from './pages/user/researcher/CreateFamily'
import EditFamily from './pages/user/researcher/EditFamily'
import CreateSpecies from './pages/user/researcher/CreateSpecies'
import EditSpecies from './pages/user/researcher/EditSpecies'


const router = createBrowserRouter([
    {
        path:'/register',
        element: <Register/>,
    },
    {
        path:'/verified/success',
        element:<Login message={true}/>
    },
    {
        path:'/verified/fail',
        element:<Login message={false}/>
    },
    {
        path:'/login',
        element:<Login message={null}/>
    },
    {
        path:'/researcher',
        element: <UserLayout/>,
        children: [
            {
                path:'/researcher/:id/sharedsample',
                element: <SharedSample/>,
            },
            {
                path:'/researcher/:id/sharedsite',
                element: <SharedSite/>,
            },
            {
                path:'/researcher/sharedataset',
                element: <SharedDataset/>,
            },
            {
                path:'/researcher/repository',
                element: <Repository/>,
            },
            {
                path:'/researcher/repository/:id',
                element: <RepoDetails/>,
            },
            {
                path:'/researcher/mydataset',
                element: <Mydataset/>,
            },
            {
                path:'/researcher/:id/sharedsitelist',
                element: <SiteList shared={true}/>,
            },
            {
                path:'/researcher/:id/sitelist',
                element: <SiteList shared={false}/>,
            },
            {
                path:'/researcher/:id/sharedsamplelist',
                element: <SampleList shared={true}/>,
            },
            {
                path:'/researcher/:id/samplelist',
                element: <SampleList shared={false}/>,
            },
            {
                path:'/researcher/:id/sharedsampledetails',
                element: <SampleDetails shared={true}/>,
            },
            {
                path:'/researcher/:id/sampledetails',
                element: <SampleDetails shared={false}/>,
            },
            {
                path:'/researcher/:id/samplecreate',
                element: <SampleCreate/>,
            },
            {
                path:'/researcher/summary',
                element: <Summary/>,
            },
            {
                path:'/researcher/analysis',
                element: <Analysis/>,
            },
            {
                path:'/researcher/samplereview',
                element: <SampleReview/>,
            },
            {
                path:'/researcher/manageuser',
                element: <ManageUsers/>,
            },
            {
                path:'/researcher/manageprofile',
                element: <ManageProfile/>,
            },
            {
                path:'/researcher/fishinfo',
                element: <ManageInfo/>,
            },
            {
                path:'/researcher/createfamily',
                element: <CreateFamily/>,
            },
            {
                path:'/researcher/updatefamily',
                element: <EditFamily/>,
            },
            {
                path:'/researcher/createspecies',
                element: <CreateSpecies/>,
            },
            {
                path:'/researcher/updatespecies',
                element: <EditSpecies/>,
            },
        ]
    },
    {
        path:'/',
        element: <PublicLayout/>,
        children: [
            {
                path:'/',
                element: <Welcome/>,
            },
            {
                path:'/discovery',
                element: <Discovery/>,
            },
            {
                path:'/discovery/:id',
                element: <SpeciesList/>,
            },
            {
                path:'/discovery/details/:id',
                element: <SpeciesDetails/>,
            },
            {
                path:'/discovery/map',
                element: <ExploreMap/>,
            },
        ]
    },
])

export default router