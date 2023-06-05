import { RoyalRoadAPI } from '@mh1024/royalroadl-api/dist/royalroad';
import { Fiction, FictionChapter } from '@mh1024/royalroadl-api/dist/services/fiction';
import { SearchBlurb } from '@mh1024/royalroadl-api/dist/services/fictions';
import { Chapter, ChapterComment } from '@mh1024/royalroadl-api/dist/services/chapter';
import { PopularBlurb } from '@mh1024/royalroadl-api/dist/services/fictions';
import { getLastPage } from '@mh1024/royalroadl-api/dist/utils';

export class GenrePopularity {
    public PopRating: number;
    public readonly Name: string;

    constructor(popRating: number, name: string) {
        this.PopRating = popRating;
        this.Name = name;
    }
}

export class GenreMatch {
    public IsMatch: boolean;
    public readonly Name: string;

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
        let tagPopularity: GenrePopularity[] = [];
        for (let bl of blurbs) {
            for (let tag of bl.tags) {
                // if this tag appears in the constant genre list
                if (this.GENRES.find((genre) => genre === tag) !== undefined) {
                    tags.push(tag)
                }
            }
        }

        // make list with tags and number of occurences
        for (let t of tags) {
            if (tagPopularity.find((obj) => obj.Name === t) !== undefined) {
                const index = tagPopularity.findIndex((obj) => obj.Name === t)
                tagPopularity[index].PopRating++;
            }
            else {
                tagPopularity.push(new GenrePopularity(1, t));
            }
        }

        return tagPopularity;
    }

    public async getGenreAnalytics(url: string) {
        const fict: Fiction = this.getFiction(url);
        // make PG an obj list
        
        const popularGenres: GenrePopularity[] = this.getPopularGenres();
        const descSortedPG = popularGenres.sort(g => g.PopRating).reverse();
        
        // see genre matches betweeen top 5 tag popularity keys and current fiction tags
        let genreMatches: GenreMatch[] = [];
        for (var i = 0; i < 4; i++) {  
            const currentGenre = descSortedPG[i].Name;

            // if this tag appears in the constant genre list
            if (fict.tags.find((tag) => tag === currentGenre) !== undefined) {
                genreMatches.push(new GenreMatch(true, currentGenre));
            }

            else {
                genreMatches.push(new GenreMatch(false, currentGenre));
            }
        }

        const genreStatArray: GenreStats[] = []
        for (let match of genreMatches) {
            const index = popularGenres.findIndex((rating) => rating.Name === match.Name);
            const genrePop: GenrePopularity = popularGenres[index];

            genreStatArray.push(new GenreStats(
                genrePop.PopRating, 
                genrePop.Name, 
                match.IsMatch
                ));
        }
        
        return genreStatArray;
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

    // returns a dictionary that stores a list of months with a 
    // corresponding list of comments posted that month to indicate popularity
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

    public async getConsistencyAnalytics(url: string) {
        // func that grabs id from url in analyze class
        const fict: Fiction = this.getFiction(url);

        const chapterArray: FictionChapter[] = fict.chapters;

        // func that sorts comment list asc
        const chapterReleaseArray: number[] = Array.from(chapterArray, ch => ch.release);
        const chapterDateArray: Date[] = Array.from(chapterReleaseArray, r => new Date(r));

        const ascDateArray: FictionChapter[] = chapterDateArray.sort();
        
        // func that makes dict based on months for each comment
        let dateDict = new Map();
        let month: number = 0;
        for (let date of ascDateArray) {
            if (month < date.getMonth()) {
                dateDict[date.getMonth()] = []
                month = date.getMonth();
            }
            else {
                // add com
                dateDict[month].push(date)
            }
        }
        
        // put result in obj
        return dateDict;
    }
    // consis: copy above func and use the part that uses flattened list to account for flat chapters, then fill in gaps

}