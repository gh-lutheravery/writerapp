import { Popularity } from './Popularity';
import {ListGroup, ListGroupItem} from 'reactstrap'

export function Genre() {
    const renderGenres = (genres) => {
        {genres.map(genre => {
            return (
                <ListGroupItem className="justify-content-between">
                    {genre.name}{' '}
                    <Badge>
                        {genre.numStat}
                    </Badge>
                </ListGroupItem>
            )
        })}
    };

    return (
        <div>
            <div id="genre-container">  
                <div style={{ marginBottom: "1rem"}}>
                    <h2>How popular is the genre it is in?</h2>
                </div>
                
                <ListGroup>
                    props.renderGenres()
                </ListGroup>
            </div>
        </div>
    );
}