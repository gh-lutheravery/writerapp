import { RoyalRoadAPI } from '@mh1024/royalroadl-api/dist/royalroad';

const api = new RoyalRoadAPI();

(async () => {

const { data } = await api.fiction.getFiction(21220);
const titles = data.chapters;

for(let i in titles) {
    console.log(`yes: ${i}`);
}


})().catch(console.error);