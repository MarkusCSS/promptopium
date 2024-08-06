import Provider from "@components/Provider";
import Nav from '@components/Nav';
import '@styles/globals.css';
 const metadata = {
  title: "Promptopia",
  description:'Discover & Share AI Prompts'
}

const RootLayout = ({children}) => {
  return (
    <html lang='en'>
      <link rel="icon" href="./images/logo.svg" />
      <title>Tripoteka</title>
      <body>
      <Provider>
        <div className='main'>
            <div className="gradient"/>
        </div>
        <main className="app">
        <Nav/>
        {children}
        </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout
