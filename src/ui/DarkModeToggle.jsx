import { useDarkMode } from "../context/DarkModeContext";
import ButtonIcon from "./ButtonIcon";
import { CiDark, CiSun } from "react-icons/ci";
function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? <CiSun /> : <CiDark />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
