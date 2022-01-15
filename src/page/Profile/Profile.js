import React from 'react'
import { Redirect } from 'react-router-dom'

export default function Profile() {

    if (localStorage.getItem('userLogin')) {
        return (
            <div>
                profile
            </div>
        )
    }else{
        alert('Vui long dang nhap de vao trang nay');
        return<Redirect to="/login"/>
    }
}
