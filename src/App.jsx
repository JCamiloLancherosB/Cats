import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [catFact, setCatFact] = useState('');
  const [catImageUrl, setCatImageUrl] = useState('');

  useEffect(()=>{
    const fetchCatFact = async() => {
      try {
          const response = await fetch('https://catfact.ninja/fact');
          const data = await response.json();
          setCatFact(data.fact);
        } catch (error) {
        console.error(error);
          }
    };
    fetchCatFact();

  }, [setCatFact]);


  useEffect(() => {
    
    // if(catFact) {
      const generateCatImage = async() => {
        try{
          if(catFact) {
          const firstWord = catFact.split(' ', 3).join(' ');
          const response = await fetch(`https://cataas.com/cat/says/${firstWord}`);

          if(response.ok) {
            const data = await response.blob();
            const imageUrl = URL.createObjectURL(data);
            setCatImageUrl(imageUrl);
          }else console.error('Error fetching cat image: ', response.statusText);
        }
        } catch(error) {
          console.error(error);
        }
      };
      generateCatImage();
    // }
  }, [catFact]);

  const fetchNewFact = async () => {
    try {
      const response = await fetch('https://catfact.ninja/fact');
      if (response.ok) {
        const data = await response.json();
        setCatFact(data.fact);
      } else {
        console.error('Error fetching cat fact:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching cat fact:', error);
    }
  };

  const handleRefresh = () => {
    fetchNewFact();
    clearInterval(nIntervId);
  }
  //Agregando un arreglo para los timeOuts, para poder pararlos al momento de salir del botón
  let timeouts = [];
  //Para que se repita todo el tiempo el cambio de colores, debo agregar un intervalo, también tendré que añadir una variable para después poder detener el intervalo, para que no vaya a ser infinito
  let nIntervId;

  const assign = (e) => {
    const color = () => {
      e.target.setAttribute("class", "firstColor")
    const timeOut1 = setTimeout(() => {
      e.target.setAttribute("class", "catGrayBlue");
    }, 200)
    const timeOut2 = setTimeout(() => {
      e.target.setAttribute("class", "catBrownSoft");
    }, 400)
    const timeOut3 = setTimeout(() => {
      e.target.setAttribute("class", "catGreen");
    }, 600)
    const timeOut4 = setTimeout(() => {
      e.target.setAttribute("class", "catOrange");
    }, 800)
    const timeOut5 = setTimeout(() => {
      e.target.setAttribute("class", "catMultiColor");
    }, 1000)
    timeouts.push(timeOut1, timeOut2, timeOut3, timeOut4, timeOut5);
    }
    color();
    nIntervId = setInterval(color, 1200);
  }
  
  const deassign = (e) => {
    timeouts.forEach(timeoutId => {
      clearTimeout(timeoutId);
    });
    timeouts = [];
    e.target.setAttribute('class', '');
    clearInterval(nIntervId)
  }

  return(
    <>
    <h1>Random Cat Fact</h1>
    {catFact && <p> {catFact} </p> }
    {catImageUrl && (<img src={catImageUrl} alt='random cat' width={400} height={400}/>)}
    {catImageUrl && <p>Image generated base on the first word of the fact.</p>}    
    <button onClick={handleRefresh} onMouseOver={assign} onMouseOut={deassign}>I want see another cat</button>
    </>
  );
}

export default App;
