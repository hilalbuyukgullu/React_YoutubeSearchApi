import axios from "axios";

const service = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/",
  timeout: 15000,
  headers: {
    "Authorization": "491599517373-39a7ovga34itso2frrj6bko6l097imh3.apps.googleusercontent.com",
    'Accept': 'application/json'
  }
})

export async function youtubeSearch(videoTitle: any, order:string) {
  let prm = videoTitle===""? {
    part: "snippet",
    maxResults: 12,
    order:order,
    key: "AIzaSyD0lcEARXBUihXwYCd05ssjLGHmwDmkpag",
    chart:"mostPopular",
    regionCode:"tr"
  } : {
    q:videoTitle,
    part: "snippet",
    maxResults: 5,
    order:order,
    key: "AIzaSyD0lcEARXBUihXwYCd05ssjLGHmwDmkpag",
  }
  return await service.get(videoTitle===""?"v3/videos":"v3/search",{params:prm})
}

