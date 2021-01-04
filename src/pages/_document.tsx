import Document, { Html, Head, Main, NextScript } from 'next/document'
import styled, { ServerStyleSheet } from "styled-components"

interface Props {
  styleTags: Array<React.ReactElement<{}>>
}

const Body = styled.body`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

export default class MyDocument extends Document<Props> {
  static getInitialProps({ renderPage }) {
    // Step 1: Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet();

    // Step 2: Retrieve styles from components in the page
    const page = renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />),
    );

    // Step 3: Extract the styles as <style> tags
    const styleTags = sheet.getStyleElement();

    // Step 4: Pass styleTags as a prop
    return { ...page, styleTags };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {this.props.styleTags}
        </Head>
        <Body>
          <Main />
          <NextScript />
        </Body>
      </Html>
    )
  }
}
