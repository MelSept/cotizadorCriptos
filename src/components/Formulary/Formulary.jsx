import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Error from "../Error/Error";
import useSelectCoins from "../../hooks/useSelectCoins";

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 30px;

  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;

//componente funcional Formulario
const Formulary = ({ setCoins }) => {
  const coins = [
    { id: "USD", name: "Dolar Estado Unidense" },
    { id: "MXN", name: "Peso Mexicano" },
    { id: "ARS", name: "Peso Argentino" },
    { id: "EUR", name: "Euro" },
  ];

  //useState es el hook de react
  const [cryptos, setCryptos] = useState([]);
  const [error, setError] = useState(false);

  //useSelectMonedas es un custom hook. Creado por mi

  const [coin, SelectCoins] = useSelectCoins("Elige tu moneda", coins);
  const [cryptocurrency, SelectCryptocurrency] = useSelectCoins(
    "Elige tu CriptoMoneda",
    cryptos
  );

  //useEffect es creado por react
  //para poder usar await necesito poner async (asincronico) en la funcion

  useEffect(() => {
    const consultAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const response = await fetch(url);
      const result = await response.json();

      const arrayCryptos = result.Data.map((crypto) => {
        const object = {
          id: crypto.CoinInfo.Name,
          name: crypto.CoinInfo.FullName,
        };
        return object;
      });
      setCryptos(arrayCryptos);
    };
    consultAPI();
  }, []); // se ejecuta una sola vez porque no tiene dependencias

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([coin, cryptocurrency].includes("")) {
      setError(true);
      return;
    }
    setError(false);
    setCoins({ coin, cryptocurrency });
  };

  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}
      <form onSubmit={handleSubmit}>
        <SelectCoins />
        <SelectCryptocurrency />
        <InputSubmit type="submit" value="Cotizar" />
      </form>
    </>
  );
};

export default Formulary;
