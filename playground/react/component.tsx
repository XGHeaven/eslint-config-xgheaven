import React, { Component, useState, useMemo, useCallback } from 'react'

export class Foo extends Component {
  static getDerivedStateFromProps() {
    return null
  }

  foo = 1
  bar = 2

  constructor(props) {
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
        <button></button>
      </div>
    )
  }
}

export function Foo2(props: any) {
  const [ count, setCount ] = useState(0)
  const onClick = useCallback(() => {
    if (count > 0) {
      setCount(1)
    }
  }, [])
  return <div>foo2</div>
}
