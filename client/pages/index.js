import { useState } from "react";
import Head from "next/head";
import Select from "react-select";
import options from "../api/titles.json";
import { FixedSizeList as List } from "react-window";

import {
  getGenreRecommendations,
  listOfGenres,
  getBooksRecommendations,
  handleSaveToPC,
} from "../api/main";
import { Box } from "../components/box";
import { Grid } from "../components/grid";

export default function Home() {
  const [books, setbooks] = useState(null);
  const [value, setValue] = useState(null);
  const genres = [];

  listOfGenres.map((item) => {
    genres.push({
      label: item,
      value: item,
    });
  });

  const handleChangeGenre = async (genre) => {
    // handleSaveToPC()
    console.log(genre.value);

    const result = await getGenreRecommendations(genre.value);
    console.log(result.data);
    setbooks(result.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e.target)
    const userid = e.target[0].value;
    const title = value.value;
    console.log(title);
    const result = await getBooksRecommendations(userid, title);
    setbooks(result.data);
  };

  const customStyles = {
    container: provided => ({
      ...provided,
      width: 200
    })
  };

  const MenuList = (props) => {
    const height = 75;
    const { options, children, maxHeight, getValue } = props;
    const [value] = getValue();
    const initialOffset = options.indexOf(value) * height;

    return (
      <List
        height={maxHeight}
        itemCount={children.length}
        itemSize={height}
        initialScrollOffset={initialOffset}
      >
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </List>
    );
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="hero ">
        <div className="hero-body has-text-centered  ">
          <p className="title is-4">BooksX</p>
          <p className="subtitle is-6">Book Recommendator</p>

          <div className="columns  is-centered">
            <form
              className="field is-grouped is-grouped-multiline"
              onSubmit={handleSubmit}
            >
              <p className="control" style={{ maxWidth: "100px" }}>
                <input
                  className="input"
                  type="text"
                  placeholder="User ID"
                  required
                />
              </p>
              <p class="control" style={{ minWidth: "300px" }}>
                {/* <input
                  className="input"
                  type="text"
                  placeholder="Search Book"
                /> */}
                <Select
                  components={{ MenuList }}
                  onChange={setValue}
                  options={options}
                  isSearchable={true}
                  placeholder={"Search Book"}
                />
              </p>
              <p className="control ml-3" >
                <Select
                 styles={customStyles}
                  onChange={handleChangeGenre}
                  options={genres}
                  isSearchable={true}
                  placeholder={"Switch Genre?"}
                />
              </p>
              <p className="control">
                <button className="button is-success">Submit</button>
              </p>
            </form>
          </div>
        </div>
      </section>
      <section className="hero is-fullheight">
        <div className="hero-body container">
          {books && <Grid books={books} />}
        </div>
      </section>
    </div>
  );
}
