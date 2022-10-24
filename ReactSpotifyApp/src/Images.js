import React from 'react';

const Images = props => {    

    const dropdownChanged = e => {
        props.changed(e.target.value);

    }    

    return (
        <div>
            {props.options.map((item, index) => {
                return (
                    <div>
                        <img
                        src={item.url}>
                        </img>
                    </div>
                );
            })}    
        </div>
    );
}

export default Images;