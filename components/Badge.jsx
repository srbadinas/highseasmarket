import React from 'react'

const Badge = ({ style = 'primary', text = "" }) => {

    let badgeStyle = '';

    switch (style) {
        case 'primary':
            badgeStyle = 'inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10';
            break;
        case 'success':
            badgeStyle = 'inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20';
            break;
        case 'warning':
            badgeStyle = 'inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20';
            break;
        case 'info':
            badgeStyle = 'inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10';
            break;
        case 'danger':
            badgeStyle = 'inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10';
            break;
    }

    return (
        <>
            <span className={badgeStyle}>
                {text}
            </span>
        </>
    )
}

export default Badge