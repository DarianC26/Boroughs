import React from 'react'
import './SearchRes.css'
import { createSearchParams, useNavigate } from 'react-router-dom'

export default function SearchRes({res}) {

    const navigate = useNavigate();


    return (
        <div className='testing-rel' onClick={() => {navigate({
            pathname: "/profile",
            search: createSearchParams({
                user: res.username
            }).toString()
        });}}>
            {res.username}

        </div>
    )
}
