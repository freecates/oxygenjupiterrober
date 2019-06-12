import React from 'react'
import Link from 'next/link'
import SingleModal from './SingleModal'

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link prefetch href="/">
          <a>Home</a>
        </Link>
      </li>
      <ul>
        <li>
          <React.Fragment>
            <SingleModal
              singleModalItems={[
                {
                  id: '01',
                  name: 'About',
                  items: [
                    {
                      id: '0101',
                      name: 'Jupiter Rober ReactJS',
                      file: 'readme.md',
                      class: 'left'
                    }
                  ],
                  class: 'left'
                }
              ]}
            />
          </React.Fragment>
        </li>
      </ul>
    </ul>

    <style jsx>{`
      nav {
        text-align: center;
      }
      ul {
        margin: 0;
        display: flex;
        justify-content: space-between;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
      }
    `}</style>
  </nav>
)

export default Nav
