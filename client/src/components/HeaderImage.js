import React from 'react';

function HeaderImage({image_path})
{
    return (<div className="header-image">
            <img src={image_path} alt="Логотип"/>
        </div>
    )
}



export default HeaderImage

