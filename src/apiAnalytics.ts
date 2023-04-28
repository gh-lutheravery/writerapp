import { RoyalRoadAPI } from '@mh1024/royalroadl-api/dist/royalroad';

export class Analytics {
    public readonly api: RoyalRoadAPI;
    constructor(insecure = false) {
        this.api = new RoyalRoadAPI();
    }


}