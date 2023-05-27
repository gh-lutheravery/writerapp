import { RoyalRoadAPI } from '@mh1024/royalroadl-api/dist/royalroad';
import { Fiction } from '@mh1024/royalroadl-api/dist/services/fiction';
import { SearchBlurb } from '@mh1024/royalroadl-api/dist/services/fictions';
import { Chapter, ChapterComment } from '@mh1024/royalroadl-api/dist/services/chapter';
import { PopularBlurb } from '@mh1024/royalroadl-api/dist/services/fictions';
import { getLastPage } from '@mh1024/royalroadl-api/dist/utils';

export class GenreMatch {
    private readonly IsMatch: boolean;
    private readonly Name: string;

    constructor(isMatch: boolean, name: string) {
        this.IsMatch = isMatch;
        this.Name = name;
    }
}

export class PrevWorkStats {
    private readonly TimeStamp: Date;
    private readonly Followers: number;

    constructor(timeStamp: Date, followers: number) {
        this.TimeStamp = timeStamp;
        this.Followers = followers;
    }
}

export class GenreStats {
    private readonly PrevelenceRating: number;
    private readonly Name: string;
    private readonly IsMatch: boolean;

    constructor(prevelenceRating: number, name: string, isMatch: boolean) {
        this.PrevelenceRating = prevelenceRating;
        this.Name = name;
        this.IsMatch = isMatch;
    }
}

export class Analytics {
    public readonly api: RoyalRoadAPI;

    private readonly GENRES: string[] = ["ACTION", "ADVENTURE", "COMEDY", "CONTEMPORARY", "DRAMA", 
    "FANTASY", "HISTORICAL", "HORROR", "MYSTERY", "PSYCHOLOGICAL", "ROMANCE", "SATIRE", "SCI-FI", 
    "SHORT STORY", "TRAGEDY"];

    constructor(rrApi: RoyalRoadAPI) {
        this.api = rrApi;
    }

    // func that grabs id from url in analyze class
    private getId(url: string) {
        const trimmedUrl: string = url.trim();
        const id: number = +trimmedUrl.slice(34, 39);
        return id;
    }

    private async getFiction(url: string) {
        const id: number = this.getId(url);
        const fict: Fiction = this.api.fiction.getFiction(id);
        return fict;
    }

    public getPopularGenres() {
        const blurbs: PopularBlurb[] = this.api.fictions.getBest();
        let tags: string[] = [];
        let tagPopularity: Map<string, number> = new Map();
        for (let bl of blurbs) {
            for (let tag of bl.tags) {
                // if this tag appears in the constant genre list
                if (this.GENRES.find((genre) => genre === tag) !== undefined) {
                    tags.push(tag)
                }
            }
        }

        // make dict with tags and number of occurences
        for (let t of tags) {
            if (tagPopularity.has(t)) {
                tagPopularity[t]++;
            }
            else {
                tagPopularity[t] = 1;
            }
        }

        return tagPopularity;
    }

    public async getGenreAnalytics(url: string) {
        const fict: Fiction = this.getFiction(url);
        // make PG an obj list
        
        const popularGenres: Map<string, number> = this.getPopularGenres();
        const descSortedPG = new Map([...popularGenres.entries()].sort((a, b) => b[1] - a[1]));
        
        // see genre matches betweeen tag popularity keys and current fiction tags
        let genreMatches: Map<string, boolean> = new Map();
        for (var i = 0; i < 4; i++) {
            for (let tag of fict.tags) {
                const currentGenre = descSortedPG[i];
                // if this tag appears in the constant genre list
                if (this.GENRES.find((currentGenre) => currentGenre === tag) !== undefined) {
                    genreMatches[currentGenre]
                }
            }
        }

        for (let genre of popularGenres) {
            
        }
        //const genreStatArray: GenreStats[] = 
    }

    public async getPrevWorksAnalytics(url: string) {
        // get amount of prev works:
        // get fiction from url
        const fict: Fiction = this.getFiction(url);
        // get author name from fiction obj
        const authorName: string = fict.author.name;
        // search author name
        const prevWorksBlurbs: SearchBlurb[] = this.api.fictions.search(authorName);
        if (prevWorksBlurbs.length <= 1) {
            return {};
        }

        // find and delete the selected fiction in list
        const selectedId = this.getId(url);
        const selectedFictIndex = prevWorksBlurbs.findIndex(f => f.id == selectedId);
        if (selectedFictIndex > -1) {
            prevWorksBlurbs.splice(selectedFictIndex, 1);
        }

        // get time inbetween:
        // check if list is empty or 1
        
        let prevWorksDict = new Map();
        // for loop through search results, for each fiction, get timestamp, put in list
        prevWorksBlurbs.forEach((bl: SearchBlurb) => {
            // get fiction again
            const blUrl = "https://royalroad.com/fiction/" + bl.id;
            const blFict: Fiction = this.getFiction(blUrl);
            const firstRelease: Date = new Date(blFict.chapters[0].release);
            prevWorksBlurbs[bl.id] = new PrevWorkStats(firstRelease, +blFict.stats.followers)
        });
        
        return prevWorksBlurbs;
    }

    public async getPopularityAnalytics(url: string) {
        // func that grabs id from url in analyze class
        const fict: Fiction = this.getFiction(url);
        // func that grabs num from review url in analyze class
        // func that loops through chapter array and gets real chapter list
        let twoDimComArray: [ChapterComment[]] = [[]];
        let page: number = 0;

        /*
        const req = this.api.Requester;
        const baseUrl = trimmedUrl.slice(0, 24);+
        const htmlPage = await this.req.get(
            `/fiction/0/_/chapter/${String(ch.id)}/_`,
        );
        const lastPage: number = getLastPage(htmlPage);
        */
        
        // func that loops through list and stores comment arrays
        fict.chapters.forEach((ch: Chapter) => {
            while(true) { 
                try {
                    const comArray: ChapterComment[] = this.api.chapter.getComments(ch.id, page);
                    twoDimComArray.push(comArray)
                    page++;
                }
                catch (error) {
                    break;
                }
            }
        });

        // func that flattens comment arrays
        const flatComArray: ChapterComment[] = twoDimComArray.flat();

        // func that sorts comment list asc
        const ascComArray: ChapterComment[] = twoDimComArray.sort();
        
        // func that makes dict based on months for each comment
        let comDict = new Map();
        let month: number = 0;
        for (let com of ascComArray) {
            const date = new Date(com.release);
            if (month < date.getMonth()) {
                comDict[date.getMonth()] = []
                month = date.getMonth();
            }
            else {
                // add com
                comDict[month].push(com)
            }
        }
        
        // put result in obj
        return comDict;
    }


}