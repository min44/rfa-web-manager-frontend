import React from 'react'
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, CssBaseline, Container, Typography, FormControlLabel, Switch } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
    button: {
        '& > *': {
            margin: theme.spacing(1)
        }
    },
    switch: {
        paddingTop: '60px'
    }
}))


export const EditPage: React.FC = () => {
    const classes = useStyles()
    const [state, setState] = useState(0)

    const incrementButtonHeandler = () => {
        
    }

    const decrementButtonHeandler = () => {
        
    }

    const asyncButtonHeandler = () => {
        
    }

    const changeThemeButtonHeandler = () => {
        
    }


    return (
        <Container>
            <CssBaseline />
            <h2>Edit Page</h2>
            <Typography variant='h6' gutterBottom>{`Amount: ${'COUNTER'}`}</Typography>
            <div className={classes.button}>
                <Button variant="contained" color="primary" onClick={incrementButtonHeandler}>+</Button>
                <Button variant="contained" color="primary" onClick={decrementButtonHeandler}>-</Button>
                <Button variant="contained" color="secondary" onClick={asyncButtonHeandler}>async</Button>
            </div>
            <div className={classes.switch}>
                <FormControlLabel control={
                    <Switch
                        checked={true}
                        onChange={changeThemeButtonHeandler}
                        name="checked"
                        color="secondary" />}
                    label={'label'} />
            </div>
        </Container>
    )
}