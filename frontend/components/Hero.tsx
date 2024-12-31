import React from "react";

interface HeroProps {
  title: string;
  description: string;
  photo: string;
}

export function Hero({
  title,
  description,
  photo,
}: Readonly<HeroProps>) {
  return (
    <section
      id="hero"
      className="text-orange-100 font-energetic"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("${photo}")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        height: "100%",
      }}
    >
      <div className="container max-w-screen-2xl mx-auto flex px-5 py-24 pt-64 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-orange-100">
            {title}
          </h1>
          <p className="mb-8 leading-relaxed">
            {description}
          </p>
          <div className="flex justify-center">
            <a
              className="inline-flex text-orange-100 bg-orange-500 hover:bg-orange-700 border-0 py-2 px-6 focus:outline-none rounded text-lg"
              href="/blog"
            >
              Read Blog
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
