import { useState } from 'react';
import './Filmonly.css'
import Headerbox from './Headerbox';

const arrays = {
    directors: Array(3).fill("jane doe"),
    actors: Array(16).fill("john smith"),
    genres: Array(5).fill("nothing")
};

function Filmonly(){
    const [choice_desc, setChoice_desc] = useState('actors');

    return(
        <>

        <div className='info film'> 
            <div className='movie title'>Bronx Tale</div>

            <div className='middleflex'>
            
            
            <div className='leftsideflex'>
            <div className='movie picture' >img</div>
            <div className='bottom lists'>
            <div className='movie watched'>341</div>
            <div className='movie list'>431</div>
            <div className='movie favourites'>12</div>
            </div>
            </div>
            

            <div className='middledescflex'>
            <div className='movie description'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum iusto ipsum nobis autem, nesciunt voluptate illo in vel? Veniam porro sint quae nihil incidunt, iusto ipsam et ex magni explicabo?</div>
            <div className='descflex'>
                <div className='desc cast' onClick={() => setChoice_desc('actors')}>Cast</div>
                <div className='desc director' onClick={() => setChoice_desc('directors')}>Directors</div>
                <div className='desc genre' onClick={() => setChoice_desc('genres')} >Genres</div>
            </div>
            {currentDesc(arrays,choice_desc)}

            </div>
            <div className='movie ratings'>
                <h3>Rating</h3>
                <hr></hr>
                <div>3.4</div>
            </div>
            </div>
            
        </div>
        </>
    )
}
function currentDesc(arrays,choice_desc){
    return(
        <div className= "output-desc"> 
        {arrays[choice_desc].map((item) => <div className='output-child'>{item}</div>)}
        </div>
    )
}

export default Filmonly;