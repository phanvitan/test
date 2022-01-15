import React from 'react'

export default function Detail(props) {
    return (
        <div>
            Gia tri tham so : {props.match.params.id}
            path name hien tai : {props.match.path}
        </div>
    )
}
