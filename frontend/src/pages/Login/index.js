import React, { useState } from 'react';
import api from '../../services/api';

export default function Login({ history }) {
    const [email, setEmail] = useState('')

    async function handleSubmit(event) {

        event.preventDefault()

        // testing
        console.log(email)

        // we need to get the email from the user in req.body to send to backend
        // colocar a rota de post configurada para cadastrar ou logar usuário
        // iremos instalar o cors no backend para que autorizar o nosso frontend acesso a api
        const response = await api.post('/sessions', {
            email
        })

        console.log(response)
        // no response.data vc tem os dados da database do usuário

        const { _id } = response.data

        // para armazenar o id para que esse esteja disponível por toda a aplicação para a realização de atividades iremos utilizar o localstorage (mesma funcao do req.session do nodejs)
        localStorage.setItem('user', _id)
        // no browser se vc for na aba application vc verá o dado armazenado no Local Storage como user

        // após o login enviar o usuário para a rota do dashboard
        history.push('/dashboard');

    }

    return (
        <>
            <p>Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong>para sua empresa</p>
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="email">E-MAIL*</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="seu melhor e-mail"

                    // pegar os valores de email e alterar no estado
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <button className="btn" type="submit">Entrar</button>
            </form>
        </>
    )
}