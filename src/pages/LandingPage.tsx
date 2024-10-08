import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import Button from "../reusable_components/Button";
import Logo from "../components/Logo";

const Landingpage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/sign-in");
  };

  return (
    <div className="w-full h-screen flex flex-col justify-start items-center mt-8">
      <Header />
      <Logo styleName="largeLogo" />
      <h2 className="text-primary font-semibold mt-6">
        <span className="text-secondary text-4 ">Dress smart,</span> whatever
        the weather
      </h2>
      <Button styleName="mainButton" handleClick={handleButtonClick}>
        Enter
      </Button>
    </div>
  );
};

export default Landingpage;
