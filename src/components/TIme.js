import { Popularity } from './Popularity';

export function Time() {
    return (
        <div>
            <h2>This story has been released for *timeReleasedString*</h2>
            <Popularity />
        </div>
    );
}