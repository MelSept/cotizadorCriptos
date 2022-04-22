import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import Formulary from "./components/Formulary/Formulary";
import Result from "./components/Result/Result";
import Spinner from "./components/Spinner/Spinner";
import ImageCripto from "./assets/images/imagen-criptos.png";

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Image = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;

const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

function App() {
  const [coins, setCoins] = useState({});
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("las monedas cambiaron");
    if (Object.keys(coins).length > 0) {
      const quoteCrypto = async () => {
        setLoading(true);
        setResult({});
        const { coin, cryptocurrency } = coins;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptocurrency}&tsyms=${coin}`;

        const response = await fetch(url);
        const result = await response.json();

        setResult(result.DISPLAY[cryptocurrency][coin]);
        setLoading(false);
      };
      quoteCrypto();
    }
  }, [coins]); //lista de dependencias, si una de ellas cambia se ejecuta de nuevo.

  return (
    <Container>
      <Image src={ImageCripto} alt="imagen criptomonedas" />

      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulary setCoins={setCoins} />

        {loading && <Spinner />}
        {result.PRICE && <Result result={result} />}
      </div>
    </Container>
  );
}

export default App;
