import React, { useEffect, useState } from "react";
import { Layout, Input, Pagination } from "antd";
import { callAPI } from "./lib/api/baseApi";
import api from "./lib/utils/endPoint";
import CardData from "./components/CardData";
const { Content } = Layout;

export default function App() {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(8);
  const [book, setBook] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const { Search } = Input;

  useEffect(() => {
    getBook();
  }, []);

  const getBook = async () => {
    const response = await callAPI(api.BASEURL + api.ENDPOINT.categories);
    for (let i = 0; i < response.length; i++) {
      const element = response[i];
      const getBook = await callAPI(
        `${api.BASEURL}${api.ENDPOINT.book}?size=*&categoryId=${element.id}&page=*`
      );
      setBook(getBook);
      setTotalPage(getBook?.length);
    }
  };

  const handleChangePage = (value) => {
    if (value <= 1) {
      setMinValue(0);
      setMaxValue(8);
    } else {
      setMinValue(maxValue);
      setMaxValue(maxValue + 8);
    }
  };

  const onSearch = (value) => {
    setSearchInput(value);
    if (value !== "") {
      const propsToCheck = ["title", "authors"];
      const filteredData = book?.filter((o) =>
        propsToCheck.some((k) =>
          String(o[k]).toLowerCase().includes(value.toLowerCase())
        )
      );
      setFilteredResults(filteredData);
      setTotalPage(filteredData?.length);
    } else {
      setFilteredResults(book);
      setTotalPage(book?.length);
    }
  };

  return (
    <div>
      <Search
        className="search"
        placeholder="Search e.g title or authors"
        allowClear
        enterButton="Search"
        onSearch={onSearch}
        onChange={(e) => onSearch(e.target.value)}
      />
      <Content>
        <CardData
          dataBook={book ? book : null}
          minValue={minValue}
          maxValue={maxValue}
          searchInput={searchInput}
          searchData={filteredResults}
        />
      </Content>
      <Pagination
        responsive={true}
        pageSize={8}
        defaultPageSize={8}
        onChange={handleChangePage}
        showSizeChanger={false}
        total={totalPage}
        style={{ justifyContent: "center", display: "flex" }}
      />
    </div>
  );
}
