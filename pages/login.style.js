import css from "styled-jsx/css";

export default css.global`
.icon-large {
  font-size: 48px;
}

.body {
  background: #fff;
  color: #666666;
  font-family: "Open Sans", sans-serif;
  overflow-x: hidden;
}

a {
  color: #1dc8cd;
  transition: 0.5s;
}

a:hover,
a:active,
a:focus {
  color: #1dc9ce;
  outline: none;
  text-decoration: none;
}

p {
  padding: 0;
  margin: 0 0 30px 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  margin: 0 0 20px 0;
  padding: 0;
}

/*--------------------------------------------------------------
# Header
--------------------------------------------------------------*/

#header {
  padding: 30px 0;
  height: 92px;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  transition: all 0.5s;
  z-index: 997;
}

#header #logo {
  float: left;
}

#header #logo h1 {
  font-size: 36px;
  margin: -4px 0 0 0;
  padding: 0;
  line-height: 1;
  display: inline-block;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  letter-spacing: 3px;
  text-transform: uppercase;
}

#header #logo h1 a,
#header #logo h1 a:hover {
  color: #fff;
}

#header #logo img {
  padding: 0;
  margin: 0;
}

#header.header-fixed {
  background: linear-gradient(45deg,#12714e,#18a1a5)
  padding: 20px 0;
  height: 72px;
  transition: all 0.5s;
}

/*--------------------------------------------------------------
# Navigation Menu
--------------------------------------------------------------*/

/* Nav Menu Essentials */

.nav-menu,
.nav-menu * {
  margin: 0;
  padding: 0;
  list-style: none;
}

.nav-menu ul {
  position: absolute;
  display: none;
  top: 100%;
  left: 0;
  z-index: 99;
}

.nav-menu li {
  position: relative;
  white-space: nowrap;
}

.nav-menu > li {
  float: left;
}

.nav-menu li:hover > ul,
.nav-menu li.sfHover > ul {
  display: block;
}

.nav-menu ul ul {
  top: 0;
  left: 100%;
}

.nav-menu ul li {
  min-width: 180px;
}

/* Nav Meu Container */

#nav-menu-container {
  float: right;
  margin: 0;
}

/* Nav Meu Styling */

.nav-menu a {
  padding: 0 8px 10px 8px;
  text-decoration: none;
  display: inline-block;
  color: #fff;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 14px;
  outline: none;
}

.nav-menu > li {
  margin-left: 10px;
}

.nav-menu ul {
  margin: 4px 0 0 0;
  padding: 10px;
  box-shadow: 0px 0px 30px rgba(127, 137, 161, 0.25);
  background: #fff;
}

.nav-menu ul li {
  transition: 0.3s;
}

.nav-menu ul li a {
  padding: 10px;
  color: #333;
  transition: 0.3s;
  display: block;
  font-size: 13px;
  text-transform: none;
}

.nav-menu ul li:hover > a {
  color: #1dc8cd;
}

.nav-menu ul ul {
  margin: 0;
}

/*--------------------------------------------------------------
# Sections
--------------------------------------------------------------*/

.section-header .section-title {
  font-size: 32px;
  color: #111;
  text-align: center;
  font-weight: 400;
}

.section-header .section-description {
  text-align: center;
  padding-bottom: 40px;
  color: #777;
  font-style: italic;
}

.section-header .section-divider {
  display: block;
  width: 60px;
  height: 3px;
  background: #1dc8cd;
  background: linear-gradient(0deg, #1dc8cd 0%, #55fabe 100%);
  margin: 0 auto;
  margin-bottom: 20px;
}

.section-bg {
  background: #eff5f5;
}

#more-features {
  overflow: hidden;
  margin-top: 100px;
}

#more-features .box {
  margin-bottom: 30px;
  box-shadow: 0px 0px 30px rgba(73, 78, 92, 0.15);
  background: #fff;
  transition: 0.4s;
}

#more-features .icon {
  float: left;
}

#more-features .icon mat-icon {
  font-size: 50px;
  width: 50px;
  height: 100px;
  background: #1dc8cd;
  background: linear-gradient(45deg, #1dc8cd 0%, #55fabe 100%);
  background-clip: border-box;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

#more-features h4 {
  margin-left: 100px;
  font-weight: 700;
  margin-bottom: 15px;
  font-size: 18px;
}

#more-features h4 a {
  color: #111;
}

#more-features p {
  font-size: 14px;
  margin-left: 100px;
  margin-bottom: 0;
  line-height: 24px;
}

.warning-icon {
  float: left;
  font-size: 30px;
  padding-left: 40px;
  color: #cd1d1d;
}

@media (min-width: 1025px) {
  #intro {
    background-attachment: fixed;
  }
}

@media (max-width: 768px) {
  #header #logo h1 {
    font-size: 28px;
    margin-top: 0;
  }

  #header #logo img {
    max-height: 40px;
  }

  #mobile-nav-toggle {
    display: inline;
  }
}

@media (max-width: 767px) {
  #more-features .box {
    margin-bottom: 20px;
  }

  #more-features .icon {
    float: none;
    text-align: center;
    padding-bottom: 15px;
  }

  #more-features h4,
  #more-features p {
    margin-left: 0;
    text-align: center;
  }
}

.main-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background: #eff5f5;
    font-family: 'Lato', sans-serif;
  }
  
.file-input input[type=file] {
    opacity: 0;
    position: absolute;
    background: none;
    width: 100%;
    height: 100%;
    cursor: pointer;
}

.create-account {
  font-size: 18px !important;
  text-align: center;
}

a {
  cursor: pointer;
}

.key-textarea {
  resize: none;
  width: 100%;
  font-weight: bold;
  border: none;
}

.create-account {
  color: #1dc8cd;
}
`;
