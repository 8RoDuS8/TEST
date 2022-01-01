import { useState } from "react";
import { TextFieldProps, TextField, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PasswordField = (props: Omit<TextFieldProps, "type">) => {

	const [type, setType] = useState("password");

	return <TextField {...props} type={type}
		InputProps={{
			endAdornment:
				<IconButton onClick={() => setType(last => last === "password" ? "text" : "password")}>
					{type === "password" ? <Visibility /> : <VisibilityOff />}
				</IconButton>
		}} />;
}
export default PasswordField;