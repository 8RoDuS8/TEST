import { useRef, useState } from "react";
import { Info } from "@mui/icons-material";
import { Container, Grid, IconButton, Popover, Typography } from "@mui/material";

interface PasswordInfoProps {
  condition: validator.default.strongPasswordOptions;
}
const PasswordInfoPopover = ({ condition }: PasswordInfoProps) => {

  const [showPopover, setShowPopover] = useState(false);
  const { minLength, minNumbers, minUppercase, minLowercase, minSymbols } = condition;

  const ref = useRef(null);

  const withMinLength = (v?: number) => v ? `Minimum length: ${v}.` : null;
  const withMinDigits = (v?: number) => v ? `At least ${v} digit${v >= 2 ? "s" : ""}.` : null;
  const withMinUppercase = (v?: number) => v ? `At least ${v} uppercase letter${v >= 2 ? "s" : ""}.` : null;
  const withMinLowercase = (v?: number) => v ? `At least ${v} lowercase letter${v >= 2 ? "s" : ""}.` : null;
  const withMinSymbols = (v?: number) => v ? `At least ${v} symbol${v >= 2 ? "s" : ""}.` : null;

  const descriptionArray = [
    withMinLength(minLength),
    withMinDigits(minNumbers),
    withMinUppercase(minUppercase),
    withMinLowercase(minLowercase),
    withMinSymbols(minSymbols)].filter(v => v).map((v, i) => <Typography key={i} variant="body2">{v}<br /></Typography>);

  return <>
    <Grid container spacing={1} alignItems="center">
      <Grid item><IconButton ref={ref} onClick={() => setShowPopover(true)}><Info /></IconButton></Grid>
      <Grid item><Typography variant="subtitle2" color="secondary">PasswordStrength</Typography></Grid>
    </Grid>
    <Popover open={showPopover} onClose={() => setShowPopover(false)}
      anchorEl={ref?.current} anchorOrigin={{ horizontal: "center", vertical: "bottom" }} >
      <Container>
        <Typography variant="body1">Password must satisfy: </Typography>
        {descriptionArray}
      </Container>
    </Popover>
  </>
}

export default PasswordInfoPopover;