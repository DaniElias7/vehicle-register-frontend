import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { usePosts} from "../context/PostContext";
import Nav from './nav'

const UpdateCar = () => {

    const [car, setCar] = useState( {} );

    const [veiculo, setVeiculo] = useState(car.veiculo);
    const [marca, setMarca] = useState(car.marca);
    const [ano, setAno] = useState(car.ano);
    const [descricao, setDescricao] = useState(car.descricao);
    const [vendido, setVendido] = useState(car.vendido);

    const {getPost, updatePost, currentCarId} = usePosts(); 
    console.log('UPDATE HERE')
    const params = useParams();
    const navigate = useNavigate();
    useEffect( () => {
        ( 
           async () => {
                if (currentCarId) {
                    const post = await getPost(currentCarId)
                    setCar(post)
                    console.log(currentCarId)
                }  
            }
        )();
    }, [])

    console.log(currentCarId)

    const updateCarHandle = async () => {
        if (currentCarId) {
            let car = {veiculo, marca, ano, descricao, vendido}
            await updatePost(currentCarId, car)
            navigate('/')
        }
    };

     return (
        <div id='car-details-container'>
             <div>
                 <p class='detail-title'>Veiculo</p>
                 <input class='detail-value input' placeholder={car.veiculo} onChange={(e) => setVeiculo(e.target.value)} />
             </div>
             <div>
                 <p class='detail-title'>Marca</p>
                 <input class='detail-value input' placeholder={car.marca} onChange={(e) => setMarca(e.target.value)} />
             </div>
             <div>
                 <p class='detail-title'>Ano</p>
                 <input class='detail-value input'placeholder={car.ano} onChange={(e) => setAno(e.target.value)} />
             </div>
             <div>
                 <p class='detail-title'>Descrição</p>
                 <input class='detail-value input' placeholder={car.descricao} onChange={(e) => setDescricao(e.target.value)} />
             </div>
             <div>
                 <p class='detail-title'>Vendido</p>
                 <input class='detail-value input' placeholder={car.vendido == false ? 'Não' : 'Sim'}  onChange={(e) => setVendido(e.target.value)} />
             </div>
             <div>
                 <p class='detail-title'>Created</p>
                 <p class='detail-value'>{new Date(car.createdAt).getDate()}/{new Date(car.createdAt).getMonth()}/{new Date(car.createdAt).getFullYear()}</p>
             </div>
             <div>
                 <p class='detail-title'>Updated</p>
                 <p class='detail-value' >{new Date(car.updatedAt).getDate()}/{new Date(car.updatedAt).getMonth()}/{new Date(car.updatedAt).getFullYear()}</p>
             </div>
             <button id='edit-save-button' onClick={updateCarHandle}>Salvar</button>
        </div>
         
     )
 }
 
export default UpdateCar