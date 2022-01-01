import footer from "$/assets/images/footer.png";
import styled from "@emotion/styled";

const FooterImage = styled.img`
  position:fixed;
  width:100%;
  max-height:84px;
  overflow:hidden;
  bottom:0;
`
const Footer = () => <FooterImage src={footer} />

export default Footer;
