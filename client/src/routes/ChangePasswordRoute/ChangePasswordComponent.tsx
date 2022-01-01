import { Container, Stack } from "@mui/material";
import { styled } from "@mui/system";
import ChangePasswordForm from "./ChangePasswordForm";
import splash from "$/assets/images/change_password_splash.png";


const StyledImg = styled("img")`
  height:460px;
  width:460px;
`;


const StyledContainer = styled(Container)`
  margin-top:${({ theme }) => theme.spacing(2)};
  margin-bottom:${({ theme }) => theme.spacing(2)};
  overflow:hidden;
`;

const StyledStack = styled(Stack)`
  min-width : ${({ theme }) => theme.breakpoints.values.md}px;
`;



export default function ChangePasswordComponent() {
  return <StyledContainer maxWidth="lg" >

    <StyledStack direction="row">
      <ChangePasswordForm />
      <StyledImg src={splash} />
    </StyledStack>
  </StyledContainer>
}
