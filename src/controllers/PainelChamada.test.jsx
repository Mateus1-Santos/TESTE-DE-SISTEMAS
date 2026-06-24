import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PainelChamada from './PainelChamada.jsx'

test('o painel aparece com Presentes: 0', () => {
  render(<PainelChamada />)

  expect(screen.getByText('Presentes: 0')).toBeInTheDocument()
})

test('os dois botões existem: Marcar presença e Fechar chamada', () => {
  render(<PainelChamada />)

  expect(
    screen.getByRole('button', { name: 'Marcar presença' }),
  ).toBeInTheDocument()
  expect(
    screen.getByRole('button', { name: 'Fechar chamada' }),
  ).toBeInTheDocument()
})

test('Marcar presença soma 1 a cada clique', async () => {
  const user = userEvent.setup()

  render(<PainelChamada />)

  expect(screen.getByText('Presentes: 0')).toBeInTheDocument()

  const botaoMarcar = screen.getByRole('button', { name: 'Marcar presença' }) // const botaoFechar = screen.getByRole('button', { name: 'Fechar chamada' })

  await user.click(botaoMarcar) // clica no botao e espqera o resultado
  await user.click(botaoMarcar) // clica novamente

  expect(screen.getByText('Presentes: 2')).toBeInTheDocument() // verifica se o texto atualizado com o total correto aparece
})

test('Fechar chamada avisa o sistema com o total correto', async () => {
  const espiao = jest.fn() // cria uma função espiã para verificar se foi chamada corretamente
  const user = userEvent.setup() // configura o userEvent para simular cliques

  render(<PainelChamada onFecharChamada={espiao} />) // renderiza o componente passando a função espiã como prop

  const botaoMarcar = screen.getByRole('button', { name: 'Marcar presença' }) // const botaoFechar = screen.getByRole('button', { name: 'Fechar chamada' })
  const botaoFechar = screen.getByRole('button', { name: 'Fechar chamada' })

  await user.click(botaoMarcar)
  await user.click(botaoFechar)

  expect(espiao).toHaveBeenCalledTimes(1) //verifica que o espião foi chamado exatamente 1 vez
  expect(espiao).toHaveBeenCalledWith(1) //verifica que foi chamado com o valor 1 (o total)
})

test('Fluxo completo: não avisa antes, marca 3 e fecha avisando 3', async () => {
  const espiao = jest.fn() // cria uma função espiã para verificar se foi chamada corretamente
  const user = userEvent.setup() // configura o userEvent para simular cliques

  render(<PainelChamada onFecharChamada={espiao} />)

  expect(espiao).not.toHaveBeenCalled() //verifica que o espião não foi chamado antes de clicar em fechar chamada

  const botaoMarcar = screen.getByRole('button', { name: 'Marcar presença' })
  const botaoFechar = screen.getByRole('button', { name: 'Fechar chamada' })

  await user.click(botaoMarcar)
  await user.click(botaoMarcar)
  await user.click(botaoMarcar)

  expect(screen.getByText('Presentes: 3')).toBeInTheDocument()

  await user.click(botaoFechar)

  expect(espiao).toHaveBeenCalledTimes(1) 
  expect(espiao).toHaveBeenCalledWith(3)
})
