import { useState } from 'react'

type Props = { name: string }

const Demo = ({ name }: Props) => {
  const [count, setCount] = useState(0)

  const handleClick = () => setCount((c) => c + 1)

  return (
    <button type='button' onClick={handleClick}>
      {name}: {count}
    </button>
  )
}

export { Demo }
