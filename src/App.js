import React, { useEffect, useState } from "react";
import {getHomeList, getMovieInfo} from "./Tmdb";
import MovieRow from "./components/movierow/MovieRow";

import "./App.css"
import FeaturedMovie from "./components/featuredmovie/featuredMovie";
import Header from "./components/Header/Header";

function App() {

    const[movieList, setMovieList] = useState([]);
    const [featuredData, setFeaturedData] = useState(null)
    const [blackHeader, setBlackHeader] = useState(false)

  useEffect(() => {
    const loadAll = async () => {
      // pegando a lista total
      let list = await getHomeList();
      setMovieList(list);

      // pegando o featured
       let originals = list.filter(i => i.slug === 'originals')
       let randonChosen = Math.floor(Math.random() * (originals[0].items.results.length -1))
        let chosen = originals[0].items.results[randonChosen]
        let chosenInfo = await getMovieInfo(chosen.id, 'tv')
        setFeaturedData(chosenInfo)
      }

    loadAll();
  }, []);

  useEffect (() => {
    const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true);
      } else {
        setBlackHeader(false)
      }
    }
    window.addEventListener('scroll', scrollListener)
    return() => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, []);

  return (
    <div className="page">
      <Header
        black={blackHeader}
      />
        {featuredData &&
          <FeaturedMovie
            item={featuredData}
          />
        }
        <section className="lists"> 
            {movieList.map((item, key) => (
                <MovieRow key={key} title={item.title} items={item.items} />
            ))}
        </section>
        <footer>
              Feito com <span role="img" aria-label="coração">♥</span> pelo B7web <br/>
              Direitos de imagem para Netflix<br/>
              Dados pegos do site Themoviedb.org
        </footer>
        {movieList.length <= 0 &&
          <div className="loading">
            <img src="https://media.filmelier.com/noticias/br/2020/03/netflix-loading.gif" alt="Carregando" />
          </div>
        }
    </div>
    );
};

export default App;
