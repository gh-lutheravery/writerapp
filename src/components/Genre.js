import {ListGroup, ListGroupItem, Badge}from 'reactstrap'
import { Analytics } from '../apiAnalytics.ts'

export function Genre(url) {
    const genreArray = Analytics.getGenreAnalytics(url);
    const renderGenres = (genres) => {
        {genres.map(genre => {
            if (genre.IsMatch === true) {
                return (
                    <ListGroupItem className="justify-content-between" active>
                        {genre.Name}{' '}
                        <Badge>
                            {genre.PopRating}
                        </Badge>
                    </ListGroupItem>
                )
            }

            return (
                <ListGroupItem className="justify-content-between">
                    {genre.Name}{' '}
                    <Badge>
                        {genre.PopRating}
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
                    {renderGenres(genreArray)}
                </ListGroup>
            </div>
        </div>
    );
}