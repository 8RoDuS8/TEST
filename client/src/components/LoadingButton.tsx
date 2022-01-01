import { Button, ButtonProps, CircularProgress } from "@mui/material";

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean
}

const LoadingButton: React.FC<LoadingButtonProps> = ({ loading, disabled, children, ...props }) =>
  <Button {...props} disabled={disabled || loading}
    startIcon={loading && <CircularProgress size={24} />}>{children}</Button>

export default LoadingButton;