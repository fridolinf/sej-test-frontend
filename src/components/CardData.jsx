import React, { useState } from "react";
import { Card, Collapse, Button, Result } from "antd";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";

const { Panel } = Collapse;
const { Meta } = Card;

function CardData({ dataBook, minValue, maxValue, searchInput, searchData }) {
  const [newBooks, setNewBooks] = useState(
    JSON.parse(localStorage.getItem("savebook"))
  );

  const onClickFavorites = (id) => {
    if (newBooks === null) {
      const matchData = dataBook.find((data) => {
        return data.id === id;
      });
      localStorage.setItem("savebook", JSON.stringify([matchData]));
      setNewBooks(JSON.parse(localStorage.getItem("savebook")));
    } else {
      dataBook.filter((data) => {
        if (data.id === id) {
          const findIndex = newBooks.findIndex((item) => item.id === data.id);
          if (findIndex === -1) {
            newBooks.push(data);
            localStorage.setItem("savebook", JSON.stringify(newBooks));
            setNewBooks(JSON.parse(localStorage.getItem("savebook")));
          } else {
            newBooks.splice(findIndex, 1);
            localStorage.setItem("savebook", JSON.stringify(newBooks));
            setNewBooks(JSON.parse(localStorage.getItem("savebook")));
          }
        }
      });
    }
  };

  function IconFavorites(id) {
    const findIndex = newBooks?.findIndex((item) => item.id === id.id);
    if (findIndex === -1 || findIndex === undefined) {
      return <HeartOutlined />;
    } else {
      return <HeartFilled />;
    }
  }

  return (
    <div className="container">
      {searchInput.length > 1 ? (
        searchData.map((data, i) => (
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
      ) : dataBook && dataBook?.length > 0 ? (
        dataBook?.slice(minValue, maxValue)?.map((data, i) => (
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
        <Result status="404" title="404" subTitle="Data not found" />
      )}
    </div>
  );
}

export default CardData;
