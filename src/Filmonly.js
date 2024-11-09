import { useState } from 'react';
import styles from './Filmonly.css'

const arrays = {
    directors: Array(3).fill("jane doe"), 
    actors: Array(16).fill("john smith"),
    genres: Array(5).fill("nothing")
};

function Filmonly(){ 
    
    const [choice_desc, setChoice_desc] = useState('actors');

    return(
        <>
        <div className='film-information-container'> 
            
            <div className='film-information__element film-information-title'>Bronx Tale</div>


            {/* 3 Part Structure Row */}
            <div className='film-information-three-row-structure-flex'>
            
            {/* Left Side: Picture + 3 elements below it */}
            <div className='film-information-left-flex'>
            <div className='film-information__element film-information-picture' >img</div>
            <div className='film-information-left-bottom-flex'>
            <div className='film-information__element film-information-watched-count'>341</div>
            <div className='film-information__element film-information-list-count'>431</div>
            <div className='film-information__element film-information-favourite-count'>12</div>
            
            </div>
            </div>

            {/* Middle: Description + 3 info elements below it*/}
            
            <div className='film-information-middle-flex'>
            <div className='film-information__element film-information-description'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum iusto ipsum nobis autem, nesciunt voluptate illo in vel? Veniam porro sint quae nihil incidunt, iusto ipsam et ex magni explicabo?</div>
            <div className='film-information-bottom-desc-flex'>
                <div className='bottom-desc__element film-information__cast' onClick={() => setChoice_desc('actors')}>Cast</div>
                <div className='bottom-desc__element film-information__director' onClick={() => setChoice_desc('directors')}>Directors</div>
                <div className='bottom-desc__element film-information__genre' onClick={() => setChoice_desc('genres')} >Genres</div>
            </div>
            {currentDesc(arrays,choice_desc)}
            </div>
            
            {/*Right: Rating + Number  */}
            <div className='film-information__element film-information__ratings'>
                <h3>Rating</h3>
                <hr></hr>
                <div>3.4</div>
            </div>
            </div>
            
        </div>
        </>
    )
}

// Function that will return the deisred category when clicked upon
function currentDesc(arrays,choice_desc){
    return(
        <div className= "film-information-desc-category"> 
        {arrays[choice_desc].map((item) => <div className='film-information-desc-category__child'>{item}</div>)}
        </div>
    )
}

export default Filmonly;