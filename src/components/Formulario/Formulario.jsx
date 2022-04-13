import styled from "@emotion/styled"

const InputSubmit = styled.input `
    background-color:#9497ff;
    border:none;
    

`

const Formulario = () => {
  return (
    <form>
        <InputSubmit
            type="submit"
            value="Cotizar"
        />
    </form>
  )
}

export default Formulario