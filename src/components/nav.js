import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {OptionBrandsComponent} from './form';

import { useParams } from "react-router-dom";
import { usePosts } from "../context/PostContext";

const Nav = () => {

    const {setPage } = usePosts();

    const navClickHandler = text => setPage(text);

    return (
        <header>
            <nav>
                <button id='all-vehicles-button' onClick={() => navClickHandler('all-vehicles')}>Tudos</button>
                <div id='exhibit-for'>
                    <span>Exibir por:</span>
                    <button onClick={( ) => navClickHandler('maker')}>Fabricante</button>
                    <button onClick={( ) => navClickHandler('last-week')}>Última semana</button>
                    <button onClick={( ) => navClickHandler('decade')}>Década de fabricação</button>
                    <button onClick={( ) => navClickHandler('not-sold')}>Não vendidos</button>
                </div>
                <button onClick={() => navClickHandler('register')} type='button' id='add-button'>+ Registrar</button>
            </nav>
        </header>
    )
}

export default Nav;