import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import '../styles/form.css'

import { usePosts } from '../context/PostContext';

export const OptionBrandsComponent = () => {
    let carBrands = [
        "Apollo Automobile", "Audi", "Alpina", "Bitter Cars", "BMW", "Brabus", "Ford", "Hauser", "Mercedes-Benz", "Opel", "Porsche", "Ruf",
        "Smart", "Volkswagen", "Brabham Automotive", "Elfin", "Holden", "KTM", "Gillet", "Beijing", "Brilliance", "BYD", "Chana", "Changan’an Motors",
        "Chery", "Dongfeng Motor Corporation (DFSK)", "First Automobile Works (FAW)", "Geely", "Great Wall", "JAC Motors", "Lifan", "MG", "Rely", "Riich",
        "Roewe", "SAIC Motor", "Tianjin", "Thunder Power", "Daewoo", "Hyundai", "Kia", "Samsung", "SsangYong", "Rimac", "W Motors", "CUPRA", "Hurtan",
        "SEAT", "Spana", "Tramontana", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Coda", "Dodge", "Ford", "GMC", "Hennessey", "Jeep", "Karma", "Lincoln",
        "Local Motors", "Panoz", "Rossion", "Saleen", "Shelby", "Tesla", "Alpine", "Bugatti", "Citroën", "DS Automobiles", "MPM", "Peugeot", "PGO", "Renault",
        "Infiniti", "Abarth", "Apollo", "Alfa Romeo", "DR Automobiles", "Ferrari", "FIAT", "Fornasari", "Iveco", "Lamborghini", "Lancia", "Maserati", "Pagani",
        "Hindustan Motors", "Mahindra", "Maruti Suzuki", "TATA", "Acura", "Daihatsu", "Datsun", "Honda", "Isuzu", "Lexus", "Mazda", "Mitsubishi", "Mitsuoka",
        "Nissan", "Subaru", "Suzuki", "Toyota", "Proton", "Mastretta", "Vühl", "Venturi", "Donkervoort", "Adamastor", "AC Cars", "Aston Martin", "BAC",
        "Bentley", "Bristol", "Caterham", "Ginetta", "Jaguar", "Land Rover", 'Lotus', "LTI (London Taxi)", "McLaren", "MINI", "Morgan", "Noble", "Radical",
        "Rolls-Royce", "TVR", "Vauxhall", "Westfield", "Lada", "Seaz", "UAZ", "Volga", "Zaz", "Zil", "Dacia", "Gordon", "Skoda", "Sbarro", "Koenigsegg",
        "Polestar", "Volvo", "Luxgen"
        
    ].sort();
    
    return carBrands.map(brand => <option value={brand}>{brand}</option>)
}

const AddCarForm = () => {

    let vehicleTypes = [
        "Veículo utilitário esportivo", "Hatchback", "Crossover", "Conversível", 
        "Sedan", "Carro esportivo", " Coupe", "Minivan", "Carrinha", "Caminhonete"
    ];
    
    const [veiculo, setVeiculo] = useState('');
    const [marca, setMarca] = useState('');
    const [ano, setAno] = useState(0);
    const [descricao, setDescricao] = useState('');
    const [vendido, setVendido] = useState(false);

    const {createPosts, getPost} = usePosts();
    const navigate = useNavigate();
    const params = useParams();

    const submitHandler = async () => {
        let car = {veiculo, marca, ano, descricao, vendido}
        await createPosts(car);
        navigate('/');
    }

    return(
        <form className='card'>
            <header id='form-header'>
                <h1>Adicionar carro novo</h1>
            </header>

            <div className='input-space' id='form-vehicle-name'>
                <label>Veiculo</label>
                <select className='input' value={veiculo} onChange={e => setVeiculo(e.target.value)} >
                    {
                        vehicleTypes.map(type => <option value={type}>{type}</option>)
                    }
                </select>
            </div>
            <div className='input-space' id='form-vehicle-brand'>
                <label>Marca</label>
                <select className='input' value={marca} onChange={e => setMarca(e.target.value)}>
                    {
                        <OptionBrandsComponent />
                    }
                </select>
            </div>
            <div className='input-space' id='form-vehicle-year'>
                <label>Ano</label>
                <input 
                    id='input-car-year' 
                    type='number'  
                    min='1886' max={new Date().getFullYear()} 
                    placeholder={new Date().getFullYear()}
                    onChange={e => setAno(e.target.value)} 
                />
            </div>
            <div className='input-space' id='form-vehicle-description'>
                <label>Descrição</label>
                <input className='input' type='text' onChange={e => setDescricao(e.target.value)}/>
            </div>
            <div className='input-space' id='form-vehicle-sold'>
                <label>Vendido</label>
                <input type='radio' onChange={e => setVendido(!vendido)}  />
            </div>

            <button id='submit-button' onClick={() => submitHandler()} >Adicionar</button>
        </form>
    )
}

export default AddCarForm;