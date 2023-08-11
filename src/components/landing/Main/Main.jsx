import Header from '../../Header/Header';
import Promo from '../../landing/Promo/Promo';
import AboutMe from '../AboutMe/AboutMe';
import AboutProject from '../AboutProject/AboutProject';
import NavTab from '../NavTab/NavTab';
import Portfolio from '../Portfolio/Portfolio';
import Techs from '../Techs/Techs';

function Main (props) {
  return (
    <div className="main">
      <>
        <div className="main__header">
          <Header
            loggedIn={props.loggedIn}
          />
        </div>
        <Promo />
        <NavTab />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </>
    </div>

  )
}

export default Main;
