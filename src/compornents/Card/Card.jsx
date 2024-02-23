import React from 'react'
import './Card.css';

const Card = ({ pokemon }) => {
    return (
        <div className='card'>
            <div className="cardImg">
                <img src={pokemon.sprites.front_default} alt="" />
            </div>
            <h2 className='cardName'>{pokemon.name}</h2>
            <div className="cardType">
                type:&nbsp;
                {pokemon.types.map((type, index) => {
                    return (
                        <span className='typeName' key={type.type.name}>
                            {type.type.name}
                            {index < pokemon.types.length - 1 ? ', ' : ''}
                        </span>
                    );
                })}
            </div>
            <div className="cardInfo">
                <div className="cardData">
                    <p className='title'>
                        weight:&nbsp;{pokemon.weight}
                    </p>
                </div>
                <div className="cardData">
                    <p className='title'>
                        height:&nbsp;{pokemon.height}
                    </p>
                </div>
                <div className="cardData">
                    <p className='title'>
                        ability:&nbsp;{pokemon.abilities[0].ability.name}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Card
