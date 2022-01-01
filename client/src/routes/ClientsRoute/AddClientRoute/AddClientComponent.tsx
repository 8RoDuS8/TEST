import { Container, Stack, styled } from '@mui/material';
import splash from "$/assets/images/new_client_splash.png";
import AddClientForm from './AddClientForm';



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


const AddClientComponent = () => {
  return <StyledContainer maxWidth="lg" >
    <StyledStack direction="row" >
      <AddClientForm />
      <StyledImg src={splash} />
    </StyledStack>
  </StyledContainer>

}

export default AddClientComponent
