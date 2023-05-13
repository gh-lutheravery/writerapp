import { RoyalRoadAPI } from '@mh1024/royalroadl-api/dist/royalroad';
import { Fiction } from '@mh1024/royalroadl-api/dist/services/fiction';
import { SearchBlurb } from '@mh1024/royalroadl-api/dist/services/fictions';
import { Chapter, ChapterComment } from '@mh1024/royalroadl-api/dist/services/chapter';
import { getLastPage } from '@mh1024/royalroadl-api/dist/utils';

export class PrevWorkStats {
    private readonly TimeStamp: Date;
    private readonly Followers: number;

    constructor(timeStamp: RoyalRoadAPI, followers: number) {
        this.TimeStamp = timeStamp;
        this.Followers = followers;
    }
}

export class Analytics {
    public readonly api: RoyalRoadAPI;
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
            prevWorksBlurbs[bl.id] = 
        });
        // calculate difference and put in obj

        // get pop:
        // for loop through search results, get followers numbers for each, put in obj
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
        const baseUrl = trimmedUrl.slice(0, 24);
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