import { Popularity } from './Popularity.js';

export function Time() {
    return (
        <div>
            <div style={{ marginBottom: "1rem"}}>
                <h2>This story has been released for *timeReleasedString*</h2>
            </div>
            <Popularity />
        </div>
    );
}