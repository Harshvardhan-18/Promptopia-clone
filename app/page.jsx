import Feed from '@components/Feed';

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & share
        <br  />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae possimus
        beatae enim blanditiis excepturi sunt nemo delectus dolorum eum?
      </p>
      <Feed />
    </section>
  );
};

export default Home;
