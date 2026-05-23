import React, { Component, useCallback, useState } from 'react'

type FooProps = Record<string, never>
type Foo2Props = { label: string }

export class Foo extends Component<FooProps> {
  static getDerivedStateFromProps() {
    return null
  }

  foo = 1
  bar = 2

  constructor(props: FooProps) {
    super(props)
    console.log('foo')
  }

  componentDidMount() {
    console.log('mounted')
  }

  lala = () => {
    console.log(this.foo, this.bar)
  }

  renderFoo() {
    return <div>Foo</div>
  }

  render() {
    return (
      <div>
        bar
        {this.renderFoo()}
        <button type='button'>click</button>
      </div>
    )
  }
}

const Foo2 = ({ label }: Foo2Props) => {
  const [count, setCount] = useState(0)
  const onClick = useCallback(() => {
    setCount((current) => current + 1)
  }, [])

  return (
    <button type='button' onClick={onClick}>
      {label}: {count}
    </button>
  )
}

export { Foo2 }
