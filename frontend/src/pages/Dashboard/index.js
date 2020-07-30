import React, { useEffect, useState, useMemo } from 'react';
import api from '../../services/api'
import './styles.css'
import { Link } from 'react-router-dom'
import socketio from 'socket.io-client'

export default function Dashboard() {

    const [spots, setSpots] = useState([]);
    const [requests, setRequests] = useState([])

    // fazer conexão com o servidor para passar dados do usuário logado
    // aula 05 11:30
    const user_id = localStorage.getItem('user')

    // aula 05 26:00
    const socket = useMemo(() => socketio('http://localhost:5000', {
        query: { user_id }
    }), [user_id]);


    // conectar com o socket
    // aula 05 7:00
    useEffect(() => {
        // backend -> console.log(socket.handshake.query);

        // aula 05 21:00
        socket.on('booking_request', data => {
            console.log(data)
            // devemos passar todas as reservas já solicitadas e a nova reserva
            setRequests([...requests, data])
        })

        // resposta do socket.emit do backend (no servet.ts)
        // aula 05 8:00
        socket.on('message', data => {
            console.log(data)
        })
        // também pode-se fazer o caminho contrário
        socket.emit('omni', 'Stack')

    }, [requests, socket]);

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
            });

            console.log(response.data)
            // salvar os sposts resgatados pelo axios no estado spots
            setSpots(response.data)
        }
        loadSpots();
    }, [])

    async function handleAccept(id) {
        await api.post(`/bookings/${id}/approve`)
        // aula 05 37:00 
        setRequests(requests.filter(request => request._id !== id));
    }

    async function handleReject(id) {
        await api.post(`/bookings/${id}/rejection`)
        setRequests(requests.filter(request => request._id !== id));
    }


    return (
        <>
            <ul className="notifications">
                {requests.map(request => (
                    <li key={request._id}>
                        <p><strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong>para a data: <strong>{request.date}</strong></p>
                        <button className="accept" onClick={() => handleAccept(request._id)}>ACEITAR</button>
                        <button className="reject" onClick={() => handleReject(request._id)}>REJEITAR</button>
                    </li>
                ))}
            </ul>
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