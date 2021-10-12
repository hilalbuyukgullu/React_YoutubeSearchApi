import React, { useEffect, useState } from 'react'
import { Grid, Segment, Rating, Embed } from 'semantic-ui-react'

export default function VideoDetail() {
  const [unFav, setUnFav] = useState<any>([])
  const [count, setCount] = useState<number>(0)

  const veri = JSON.parse(String(localStorage.getItem("selectItem")));
  useEffect(() => {
    favControl()
  }, [])

  function favControl() {
    if (localStorage.getItem("favs") !== null && localStorage.getItem("favs") !== "[]") {
      const veri = JSON.parse(String(localStorage.getItem("selectItem")));
      const deleteVideo = localStorage.getItem("favs");
      const deleteItemVideo: any[] = JSON.parse(String(deleteVideo))
      const str = String(JSON.stringify(deleteItemVideo[0]));
      str.search(String(veri))
      if (str === JSON.stringify(veri)) {
        setCount(1)
        console.log("dogruuu")
      }
    }
  }

  function localFavs(veri: any) {

    let newFavs = [];
    if (localStorage.getItem("favs") !== null) {
      newFavs = JSON.parse(String((localStorage.getItem("favs"))));
      newFavs.unshift(veri);
      localStorage.setItem("favs", JSON.stringify(newFavs));

      let topSix = localStorage.getItem("topSix");
      let topSixFavDel: any[] = JSON.parse(String(topSix))
      topSixFavDel.unshift(veri)
      localStorage.setItem("topSix", JSON.stringify(topSixFavDel));
    } else {
      newFavs.unshift(veri);
      localStorage.setItem("favs", JSON.stringify(newFavs));

      let topSix = localStorage.getItem("topSix");
      let topSixFavDel: any[] = JSON.parse(String(topSix))
      topSixFavDel.unshift(veri)
      localStorage.setItem("topSix", JSON.stringify(topSixFavDel));
    }
    favControl()
    setCount(1)
  }

  function localUnFavs(veri: any) {
    const deleteVideo = localStorage.getItem("favs");
    const deleteItemVideo: any[] = JSON.parse(String(deleteVideo))
    const index = deleteItemVideo.indexOf(String(veri))
    deleteItemVideo.splice(index, 1)
    setUnFav(deleteItemVideo)
    localStorage.setItem("favs", JSON.stringify(deleteItemVideo))

    let topSix = localStorage.getItem("topSix");
    let topSixFavDel: any[] = JSON.parse(String(topSix))
    const value = topSixFavDel.indexOf(String(veri))
    topSixFavDel.splice(value, 1)
    localStorage.setItem("topSix", JSON.stringify(topSixFavDel));
    favControl()
    setCount(0)
  }

  function dateFormat(date: any) {
    const trDate = new Date(date);
    return trDate.toLocaleDateString()
  }

  return (
    <>
      <Grid>
        <Grid.Column mobile={16} tablet={8} computer={1}>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={8} computer={10}>
          <Embed
            autoplay={true}
            id={veri.id.videoId === undefined ? veri.id : veri.id.videoId}
            placeholder={veri.snippet.thumbnails.high.url}
            source='youtube'
            iframe={{
              allowFullScreen: true,
              style: {
                padding: 10,
              },
            }}
          />
          <div className="videoTitle">
            <Grid>
              <Grid.Column mobile={16} tablet={8} computer={11}>
                <h3>{veri.snippet.title}</h3>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={5}>
                <div className="videoFav">
                  <p>Favorilere Ekle</p>
                  <Rating rating={count} maxRating={1} icon='heart' size='huge'
                    onRate={(e, data) => { data.rating === 1 ? localFavs(veri) : localUnFavs(veri) }} />
                </div>
              </Grid.Column>
            </Grid>
            <Grid>
              <Grid.Column mobile={16} tablet={8} computer={1}>
                <img src={veri.snippet.thumbnails.default.url} className="channelImg" alt=""></img>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={4}>
                <h5>{veri.snippet.channelTitle}</h5>
              </Grid.Column>
            </Grid>
          </div>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={8} computer={4}>
          <Segment>
            <div>
              <h5>Video Başlığı</h5>{veri.snippet.title}
              <h5>Kanal Adı</h5>{veri.snippet.channelTitle}
              <h5>Video Detayı</h5>{veri.snippet.description}
              <h5>Video Tarihi</h5>{veri.snippet.publishTime === undefined ? dateFormat(veri.snippet.publishedAt) : dateFormat(veri.snippet.publishTime)}
            </div>
          </Segment>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={8} computer={2}>
        </Grid.Column>
      </Grid>
    </>
  )
}
