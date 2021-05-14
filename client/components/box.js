import React, { useState } from "react";
import Image from "next/image";
import ReactStars from "react-rating-stars-component";

export const Box = ({ book }) => {
  return (
    <div className="tile is-parent is-fixed-size ">
      <a className={`tile is-child box outer is-clickable `}>
        <div className=" is-flex is-flex-direction-column is-fixed-size inner ">
          <h1>
            <Image src={book[7]} width={120} height={120} />
          </h1>
          <h1
            className={`mt-2 title is-4 is-flex-grow-1 has-text-primary-light `}
          >
            {book[0]}
          </h1>

          <h3 className="title is-5  ">{book[1]}</h3>
          <h3 className="subtitle is-6"> {book[2]} </h3>
          <h3 className="subtitle is-7"></h3>
          <ReactStars
            classNames="is-align-self-baseline"
            count={5}
            value={Math.round(book[3] * 2) / 2}
            isHalf={true}
            edit={false}
            size={24}
            activeColor="#ffd700"
          />
        </div>
      </a>
    </div>
  );
};
