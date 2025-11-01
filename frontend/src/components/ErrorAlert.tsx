import { Alert, AlertTitle, Box } from '@mui/material'

interface ErrorAlertProps {
    title?: string
    message: string
}

export default function ErrorAlert({ title = 'Error', message }: ErrorAlertProps) {
    return (
        <Box sx={{ my: 2 }}>
            <Alert severity="error">
                <AlertTitle>{title}</AlertTitle>
                {message}
            </Alert>
        </Box>
    )
}



