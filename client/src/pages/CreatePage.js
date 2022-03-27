import React, {useContext, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

const CreatePage = () => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [link, setLink] = useState('')

    const pressHandler = async event => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                })
                navigate(`/detail/${data.link._id}`)

            } catch (e) {}
        }
    }

    return (
        <div className='row'>
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input
                        type="text"
                        id="link"
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Введите ссылку</label>
                </div>
            </div>
        </div>
    )
}

export default CreatePage