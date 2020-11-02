import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "./account.style.js";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import AccountBalance from "../components/account-balance";
import Funds from "../components/funds";
import Claimables from "../components/claimables";
import History from "../components/history";

export default function Account() {
  const router = useRouter();

  const [menuExpanded, setMenuExpanded] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("balance");

  return (
    <div className="container">
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

      <SideNav
        onSelect={(selected) => {
          if (selected === "logout") {
            localStorage.removeItem("loggedInKey");
            router.push("/");
          } else {
            setSelectedMenu(selected);
          }
        }}
        expanded={menuExpanded}
        onToggle={(expanded) => setMenuExpanded(expanded)}
      >
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="balance">
          <NavItem eventKey="balance">
            <NavIcon>
              <i className="fas fa-university" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>Balance</NavText>
          </NavItem>
          <NavItem eventKey="funds">
            <NavIcon>
              <i
                className="fas fa-hand-holding-heart"
                style={{ fontSize: "1.75em" }}
              />
            </NavIcon>
            <NavText>Funds</NavText>
          </NavItem>
          <NavItem eventKey="claimables">
            <NavIcon>
              <i className="fas fa-donate" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>Claimables</NavText>
          </NavItem>
          <NavItem eventKey="history">
            <NavIcon>
              <i className="fas fa-history" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>History</NavText>
          </NavItem>
          <NavItem eventKey="logout">
            <NavIcon>
              <i
                className="fas fa-sign-out-alt"
                style={{ fontSize: "1.75em" }}
              />
            </NavIcon>
            <NavText>Logout</NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
      <div className="content">
        {selectedMenu === "balance" && <AccountBalance />}
        {selectedMenu === "funds" && <Funds />}
        {selectedMenu === "claimables" && <Claimables />}
        {selectedMenu === "history" && <History />}
      </div>

      <style jsx global>
        {styles}
      </style>
    </div>
  );
}
