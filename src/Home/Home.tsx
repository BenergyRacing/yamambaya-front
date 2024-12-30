import { useState, useEffect } from 'react';
import logo from '../assets/logo-benergy-horizontal.png'
import Timer from './Timer.tsx'

function Home() {

  const [testsHistory, setTestsHistory] = useState<any[]>([]); // Estado para armazenar os treinos
  const [testOn, setTestOn] = useState<any>([]); // Estado para armazenar os treinos

  useEffect(() => {
    // Função para buscar dados da API
    const fetchTests = async () => {
      try {
        const response = await fetch('http://localhost:8000/test/minimal/'); // Substitua pela URL da sua API
        const data: any = await response.json(); // Tipifica os dados recebidos
        const tests: any[] = data.data

        setTestOn(tests.filter(test => !test.Finshed)[0]); // Atualiza o estado com os dados da API
        setTestsHistory(tests.filter(test => test.Finshed)); // Atualiza o estado com os dados da API
      } catch (error) {
        console.error('Erro ao buscar os testes:', error);
      }
    };

    fetchTests(); // Chama a função ao montar o componente
  }, []); // O array vazio garante que o efeito será executado apenas uma vez

  return (
    <>
      <img className='logo' src={logo} alt="Logo" />

      <div className='main-title first-title'>
        <span className='title'>
          Iniciar treino:
        </span>
      </div>

      <button className='main-button'>
        {
          testOn != undefined ?
            (
              <div>
                <span className='title button-text'>{testOn.Test}</span>
                <br />
                <span className='button-text'>{testOn.Name}</span>
                <br />
                <br />
                <Timer dateStart={testOn.DateStart} />
              </div>
            ) :
            (
              <span className='title button-text'>
                PARA INICIAR UM TREINO
                <br /><br />
                CLIQUE AQUI
              </span>
            )
        }

      </button>

      <div className='main-title'>
        <span className='title'>
          Treinos passados:
        </span>
      </div>
      <div>
        {
          testsHistory.map((test, index) => (
            <button key={index} className='main-button'>
              <span className='title button-text'>{test.Test}</span>
              <br />
              <span className='button-text'>{test.Name}</span>
              <br />
              <br />
              <span className='button-text'>{new Date(test.DateStart).toLocaleDateString("pt-br")} - {test.Pilots}</span>
            </button>
          ))
        }
      </div>
    </>
  )
}

export default Home