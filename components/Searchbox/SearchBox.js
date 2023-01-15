import React, { useState, useEffect } from "react";
// import SearchIcon from "@mui/icons-material/Search";
import style from "./SearchBox.module.css";
import { useRouter } from "next/router";
import {SearchOutlined} from '@ant-design/icons'

function SearchBox({searchHandler,setKeyword}) {
  const router = useRouter();
  const [cat, setCat] = useState("");
  const { category, page } = router.query;
  const [openSearch, setOpenSearch] = useState(false);

  const [pages, setPages] =useState("")
  console.log("category", category)




  return (
    <form className={style.form} onSubmit={searchHandler}>
      <div className={style.searchBox}>
        <input
          type="text"
          placeholder="Search Here ... "
          className={style.searchInput}
          onChange={(e) => setKeyword(e.target.value)}
          id="input"
        />
        <button className={style.searchBtn} type="submit">
        <SearchOutlined />
        </button>
      </div>
    </form>
  );
}

export default SearchBox;
