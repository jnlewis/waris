import Head from "next/head";
import styles from "./../styles/pages/index.style.js";

export default function Home() {
  return (
    <div className="body">
      <Head>
        <title>Waris</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
          integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2"
          crossorigin="anonymous"
        ></link>
        <script
          src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
          integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://kit.fontawesome.com/23a717da0a.js"
          crossorigin="anonymous"
        ></script>
      </Head>

      <header id="header" className="header-fixed">
        <div className="container">
          <div id="logo" className="pull-left">
            <h1>
              <a href="#intro" className="scrollto">
                Waris
              </a>
            </h1>
          </div>

          <nav id="nav-menu-container">
            <ul className="nav-menu">
              <li className="menu-active">
                <a href="#intro">Home</a>
              </li>
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#call-to-action">Developer</a>
              </li>
              <li>
                <a href="#more-features">Why Waris</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
              <li>
                <a href="/login">Login</a>
              </li>
            </ul>
          </nav>
          <nav id="nav-menu-container-mobile">
            <ul className="nav-menu">
              <li>
                <a href="/login">Login</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <section id="intro">
        <div className="intro-text">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <p style={{ fontSize: 25 + "px" }}>
                  Create Claimable Funds for the Future
                </p>
                <p style={{ fontSize: 18 + "px" }}>
                  Write wills for your loved ones, save for retirement, fund
                  your children's education.
                  <br />
                  Waris let's you do all these and more.
                </p>
                <a href="/login" className="btn-get-started scrollto">
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="product-screens">
          <div
            className="product-screen-2 wow fadeInUp"
            data-wow-delay="0.2s"
            data-wow-duration="0.6s"
          >
            <img src="/assets/img/screenshot-desktop-frame-2.jpg" />
          </div>
        </div>
      </section>

      <main id="main">
        <section id="features">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-header">
                  <h3 className="section-title">Product Highlights</h3>
                  <span className="section-divider"></span>
                  <p className="section-description">
                    Here are some things you can do with Waris.
                  </p>
                </div>
              </div>

              <div className="col-lg-10 offset-lg-1">
                <div className="row">
                  <div className="col-lg-6 col-md-6 box">
                    <div className="icon">
                      <i className="fas fa-money-check"></i>
                    </div>
                    <h4 className="title">Scheduled Payments</h4>
                    <p className="description">...</p>
                  </div>
                  <div className="col-lg-6 col-md-6 box">
                    <div className="icon">
                      <i className="fas fa-umbrella-beach"></i>
                    </div>
                    <h4 className="title">Retirement Savings</h4>
                    <p className="description">...</p>
                  </div>
                  <div className="col-lg-6 col-md-6 box">
                    <div className="icon">
                      <i className="fas fa-hand-holding-usd"></i>
                    </div>
                    <h4 className="title">Will Writing</h4>
                    <p className="description">
                      Make wills to leave assets to your loved ones for free,
                      without the hastle and fees associated with an
                      intermidiary.
                    </p>
                  </div>
                  <div className="col-lg-6 col-md-6 box">
                    <div className="icon">
                      <i className="fas fa-funnel-dollar"></i>
                    </div>
                    <h4 className="title">Windfall Management</h4>
                    <p className="description">...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="advanced-features">
          <div className="features-row section-bg">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <img
                    className="advanced-feature-img-right"
                    src="/assets/img/screenshot-desktop-mobile.png"
                  />
                  <div className="wow fadeInLeft">
                    <h2>
                      Manage your claimable funds in an easy to use interface.
                    </h2>
                    <h3>
                      Waris looks great on every platform from desktop to
                      mobile.
                    </h3>
                    <p>
                      You have full control over your funds. Create any number
                      of claimable funds, edit them at any time and on the go.
                      Invalidate funds you no longer want active.
                      <b>
                        Your claimable funds are stored and executed on the
                        blockchain without any intervention. Your decision is
                        final.
                      </b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="call-to-action">
          <div className="container">
            <div className="row">
              <div className="col-lg-9 text-center text-lg-left">
                <h3 className="cta-title">Open Source</h3>
                <p className="cta-text">
                  Waris is open source to maintain the highest level of
                  transparency - and is part of our commitment to your privacy
                  and security.
                </p>
              </div>
              <div className="col-lg-3 cta-btn-container text-center">
                <a
                  className="cta-btn align-middle"
                  target="_blank"
                  href="https://github.com/jnlewis/waris"
                >
                  View Github
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="more-features" className="section-bg">
          <div className="container">
            <div className="section-header">
              <h3 className="section-title">What Makes Waris Different</h3>
              <span className="section-divider"></span>
            </div>

            <div className="row">
              <div className="col-lg-6">
                <div className="box wow fadeInLeft">
                  <div className="icon">
                    <i className="fas fa-handshake"></i>
                  </div>
                  <h4 className="title">
                    <a href="">Trustless</a>
                  </h4>
                  <p className="description">
                    You funds are stored on the blockchain without relying on an
                    intermediary.
                  </p>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="box wow fadeInRight">
                  <div className="icon">
                    <i className="fas fa-book"></i>
                  </div>
                  <h4 className="title">
                    <a href="">Permanent</a>
                  </h4>
                  <p className="description">
                    Claims are executed without possible intervention. Your
                    decision is final.
                  </p>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="box wow fadeInLeft">
                  <div className="icon">
                    <i className="fas fa-lock"></i>
                  </div>
                  <h4 className="title">
                    <a href="">Secured</a>
                  </h4>
                  <p className="description">
                    Only you have access to your account through your Stellar
                    secret key or wallet.
                  </p>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="box wow fadeInRight">
                  <div className="icon">
                    <i className="fas fa-adjust"></i>
                  </div>
                  <h4 className="title">
                    <a href="">Transparent</a>
                  </h4>
                  <p className="description">
                    Waris is completely open source to remain transparent of its
                    inner workings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact">
          <div className="container">
            <div className="row wow fadeInUp">
              <div className="col-lg-5 col-md-5">
                <div className="contact-about">
                  <h3>WARIS</h3>
                  <p>
                    Waris aims to make claimable funds self managable and safe
                    by utilizing the programmable logic of smart contracts and
                    immutability of blockchains.
                  </p>
                </div>
              </div>

              <div className="col-lg-7 col-md-7">
                <div className="info">
                  <div>
                    <h4>Contact</h4>
                    <i className="fas fa-envelope" style={{ float: "left" }}></i>
                    <p>
                      <a
                        target="_blank"
                        href="https://github.com/jnlewis/waris"
                      >
                        Find us on Github
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 text-lg-left text-center">
              <div className="credits">
                Designed by{" "}
                <a href="https://bootstrapmade.com/">BootstrapMade</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>
        {styles}
      </style>
    </div>
  );
}
