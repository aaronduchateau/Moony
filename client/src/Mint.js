import React, { PureComponent } from 'react';

export default class Mint extends PureComponent {

    render() {
      return (
        <div className="safe-scoped-admin" style={{}}>
        <div className="sc-hlWvWH dgxEoC" style={{}}>
           <nav className="sc-bqyKva ehfErK">
              <button aria-haspopup="true" aria-controls="menu--1" className="sc-dIUggk XavQL" data-reach-menu-button type="button" id="menu-button--menu--1"><img src="/static/media/hamburger-menu.a6e58607.svg" alt="Menu" /></button><a className="sc-kstrdz btjemE" href="/"><img src="/static/media/main-logo.2456a3ce.png" className="sc-hBEYos dWjUC" /></a>
              <ul className="sc-fodVxV cYLuAZ">
                 <li className="sc-fFubgz bjNVbG"><a id="nav-link" href="/token">Token</a></li>
                 <li className="sc-fFubgz bjNVbG"><a aria-current="page" id="nav-link__active" href="/mint">Mint</a></li>
                 <li className="sc-fFubgz bjNVbG"><a id="nav-link" href="/game-theory">Game Theory</a></li>
                 <li className="sc-fFubgz bjNVbG"><a id="nav-link" href="/universe/lore">Lore</a></li>
                 <li className="sc-fFubgz bjNVbG"><a id="nav-link" href="/chainbinders">Chainbinders</a></li>
                 <li className="sc-fFubgz bjNVbG"><a href="https://degacha.com/" target="_blank" color="#FF97C3" className="sc-bkzZxe juJNvI">DokiDoki <img src="/static/media/link.7ed4ece8.svg" alt="" /></a></li>
              </ul>
              <div className="sc-jrAGrp dXWCyY">
                 <div className="sc-dQppl cQZIoF"><img src="/static/media/united-states.3b5a3c1c.svg" className="sc-kEjbxe jbJDWL" /><img src="/static/media/arrow-down.6d4d3720.svg" alt="arrow down" /></div>
                 <button className="sc-pFZIQ gIPckd">
                    <div className="sc-fubCfw irPtrP">Connect<img src="/static/media/metamask.3a420b46.svg" alt="metamask icon" className="sc-eCssSg hmocIu" /></div>
                 </button>
                 <button className="sc-jSgupP ckDfJz"><img src="/static/media/metamask.3a420b46.svg" alt="log in" className="sc-iBPRYJ cOWINi" /></button>
              </div>
           </nav>
           <main className="sc-iitrsy eGMabU">
              <div>
                 <section className="mint-container">
                    <div className="mint-centerContainer">
                       <div className="mint-raise">
                          <div className="sc-fWPcDo cgpajZ total-raised">
                             <h3 className="sc-cbDGPM eTEuVf">Total Raised</h3>
                             <div className="mint-cardGroup">
                                <h4 color="#FFFFFF" className="sc-gyUeRy sc-dcwrBW gNiLOP">3079 ETH</h4>
                                <p className="sc-ehsPrw conNwD">$7,416,614.85 USD</p>
                             </div>
                          </div>
                          <div className="sc-fWPcDo cgpajZ time-remaining">
                             <h3 className="sc-cbDGPM eTEuVf">Time Remaining</h3>
                             <div className="mint-cardGroup">
                                <h4 color="#FFFFFF" className="sc-gyUeRy gNiLOP">13D, 21H, 20M, 4S</h4>
                             </div>
                          </div>
                       </div>
                       <div className="mint-balances">
                          <div className="sc-fWPcDo cgpajZ eth-balance">
                             <h3 className="sc-cbDGPM eTEuVf">Your ETH Balance</h3>
                             <div className="mint-token">
                                <div className="mint-cardGroup">
                                   <p className="sc-httYMd hWhdES">-</p>
                                </div>
                             </div>
                          </div>
                          <div className="sc-fWPcDo cgpajZ bnd-balance">
                             <h3 className="sc-cbDGPM eTEuVf">Your BND Balance</h3>
                             <div className="mint-token">
                                <div className="mint-cardGroup">
                                   <p className="sc-httYMd hWhdES">-</p>
                                </div>
                             </div>
                          </div>
                       </div>
                       <div className="sc-hjWSAi jEjURK mint-wrapper">
                          <h1 title="MINT BND" className="sc-citwmv kajamm sc-iumJyn exCtUA">MINT BND</h1>
                          <div className="sc-gGTGfU fSjCQg">
                             <label className="sc-gsBrbv dgedbA">
                                FROM
                                <div className="sc-kmASHI eeGfwZ">
                                   <input placeholder={0.0} className="sc-aKZfe cNrEqm mint-numberInput" defaultValue />
                                   <div className="mint-token">
                                      <img src="/static/media/small-eth.8223cd8c.svg" className="mint-tokenImage" alt="eth icon" />
                                      <h2 className="sc-iIEYCM dQOubi">ETH</h2>
                                   </div>
                                </div>
                             </label>
                             <div className="sc-JooDp huvkpK"><img src="/static/media/arrow.2500015f.svg" className="sc-ihnbgO dWVYgZ" /></div>
                             <label className="sc-dwcuIR jktQCG">
                                TO
                                <div className="sc-eltcbb iORAaW">
                                   <input disabled className="sc-jtHMlw jaQVoM mint-numberInput" defaultValue={0} />
                                   <div className="mint-token">
                                      <img src="/static/media/small-bnd.8be8d932.svg" className="mint-tokenImage" alt="bnd token icon" />
                                      <h2 className="sc-kUbhmq jEqguw">BND</h2>
                                   </div>
                                </div>
                             </label>
                             <table className="sc-cKZHah iYAzYL">
                                <thead>
                                   <tr>
                                      <th>Item </th>
                                      <th>Eth Price </th>
                                      <th>USD Price </th>
                                   </tr>
                                </thead>
                                <tbody>
                                   <tr>
                                      <td>BND Price </td>
                                      <td className="sc-kiYtDG hHYCJM">0.004166 ETH</td>
                                      <td className="sc-kiYtDG hHYCJM">$10.03 USD</td>
                                   </tr>
                                   <tr>
                                      <td> Gas Price </td>
                                      <td className="sc-kiYtDG hHYCJM">≈ 0.0 ETH</td>
                                      <td className="sc-kiYtDG hHYCJM">≈ $0 USD</td>
                                   </tr>
                                   <tr>
                                      <td>Total Cost</td>
                                      <td className="sc-kiYtDG hHYCJM">0.0 ETH</td>
                                      <td className="sc-kiYtDG hHYCJM">$0 USD</td>
                                   </tr>
                                </tbody>
                             </table>
                             <button className="sc-cvJHqN sc-fybufo chLVAp evIhwh">CONNECT WALLET <img src="/static/media/metamask.3a420b46.svg" alt="metamask icon" className="sc-gIRixj beiVbL" /></button>
                          </div>
                       </div>
                       <div className="mint-leftside">
                          <div className="sc-fWPcDo cgpajZ tokens-minted">
                             <h3 className="sc-cbDGPM eTEuVf">BND Tokens Minted</h3>
                             <div className="mint-cardGroup">
                                <h4 color="#FFFFFF" className="sc-gyUeRy gNiLOP">1139049 BND</h4>
                             </div>
                          </div>
                          <div className="sc-fWPcDo cgpajZ current-price-bnd">
                             <h3 className="sc-cbDGPM eTEuVf">Current BND Price </h3>
                             <div className="mint-cardGroup">
                                <br />
                                <p className="sc-httYMd sc-gkdzZj iRdocJ cmAEMu">0.004166 BND/ETH</p>
                                <p className="sc-eWVKcp hqFZpw">$10.03 USD</p>
                                <a className="sc-flMoUE ciwbCw" href="/token">How is price calculated?</a>
                             </div>
                          </div>
                          <div className="sc-fKFyDc nwOmR sc-iGctRS fpSvqg">
                             <h3 className="sc-cbDGPM eTEuVf">LGE Structure </h3>
                             <div className="sc-eWvPJL hgQjmC"><img src="/static/media/LGE-new.b55cade0.svg" alt="pie chart of how funds are distributed" className="sc-irlOZD jUdyne mint-chart" /></div>
                          </div>
                       </div>
                    </div>
                 </section>
              </div>
           </main>
           <footer className="sc-bdfBwQ cIKpxU">
              <p className="sc-gsTCUz bhdLno footer-copyright">A product of Doki Doki ©. Copyright 2021</p>
              <div className="sc-hKgILt gTLZXx"><a href="https://twitter.com/Chainbinders" target="_blank" rel="noreferrer"><img src="/static/media/twitter-icon.71d7b4ce.svg" alt="twitter icon" className="sc-dlfnbm bcaJjD" /></a><a href="https://t.me/ddnfg" target="_blank" rel="noreferrer"><img src="/static/media/telegram-icon.8b6ea8ac.svg" alt="discord icon" className="sc-dlfnbm bcaJjD" /></a><a href="https://www.youtube.com/channel/UCHKQaCYkq3zuHOi77aJ3cUA" target="_blank" rel="noreferrer"><img src="/static/media/youtube-icon.99f38396.svg" alt="youtube icon" className="sc-dlfnbm bcaJjD" /></a></div>
           </footer>
        </div>
     </div>
        );
    }
};



