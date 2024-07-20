import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            (Ne)Kolegijalnost  <br className="max-md:hidden" />
            <span className="orange_gradient text-center">Teme o kojima se priča</span>
        </h1>
        <p className="desc text-center">
           Mesto gde se mogu postaviti pitanja i dobiti 
           odgovori o svemu što vas tišti, kako reagovati,
           sutprotsaviti se svakom obliku ugrožavanja na radnom mestu
        </p>
      <Feed/>
    </section>
  )
}

export default Home
