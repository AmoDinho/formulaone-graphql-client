import React from 'react';


const Iframe = ({
    title,
    className,
    width,
    height,
    src,
    frameborder,
    allow,
    allowFullScreen
}) => {
    return(
        <iframe
        title={title}
        className={className}
        width={width}
        height={height}
        src={`https://www.youtube.com/embed/${src}`}
        allow={allow}
        allowFullScreen={allowFullScreen}
        >

        </iframe>
    )
}

export default Iframe;