import { GetEdgePropsFunc } from "flareact";

type BeerModel = {
  price: number;
  name: string;
  rating: {
    average: number;
    reviews: number;
  };
  image: string;
};
type CatFact = {
  fact: string;
  length: number;
};
type IndexPageProps = {
  // beers: BeerModel[];
  catFact: CatFact;
};

export const getEdgeProps: GetEdgePropsFunc<IndexPageProps> = async (ctx) => {
  const fact = (await // await fetch("https://api.sampleapis.com/beers/ale")
  (await fetch("https://catfact.ninja/fact"))?.json()) as CatFact;

  console.debug(ctx.query);

  return {
    props: {
      // beers: beers,
      catFact: fact,
    },
    customHeaders: {
      cookie: "",
    },
  };
};

export default function Index({ catFact }: IndexPageProps) {
  return (
    <>
      <h1>You're running React on the Edge!</h1>
      {/* <h3>We found {beers.length == 1 ? "1 Beer" : `${beers.length} Beers`}</h3> */}
      <h3>Cat Fact: {catFact.fact}</h3>
    </>
  );
}
