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
    time?: string;
}

type OnClick = () => void

const CardComponent: React.FC<{key: number, onClick: OnClick, updateUsers: UpdateUser, user: Card}> = ({onClick, updateUsers, user}) => {
    const [cardUser, setCardUser] = useState(user)

    return(
        <div 
            onClick={() => { 
                onClick()
            }} 
            className="bg-white shadow-lg rounded-lg p-2 mb-2 hover:bg-gray-100 hover:cursor-pointer"
        >
            <div className="text-sm text-gray-600">ID: {user.id}</div>
            <div className="text-lg font-semibold text-gray-800">{user.name}</div>
            <div className="text-md text-gray-700">{user.email}</div>
        </div>
    );
};

export default CardComponent;