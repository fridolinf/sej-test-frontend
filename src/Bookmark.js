import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Button, Card, Collapse, Empty } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Bookmark() {
  const { Panel } = Collapse;
  const { Meta } = Card;

  const [getLocalStorage, setGetLocalStorage] = useState(
    JSON.parse(localStorage.getItem("savebook"))
  );

  function IconFavorites(id) {
    const findIndex = getLocalStorage?.findIndex((item) => item.id === id.id);
    if (findIndex === -1 || findIndex === undefined) {
      return <HeartOutlined />;
    } else {
      return <HeartFilled />;
    }
  }

  const onClickFavorites = (id) => {
    const findIndex = getLocalStorage.findIndex((item) => item.id === id.id);
    getLocalStorage.splice(findIndex, 1);
    localStorage.setItem("savebook", JSON.stringify(getLocalStorage));
    setGetLocalStorage(JSON.parse(localStorage.getItem("savebook")));
  };

  return (
    <div className="container">
      {getLocalStorage.length > 0 ? (
        getLocalStorage.map((data, i) => (
          <div className="items" key={i}>
            <Card
              hoverable
              style={{
                width: 300,
                height: 820,
                marginBottom: "20px",
                marginTop: "20px",
              }}
              cover={<img alt={data.title} src={data.cover_url} />}
              title={data.authors}
              headStyle={{ fontWeight: "bold", textAlign: "center" }}
              extra={
                <Button
                  icon={<IconFavorites id={data.id} />}
                  onClick={(e) => {
                    e.preventDefault();
                    onClickFavorites(data.id);
                  }}
                ></Button>
              }
            >
              <Meta title={data.title} description={data.description} />
              <Collapse style={{ margin: "20px auto" }} accordion>
                <Panel
                  header="Summary Books"
                  key="1"
                  style={{ maxHeight: 300, overflow: "scroll" }}
                >
                  {data.sections?.map((data, i) => (
                    <ul key={i}>
                      <li>
                        <b style={{ textTransform: "capitalize" }}>
                          {data.title}
                        </b>
                      </li>
                      <p>{data.content}</p>
                    </ul>
                  ))}
                </Panel>
              </Collapse>
            </Card>
          </div>
        ))
      ) : (
        <>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            imageStyle={{
              height: 60,
            }}
            description={<h1>You haven't bookmarked any books yet </h1>}
          >
            <Button type="primary">
              <Link to="/">Bookmark Now</Link>
            </Button>
          </Empty>
        </>
      )}
    </div>
  );
}

export default Bookmark;
