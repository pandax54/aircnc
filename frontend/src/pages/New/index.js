import React, { useState, useMemo } from 'react';
// useMemo aula 03 1:24:00
import camera from '../../assets/camera.svg'
import './styles.css'
import api from '../../services/api'

export default function New({ history }) {

    const [company, setCompany] = useState('')
    const [techs, setTechs] = useState('')
    const [price, setPrice] = useState('')
    const [thumbnail, setThumbnail] = useState(null)

    // toda vez que uma mensagem for selecionada essa funcao irá rodar
    const preview = useMemo(
        () => {
            return thumbnail ? URL.createObjectURL(thumbnail) : null
        },
        [thumbnail]
    )

    async function handlesubmit(event) {
        event.preventDefault()
        // format multipart form aula 03 1:29:00
        const data = new FormData();

        const user_id = localStorage.getItem('user')

        data.append('thumbnail', thumbnail)
        data.append('company', company)
        data.append('techs', techs)
        data.append('price', price)

        // precisamos enviar o user_id no headers
        await api.post('/spots', data, {
            headers: { user_id }
        })

        // enviar o usuário novamente para a tela de dashboard
        history.push('/dashboard');
    }

    return (
        <>
            <form onSubmit={handlesubmit} action="">
                <label
                    id="thumbnail"
                    style={{ backgroundImage: `url(${preview})` }}
                    className={thumbnail ? 'has-thumbnail' : ''}
                >
                    {/* event.target.files sempre será um vetor entao pegaremos a posição zero  */}
                    <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
                    <img src={camera} alt="Select img" />
                </label>

                <label htmlFor="company">Empresa</label>
                <input
                    type="text"
                    id="company"
                    placeholder="Sua empresa"
                    value={company}
                    onChange={event => setCompany(event.target.value)}
                />

                <label htmlFor="techs">TECNOLOGIAS * <span>(separadas por vírgula)</span></label>
                <input
                    type="text"
                    id="techs"
                    placeholder="Quais tecnologias usam?"
                    value={techs}
                    onChange={event => setTechs(event.target.value)}
                />

                <label htmlFor="price">VALOR DA DIÁRIA <span>(em branco para GRATUITO)</span></label>
                <input
                    type="text"
                    id="price"
                    placeholder="Qual valor cobrado por dia?"
                    value={price}
                    onChange={event => setPrice(event.target.value)}
                />

                <button className="btn">Cadastrar</button>

            </form>
        </>
    )
}