import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            Tripoteka <br className="max-md:hidden" />
            <span className="orange_gradient text-center">Teme o kojima se priča</span>
        </h1>
        <p className="desc text-center">
           Mesto gde se mogu postaviti pitanja i dobiti 
           odgovori.Odgovori koje želite da čujete.Vizija bez akcije je samo halucinacija.
        </p>
      <Feed/>
    </section>
  )
}

export default Home
