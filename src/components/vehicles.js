import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import { usePosts } from "../context/PostContext"; 
import { useNavigate } from "react-router-dom";

import { lastWeekFilter, notSoldFilter } from "./filters";


const Vehicles = () => {
    const {getPosts, posts, page, setPage, deletePosts, setCurrentCarId } = usePosts(); 
    const navigate = useNavigate();


    useEffect( () => {
        getPosts()
    }, [])   

    const updateHandle = (id) => {
        setCurrentCarId(id);
        setPage('update');
    }

    const deleteCarHandler = async id => {
        await deletePosts(id);
        toast.success('Carro excluido!');
    }
    let datalist = page == 'last-week' ? lastWeekFilter(posts) : 
                   page == 'not-sold' ? notSoldFilter(posts) : 
                   posts;

    return (
        <div>
             <div id='vehicles-main'>
                <header>
                    <h1>Veiculos</h1>
                </header>
                { datalist.length == 0 ? <h1 id='no-cars-message'>Não temos carros registrados no momento</h1>: <div id='cars'>
                    <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">Veiculo</th>
                        <th scope="col">Marca</th>
                        <th scope="col">Ano</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Vendido</th>
                        <th scope="col">Created</th>
                        <th scope="col">Updated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            
                            datalist.map( car=> {
                                return <tr key={car._id}>
                                    <td>{car.veiculo}</td>
                                    <td>{car.marca}</td>
                                    <td>{car.ano}</td>
                                    <td>{car.descricao}</td>
                                    <td>{car.vendido == false ? 'Não' : 'Sim'}</td>
                                    <td>{new Date(car.createdAt).getDate()}/{new Date(car.createdAt).getMonth()}/{new Date(car.createdAt).getFullYear()}</td>
                                    <td>{new Date(car.updatedAt).getDate()}/{new Date(car.updatedAt).getMonth()}/{new Date(car.updatedAt).getFullYear()}</td>
                                    <td className="update-delete-buttons">
                                        <button className='table-button update-button' onClick={() => {updateHandle(car._id)}}>Atualizar</button>
                                        <button className='table-button delete-button' onClick={() => {deleteCarHandler(car._id)}}>×</button>
                                    </td>
                                </tr>
                            } )
                        }
                        
                    </tbody>
                    </table>
                </div>}
            </div>  
        </div>
    )
}

export default Vehicles;