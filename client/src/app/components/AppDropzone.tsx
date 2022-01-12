import {UploadFile} from '@mui/icons-material';
import {Box, FormControl, FormHelperText, Typography} from '@mui/material';
import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {useController, UseControllerProps} from 'react-hook-form'

interface Props extends UseControllerProps {
}

export default function AppDropzone(props: Props) {
    const {fieldState, field} = useController({...props, defaultValue: null});

    const dzStyles = {
        display: 'flex',
        border: 'dashed 3px #eee',
        borderColor: '#eee',
        borderRadius: '5px',
        paddingTop: '30px',
        alignItems: 'center',
    }

    const dzActive = {
        borderColor: 'green'
    }

    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles[0] = Object.assign(acceptedFiles[0],
            {preview: URL.createObjectURL(acceptedFiles[0])});
        field.onChange(acceptedFiles[0]);
    }, [field])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <Box  component={"div"} {...getRootProps()}>
            <FormControl sx={{p:2, height:"200px", width:"100%"}} error={!!fieldState.error} style={isDragActive ? {...dzStyles, ...dzActive} : dzStyles}>
                <input {...getInputProps()} />
                <UploadFile sx={{fontSize: '100px'}}/>
                <Typography variant='h6'>Drop image here</Typography>
                <FormHelperText>{fieldState.error?.message}</FormHelperText>
            </FormControl>
        </Box>
    )
}