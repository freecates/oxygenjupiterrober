import React from 'react'
import Head from '../components/Head'
import Nav from '../components/Nav'
import Mainapp from '../components/Mainapp'

const Home = () => (
  <div>
    <Head title="Jupiter Rober ReactJS" />
    <Nav />

    <div className="hero">
      <h1 className="title">Jupiter Rober ReactJS!</h1>

      <div className="row">
        <Mainapp />
      </div>
    </div>

    <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        color: #e76557;
      }
      .title {
        text-align: center;
      }
      .row {
        max-width: 880px;
        margin: 40px auto;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
    `}</style>
  </div>
)

export default Home
