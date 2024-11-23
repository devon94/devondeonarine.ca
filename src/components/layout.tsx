import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'
import Meta from '@devondeonarine/components/meta'


interface Props {
}

const Main = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Layout: React.FunctionComponent<Props> = (props) => {
  const { children } = props
  return (
    <>
      <Meta />
      <Head>
        <title>Devon Deonarine</title>
      </Head>
      <Main>{children}</Main>
    </>
  )
}

export default Layout