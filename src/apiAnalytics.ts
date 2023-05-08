import { RoyalRoadAPI } from '@mh1024/royalroadl-api/dist/royalroad';
import { Fiction } from '@mh1024/royalroadl-api/dist/services/fiction';
import { Chapter, ChapterComment } from '@mh1024/royalroadl-api/dist/services/chapter';
import { getLastPage } from '@mh1024/royalroadl-api/dist/utils';

export class Analytics {
    public readonly api: RoyalRoadAPI;
    constructor(rrApi: RoyalRoadAPI) {
        this.api = rrApi;
    }

    public async getPopularityAnalytics(url: string) {
        // func that grabs id from url in analyze class
        const trimmedUrl: string = url.trim();
        const id: number = +trimmedUrl.slice(34, 39);
        // this.api.fiction.getFiction()
        const fict: Fiction = this.api.fiction.getFiction(id);
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