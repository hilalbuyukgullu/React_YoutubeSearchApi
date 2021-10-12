import React, { Fragment, useState } from 'react'
import { Button, Form, Grid, Input, Segment, Image, Icon,Dropdown } from 'semantic-ui-react'
import { youtubeSearch } from '../config/Service';
import { YoutubeSearch } from '../Models/IYoutubeSearch';

export default function Header() {
  const [data, setData] = useState("")
  const [searchList, setSearchList] = useState<YoutubeSearch>()
  const [dropdowCount, setDropdowCount] = useState("")

  function fncFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    youtubeSearch(data,dropdowCount===""? "viewCount": dropdowCount).then(res => { setSearchList(res.data) })
  }

  function fncLastWatchVideo(item: any) {
    let lastWatchVideo = [];
    if (localStorage.getItem("lastWatchVideo") !== null) {
      lastWatchVideo = JSON.parse(String(localStorage.getItem("lastWatchVideo")))
      lastWatchVideo.unshift(item)
      localStorage.setItem("lastWatchVideo", JSON.stringify(lastWatchVideo))
    } else {
      lastWatchVideo.unshift(item)
      localStorage.setItem("lastWatchVideo", JSON.stringify(lastWatchVideo))
    }
  }

  function dateFormat(date: any) {
    const trDate = new Date(date);
    return trDate.toLocaleDateString()
  }

  const friendOptions = [
    {
      key: 'relevance',
      text: 'Önerilen',
      value: 'relevance',
    },
    {
      key: 'viewCount',
      text: 'İzlenenlere göre sırala',
      value: 'viewCount',
    },
    {
      key: 'title',
      text: 'A-Z ye göre sırala',
      value: 'title',
  }]

  return (
    <>
      <Segment>
        <Grid>
          <Grid.Column mobile={16} tablet={8} computer={4} className="center">
            <a href="/" className="homeLink"><div className="youtubeLogo"><Icon name="youtube" color="red" />YouTube</div></a>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={8}>
            <Form onSubmit={(e) => { fncFormSubmit(e) }}>
              <Input className="searchInput" onChange={(e) => { setData(e.target.value) }} placeholder='Search...' />
              <Button type="submit" icon='search' />
            </Form>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={4}>
          <div className="dropDown">
          <Dropdown placeholder='Sıralama' fluid selection
            onChange={(e, data) => { setDropdowCount(String((data.value))) }} options={friendOptions} />
      </div>
          </Grid.Column>
        </Grid>
      </Segment>

      {searchList?.items.map((item, index) => {
        return (
          <Fragment key={index}>
            <Grid row className="searchList">
              <Grid.Column computer={3} mobile={16} />
              <Grid.Column computer={4} mobile={16}>
                <a href={"/videodetail"} rel="noreferrer" className="searchLink">
                  <Image src={item.snippet.thumbnails.medium.url} fluid className="searchImage" onClick={() => { localStorage.setItem("selectItem", JSON.stringify(item)); fncLastWatchVideo(item) }}
                  />
                </a>
              </Grid.Column>
              <Grid.Column computer={6} mobile={16}>
                <a href={"/videodetail"} rel="noreferrer" className="searchLink" onClick={() => { localStorage.setItem("selectItem", JSON.stringify(item)); fncLastWatchVideo(item) }}>
                  <h2>{item.snippet.title}</h2>
                </a>
                <h4>{item.snippet.channelTitle}</h4>
                <div className="searchDate">{item.snippet.publishTime === undefined ? dateFormat(item.snippet.publishedAt) : dateFormat(item.snippet.publishTime)}</div>
              </Grid.Column>
            </Grid>
          </Fragment>
        )
      }
      )}

    </>
  )
}
