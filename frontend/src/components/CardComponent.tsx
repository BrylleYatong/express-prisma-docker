import React, { useEffect, useState } from "react";

interface Card {
    id: number;
    name: string;
    email: string;
};

interface UpdateUser {
    id: string;
    name: string;
    email: string;
}

type OnClick = () => void
type OnUserSelect = () => void

const CardComponent: React.FC<{ onUserSelect: OnUserSelect, onClick: OnClick, updateUsers: UpdateUser, user: Card}> = ({onUserSelect, onClick, updateUsers, user}) => {
    const [cardUser, setCardUser] = useState(user)
    const [updateUser, setUpdateUser] = useState(updateUsers)
    console.log("%c 🇦🇩: updateUser ", "font-size:16px;background-color:#d02e2b;color:white;", updateUser)

    return(
        <div 
            onClick={() => { 
                onUserSelect()
                onClick()
            }} 
            className="bg-white shadow-lg rounded-lg p-2 mb-2 hover:bg-gray-100"
        >
            <div className="text-sm text-gray-600">ID: {user.id}</div>
            <div className="text-lg font-semibold text-gray-800">{user.name}</div>
            <div className="text-md text-gray-700">{user.email}</div>
        </div>
    );
};

export default CardComponent;