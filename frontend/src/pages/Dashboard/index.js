import React, { useEffect, useState } from 'react';
import api from '../../services/api'
import './styles.css'
import { Link } from 'react-router-dom'

export default function Dashboard() {

    const [spots, setSpots] = useState([]);

    // aula 03 min 57:30
    // função, array de dependencias (quando vc quer que atualize )
    // array vazio executará uma única vez
    useEffect(() => {
        // o async nao pode ser utilizado na funcao principal do useEffect
        async function loadSpots() {
            // no backend configuramos essa rota para receber um id pelo headers para poder resgataros sposts criados pelo usuário
            // entao precisaremos resgatar esse id no localStorage
            const user_id = localStorage.getItem('user')
            const response = await api.get('/dashboard', {
                headers: { user_id }
            })

            console.log(response.data)
            // salvar os sposts resgatados pelo axios no estado spots
            setSpots(response.data)
        }
        loadSpots();
    }, [])


    return (
        <>
            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        {/* a primeira chave indica que eu quero adicionar um código js */}
                        {/* a segunda é o object css  */}
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
                    </li>
                ))}
            </ul>
            <Link to="/new">
                <button className="btn">Cadastrar novo spot</button>
            </Link>
        </>
    )
}