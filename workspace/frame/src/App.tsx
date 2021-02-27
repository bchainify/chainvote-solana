import React, { useState, useEffect, useCallback } from 'react'
import clsx from 'clsx'
import { find, keys } from 'lodash-es'
const manifest = require('@decentology/dappstarter-dapplib/manifest.json')

enum View {
  Client,
  Server,
  Connector,
  Contract,
  Logs,
}

const viewLinks = {
  [View.Client]: 'http://localhost:5001',
  [View.Server]: 'http://localhost:5002',
  [View.Connector]: '',
  [View.Contract]: '',
  [View.Logs]: '',
}
interface ISiteReady {
  [index: number]: boolean
}

export const App: React.FC = () => {
  const [selected, setSelected] = useState<View>(View.Client)
  const [dappReady, setDappReady] = useState<ISiteReady>({ 2: true })
  const blockchain = find(keys(manifest.blocks), /\/blockchains\//)
    ?.toString()
    .split('/')[2]

  let network = ''; 
  const logo = (blockchain: String) => {
    switch(blockchain.toLowerCase()) {
      case "flow": return "https://info.decentology.com/assets/blockchains/flow/flow-dappstarter.png";
      case "ethereum": return "https://info.decentology.com/assets/blockchains/ethereum/ethereum-dappstarter.png";
      case "matic": return "https://info.decentology.com/assets/blockchains/matic/matic-dappstarter.png";
      case "solana": network='devnet'; return "https://info.decentology.com/assets/blockchains/solana/solana-dappstarter.png";
      case "conflux": return "https://info.decentology.com/assets/blockchains/conflux/conflux-dappstarter.png";
    }
  }

  const checkAppReady = useCallback(async (view: View) => {
    try {
      const response = await fetch(viewLinks[view])
      if (response.ok) {
        setDappReady((dappReady) => {
          return { ...dappReady, [view]: true }
        })
      } else {
        setTimeout(() => checkAppReady(view), 1000)
      }
    } catch (error) {
      setTimeout(() => checkAppReady(view), 1000)
    }
  }, [])

  useEffect(() => {
    checkAppReady(View.Client)
    checkAppReady(View.Server)
  }, [checkAppReady])

  return (
    <div>
      <header>
        <div className="logo">
          <img src="./decentology-logo-light.svg" width="133" alt="logo" />
        </div>
        <nav>
          <ul>
            <li className={clsx({ active: selected === View.Client })}>
              <button title="Client" onClick={() => setSelected(View.Client)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#51C3F2"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="svg-icon feather feather-layout"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
              </button>
            </li>
            <li className={clsx({ active: selected === View.Server })}>
              <button title="Server" onClick={() => setSelected(View.Server)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#70D2B8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="svg-icon feather feather-code"
                >
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </button>
            </li>
          </ul>
        </nav>
        <div className="account">
          <div>
            <span className="avatar">
              <img
                src={ logo(String(blockchain)) }
                alt=""
              />
            </span>
            <div className="capitalize">
              <strong>{manifest.name}</strong>
              <span>{blockchain}</span>
              <span>{network}</span>
            </div>
          </div>
          <a
            href="http://dappstarter.decentology.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-cog text-xl"></i>
          </a>
        </div>
      </header>
      <main>
        <div className="main-header">
          <h2>
            {View[selected]} <span>Preview</span>
          </h2>
          <a
            className="full"
            target="_blank"
            href={viewLinks[selected]}
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="svg-icon feather feather-arrow-up-right"
            >
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </a>
        </div>
        <div
          className={clsx('main-iframe', { hidden: selected !== View.Client })}
        >
          {dappReady[View.Client] ? (
            <iframe
              src={viewLinks[View.Client]}
              title="client"
              height="100%"
              width="100%"
            ></iframe>
          ) : (
            <div className="flex justify-center h-full items-center ">
              <i className="fas fa-spinner fa-spin text-yellow-400 text-5xl"></i>
            </div>
          )}
        </div>
        <div
          className={clsx('main-iframe', { hidden: selected !== View.Server })}
        >
          {dappReady[View.Server] ? (
            <iframe
              src={viewLinks[View.Server]}
              title="server"
              height="100%"
              width="100%"
            ></iframe>
          ) : (
            <div className="flex justify-center h-full items-center ">
              <i className="fas fa-spinner fa-spin text-yellow-400 text-5xl"></i>
            </div>
          )}
        </div>
        <div className="main-footer">
          <div className="docs">
            <a href="https://support.decentology.com/">Support Documentation</a>
          </div>
          <span className="footer-left">Powered by Decentology</span>
          <span className="footer-right">
            <a href="https://www.decentology.com">www.decentology.com</a>
          </span>
        </div>
      </main>
    </div>
  )
}
