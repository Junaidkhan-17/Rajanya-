import "./Home.css";

import Hero from "../../PagesComponents/HomeComponents/Hero";
import MostRentedStyles from "../../PagesComponents/HomeComponents/MostRentedStyles";
import FashionProcessSection from "../../PagesComponents/HomeComponents/FashionProcessSection";
import PerfectStyleShowcase from "../../PagesComponents/HomeComponents/PerfectStyleShowcase";
import AIStylingTrustSection from "../../PagesComponents/HomeComponents/AIStylingTrustSection";
import TrendingRentalCollection from "../../PagesComponents/HomeComponents/TrendingRentalCollection";
// Future Sections
import LimitedTimeDealsSection from "../../PagesComponents/HomeComponents/LimitedTimeDealsSection";
// import AIStylingProcess from "../../PagesComponents/HomeComponents/AIStylingProcess/AIStylingProcess";
// import CategoryShowcase from "../../PagesComponents/HomeComponents/CategoryShowcase/CategoryShowcase";
// import WhyChooseUs from "../../PagesComponents/HomeComponents/WhyChooseUs/WhyChooseUs";
// import TrendingCollection from "../../PagesComponents/HomeComponents/TrendingCollection/TrendingCollection";
// import LimitedTimeOffers from "../../PagesComponents/HomeComponents/LimitedTimeOffers/LimitedTimeOffers";

const Home = () => {
  return (
    <main className="home-page-main">

      {/* Hero Banner */}
      <Hero />

      {/* Future Sections */}

      <MostRentedStyles /> 

       <FashionProcessSection />

      <PerfectStyleShowcase /> 

     <AIStylingTrustSection  /> 

    <TrendingRentalCollection />

    <LimitedTimeDealsSection /> 

    </main>
  );
};

export default Home;