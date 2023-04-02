import React from "react";

const HeroCard = () => {
  return (
    <div>
      <div className="card overflow-hidden w-96 shadow-xl">
        <figure>
          <img
            src="/card-bg.jpg"
            className="inset-0 bg-gray-900 opacity-80"
            alt="post-bg"
          />
        </figure>
        <div className="card-body absolute bottom-0">
          <h2 className="card-title text-white">Shoes!</h2>
          <h2 className="text-white">
            If a dog chews shoes whose shoes does he choose?
          </h2>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
