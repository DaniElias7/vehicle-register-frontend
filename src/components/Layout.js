import {useEffect} from 'react'
import { usePosts } from '../context/PostContext';

import Nav from './nav';
import Vehicles from './vehicles';
import MakersAndDecadesUI from './filters';

import '../App.css';
import UpdateCar from './updateCar';
import AddCarForm from './form';

const Layout = () => {
    const { page } = usePosts();

    return (
        <div className='layout-container'>  
            <Nav />
                {
                    page == 'all-vehicles' ? <Vehicles /> : 
                    page == 'maker' ? <MakersAndDecadesUI /> :
                    page == 'last-week' ? <Vehicles /> :
                    page == 'decade' ? <MakersAndDecadesUI /> : 
                    page == 'not-sold' ? <Vehicles /> :
                    page == 'register' ? <AddCarForm /> :
                    page == 'update' ? <UpdateCar/>:
                    ''
                }
        </div>
    )
}

export default Layout;