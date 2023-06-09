import { RoyalRoadAPI } from '@mh1024/royalroadl-api/dist/royalroad';
import { Fiction, FictionChapter } from '@mh1024/royalroadl-api/dist/services/fiction';
import { SearchBlurb } from '@mh1024/royalroadl-api/dist/services/fictions';
import { Chapter, ChapterComment } from '@mh1024/royalroadl-api/dist/services/chapter';
import { PopularBlurb } from '@mh1024/royalroadl-api/dist/services/fictions';
import { getLastPage } from '@mh1024/royalroadl-api/dist/utils';


export class ChapterTitleDate {
    public Title: string;
    public Date: Date;

    constructor(title: string, date: Date) {
        this.Title = title;
        this.Date = date;
    }
}

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

    public async getFiction(url: string) {
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
        let monthYear: Date = new Date();
        let tally = 0;
        for (let com of ascComArray) {
            // if this is the first iteration
            const date = new Date(com.release);
            if (tally === 0) {
                comDict[date.toString()] = [];
                monthYear = date; 
                tally++;
            }

            else {
                // check if the current element in array is a different month
                if (monthYear.getMonth() !== date.getMonth() || 
                monthYear.getFullYear() !== date.getFullYear()) {

                    comDict[date.toString()] = [];
                    monthYear = date;
                }
                else {
                    // add com
                    comDict[monthYear.toString()].push(com);
                }
            }
        }
        
        // put result in obj
        return comDict;
    }

    public async getConsistencyAnalytics(url: string) {
        // func that grabs id from url in analyze class
        const fict: Fiction = this.getFiction(url);

        const chapterArray: FictionChapter[] = fict.chapters;

        let chapterDateArray: ChapterTitleDate[] = []
        for (let i of chapterArray) {
            const date: Date = new Date(i.release);
            const name: string = i.title;
            chapterDateArray.push(new ChapterTitleDate(name, date));
        }

        const ascDateArray: ChapterTitleDate[] = chapterDateArray.sort((a, b) => a.Date.getTime() - b.Date.getTime())
        
        // func that makes dict based on months for each comment
        let dateDict = new Map();
        let monthYear: Date = new Date();
        let tally: number = 0;
        for (let cd of ascDateArray) {
            // if this is the first iteration
            if (tally === 0) {
                dateDict[cd.Date.toString()] = [];
                monthYear = cd.Date;
                tally++;
            }

            else {
                // check if the current element in array is a different month
                if (monthYear.getMonth() !== cd.Date.getMonth() || 
                monthYear.getFullYear() !== cd.Date.getFullYear()) {

                    dateDict[cd.Date.toString()] = []
                    monthYear = cd.Date;
                }
                else {
                    // add com
                    dateDict[monthYear.toString()].push(cd.Title)
                }
            }
        }
        
        // put result in obj
        return dateDict;
    }

}