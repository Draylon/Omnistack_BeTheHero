import React from 'react';

function Header({children,title,innerHTML}){
    return (
            <header>
                <h1>{title}</h1>
                <h3>{children}</h3>
                <p>{innerHTML}</p>
            </header>
        );
}
export default Header;