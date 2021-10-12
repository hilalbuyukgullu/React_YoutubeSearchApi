import React, { useEffect, useState } from "react";
import { Grid, Card, GridColumn, Icon } from "semantic-ui-react";
import { youtubeSearch } from "./config/Service";
import { Item } from "./Models/IYoutubeSearch";

export default function Home() {
  const [topArr, setTopArr] = useState<Item[]>([]);
  const [lastWatchVideo, setLastWatchVideo] = useState<any[]>([]);

  useEffect(() => {
    fncTopSix();
    lastWatchVideo.unshift(
      JSON.parse(String(localStorage.getItem("lastWatchVideo")))
    );
  }, [lastWatchVideo]);

  function fncTopSix() {
    setTopArr(JSON.parse(String(localStorage.getItem("topSix"))));
    if (localStorage.getItem("topSix") === null) {
      youtubeSearch("","").then((res) => {
        localStorage.setItem("topSix", JSON.stringify(res.data.items));
        setTopArr(JSON.parse(String(localStorage.getItem("topSix"))));
      });
    } else {
      setTopArr(JSON.parse(String(localStorage.getItem("topSix"))));
    }

  }

  function fncDelete(index: number, item: Item) {
    const deleteVideo = localStorage.getItem("topSix");
    const deleteItemVideo: Item[] = JSON.parse(String(deleteVideo));
    deleteItemVideo.splice(index, 1);
    setTopArr(deleteItemVideo);
    localStorage.setItem("topSix", JSON.stringify(deleteItemVideo));

    if (localStorage.getItem("favs") !== null) {
      const favDelete = localStorage.getItem("favs");
      const favDeleteItem: any[] = JSON.parse(String(favDelete))
      const value = favDeleteItem.indexOf(item)
      favDeleteItem.splice(value, 1)
      localStorage.setItem("favs", JSON.stringify(favDeleteItem))
    }
  }

  function fncLastWatchVideo(item: Item) {
    let lastWatchVideo = [];
    if (localStorage.getItem("lastWatchVideo") !== null) {
      lastWatchVideo = JSON.parse(
        String(localStorage.getItem("lastWatchVideo"))
      );
      lastWatchVideo.unshift(item);
      localStorage.setItem("lastWatchVideo", JSON.stringify(lastWatchVideo));
    } else {
      lastWatchVideo.unshift(item);
      localStorage.setItem("lastWatchVideo", JSON.stringify(lastWatchVideo));
    }
  }

  function dateFormat(date: Date) {
    const trDate = new Date(date);
    return trDate.toLocaleDateString();
  }

  return (
    <>
      <div className="topTitle">Favoriler</div>
      <Grid row>
        {topArr?.map((item: Item, index: number) => {
          if (index < 6) {
            return (
              <Grid.Column
                key={index}
                className="cardWidth"
                mobile={16}
                tablet={8}
                computer={2}
              >
                <Card key={index}>
                  <a
                    href={"/videodetail"}
                    rel="noreferrer"
                    className="searchLink"
                  >
                    <img
                      className="cardImg"
                      src={item.snippet.thumbnails.medium.url}
                      onClick={() => {
                        localStorage.setItem(
                          "selectItem",
                          JSON.stringify(item)
                        );
                        fncLastWatchVideo(item);
                      }}
                      alt=""
                    />
                  </a>
                  <Grid row>
                    <GridColumn className="delButton">
                      <button
                        name="delete"
                        className=" ui icon delItem"
                        onClick={() => {
                          fncDelete(index, item);
                        }}
                      >
                        {" "}
                        Sil
                        <Icon name="delete" />
                      </button>
                    </GridColumn>
                  </Grid>
                  <Card.Content>
                    <a
                      href={"/videodetail"}
                      rel="noreferrer"
                      className="searchLink"
                    >
                      <Card.Header
                        className="cardTitle"
                        onClick={() => {
                          localStorage.setItem(
                            "selectItem",
                            JSON.stringify(item)
                          );
                          fncLastWatchVideo(item);
                        }}
                      >
                        {item.snippet.title.slice(0, 25)}...
                      </Card.Header>
                    </a>
                    {item.snippet.channelTitle}
                    <div className="cardDate">
                      {item.snippet.publishTime === undefined
                        ? dateFormat(item.snippet.publishedAt)
                        : dateFormat(item.snippet.publishTime)}
                    </div>
                  </Card.Content>
                </Card>
              </Grid.Column>
            );
          } else if (topArr === null) {
            return (
              <Grid.Column
                className="cardWidth"
                mobile={16}
                tablet={8}
                computer={2}
              >
                <Card key={index}>
                  <a
                    href={"/videodetail"}
                    rel="noreferrer"
                    className="searchLink"
                  >
                    <img
                      className="cardImg"
                      src={item.snippet.thumbnails.medium.url}
                      onClick={() => {
                        localStorage.setItem(
                          "selectItem",
                          JSON.stringify(item)
                        );
                        fncLastWatchVideo(item);
                      }}
                      alt=""
                    />
                  </a>
                  <Grid row>
                    <GridColumn className="delButton">
                      <button
                        name="delete"
                        className=" ui icon delItem"
                        onClick={() => { }}
                      >
                        {" "}
                        Sil
                        <Icon name="delete" />
                      </button>
                    </GridColumn>
                  </Grid>
                  <Card.Content>
                    <a
                      href={"/videodetail"}
                      rel="noreferrer"
                      className="searchLink"
                    >
                      <Card.Header
                        className="cardTitle"
                        onClick={() => {
                          localStorage.setItem(
                            "selectItem",
                            JSON.stringify(item)
                          );
                          fncLastWatchVideo(item);
                        }}
                      >
                        {item.snippet.title.slice(0, 25)}...
                      </Card.Header>
                    </a>
                    {item.snippet.channelTitle}
                    <div className="cardDate">
                      {item.snippet.publishTime === undefined
                        ? dateFormat(item.snippet.publishedAt)
                        : dateFormat(item.snippet.publishTime)}
                    </div>
                  </Card.Content>
                </Card>
              </Grid.Column>
            );
          }
        })}
      </Grid>

      <div className="topTitle">En son İzlenen Videolar</div>
      <Grid row>
        {lastWatchVideo[0] === null ? (
          <div className="lasWatchNull">
            <h5>En son izlenen video bulunmamaktadır.</h5>
          </div>
        ) : (
          console.log("boş değil")
        )}
        {lastWatchVideo[0]?.map((item: Item, index: number) => {
          if (index < 5) {
            return (
              <Grid.Column
                key={index}
                className="cardWidth"
                mobile={16}
                tablet={8}
                computer={2}
              >
                <Card key={index}>
                  <a
                    href={"/videodetail"}
                    rel="noreferrer"
                    className="searchLink"
                  >
                    <img
                      className="cardImg"
                      src={item.snippet.thumbnails.medium.url}
                      onClick={() => {
                        localStorage.setItem(
                          "selectItem",
                          JSON.stringify(item)
                        );
                        fncLastWatchVideo(item);
                      }}
                      alt=""
                    />
                  </a>
                  <Card.Content>
                    <a
                      href={"/videodetail"}
                      rel="noreferrer"
                      className="searchLink"
                    >
                      <Card.Header
                        className="cardTitle"
                        onClick={() => {
                          localStorage.setItem(
                            "selectItem",
                            JSON.stringify(item)
                          );
                          fncLastWatchVideo(item);
                        }}
                      >
                        {item.snippet.title.slice(0, 25)}...
                      </Card.Header>
                    </a>
                    {item.snippet.channelTitle}
                    <div className="cardDate">
                      {item.snippet.publishTime === undefined
                        ? dateFormat(item.snippet.publishedAt)
                        : dateFormat(item.snippet.publishTime)}
                    </div>
                  </Card.Content>
                </Card>
              </Grid.Column>
            );
          }
        })}
      </Grid>
    </>
  );
}
