import getPasswordStrength from '$/api/getPasswordStrength';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import PasswordInfoPopover from "./PasswordInfoPopover";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";

type Condition = validator.default.strongPasswordOptions;

const initialCondition: Condition = {
  minLength: 10,
  minNumbers: 1,
  minUppercase: 1,
  minLowercase: 1,
  minSymbols: 1
}


export enum Strength {
  None = 0,
  Weak = 1,
  Medium = 2,
  Strong = 3
}


const getStrengthPromise = () => new Promise<validator.default.strongPasswordOptions>((resolve, reject) =>
  getPasswordStrength()(resolve, reject));


const useCondition = () => {

  const { data: condition } = useQuery("password-strength", getStrengthPromise)

  return condition ?? initialCondition;
}


const validatePasswordStrength = (value: string, condition: Condition) => {


  const { minLength, minNumbers: minDigits, minUppercase, minLowercase, minSymbols } = condition;


  let strength = Strength.Strong;

  if (minLength && value.length < minLength) strength--;
  if (minSymbols && (countReMatches(value, symbolsRexExp) < minSymbols)) strength--;
  if (minDigits && (countReMatches(value, digitsRegExp) < minDigits)) strength--;
  if (minUppercase && (countReMatches(value, uppercaseRegExp) < minUppercase)) strength--;
  if (minLowercase && (countReMatches(value, lowercaseRegExp) < minLowercase)) strength--;
  return strength > 0 ? strength : 0 as Strength;
}




interface PasswordStrengthProps {
  value: string;
}
function PasswordStrength({ value }: PasswordStrengthProps) {

  const condition = useCondition();
  const strength = validatePasswordStrength(value, condition);




  return <Grid container spacing={1} justifyContent="flex-end" alignItems="center">
    <Grid item><PasswordInfoPopover condition={condition} /></Grid>
    <Grid item><PasswordStrengthIndicator strength={strength} /></Grid>
  </Grid>
}

const countReMatches = (input: string, re: RegExp) => ((input || "").match(re) || []).length

const symbolsRexExp = /[^a-zA-Z0-9]/g;
const lowercaseRegExp = /[a-z]/g;
const uppercaseRegExp = /[A-Z]/g;
const digitsRegExp = /\d/g;



export default PasswordStrength;
