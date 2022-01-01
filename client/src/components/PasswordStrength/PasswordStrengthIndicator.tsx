import styled from '@emotion/styled';
import { Strength } from '.';

const Bar = styled.div`
  background-color: #afafaf;
  width: 40px;
  height: 7px;
  margin-right: 4px;
  border-radius: 5px;
`;

const RedBar = styled(Bar)`background-color:#ff4343;`;
const YellowBar = styled(Bar)`background-color:#ffd966;`;
const GreenBar = styled(Bar)`background-color:#5ccb4d;`;


interface PasswordStrengthIndicatorProps {
  strength: Strength
}


const BarBox = styled.div`
  display:flex;
  align-content:center;
`;

const PasswordStrengthIndicator = ({ strength }: PasswordStrengthIndicatorProps) => {


  const strengthArr = [<RedBar />, <YellowBar />, <GreenBar />];


  const filter = (_strength: Strength, level: 0 | 1 | 2) =>
    strengthArr.find((v, i) => i === _strength - 1 && level <= i) ?? <Bar />;


  return <BarBox>
    {filter(strength, 0)}
    {filter(strength, 1)}
    {filter(strength, 2)}
  </BarBox >
}

export default PasswordStrengthIndicator;