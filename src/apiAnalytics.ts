import { RoyalRoadAPI } from '@mh1024/royalroadl-api/dist/royalroad';

export class Analytics {
    public readonly api: RoyalRoadAPI;
    constructor(rrApi: RoyalRoadAPI) {
        this.api = rrApi;
    }

    public async getPopularityAnalytics(id: number) {
        // func that grabs id from url in analyze class
        // this.api.fiction.getFiction()
        // func that grabs num from review url in analyze class
        // func that loops through chapter array and gets real chapter list
        // func that loops through list and stores comment arrays
        // func that flattens comment arrays
        // func that sorts comment list asc
        // func that makes dict based on months for each comment
        // put result in obj
    }
}