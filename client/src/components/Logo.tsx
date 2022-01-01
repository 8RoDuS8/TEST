import logo from "$/assets/images/logo.png";
interface LogoProps {
  height: number;
}
export default function Logo({ height }: LogoProps) {
  return <img style={{ height }} src={logo} alt="Communications LTD Logo" />;
}
