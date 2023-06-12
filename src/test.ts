import { RoyalRoadAPI } from '@mh1024/royalroadl-api/dist/royalroad.js';

const api = new RoyalRoadAPI();

(async () => {

const { data } = await api.fiction.getFiction(32576);
const chapters = data.chapters;
console.log(chapters[0].id);

for(var i of chapters) {
    console.log(i.id);
}
/*
chapters.forEach((el) => {
    console.log(el.id);
  });*/
// latest bookmark, trying to see whats going on with fiction.chapters array and if its really undefined, so i can see how to 
// sort chapter.release

})().catch(console.error);