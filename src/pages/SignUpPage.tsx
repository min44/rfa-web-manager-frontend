import React from "react"
import { observer } from "mobx-react"
import { useHistory } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import { Container, CssBaseline } from "@material-ui/core"
import Avatar from "@material-ui/core/Avatar"
import Alert from "@material-ui/lab/Alert"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { useStores } from "../hooks/strores.hook"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export const SignUpPage: React.FC = observer(() => {
  const history = useHistory()
  const classes = useStyles()
  const { userStore } = useStores()
  const { registration, registrationValues } = userStore
  const { errors } = registration

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    userStore.setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    userStore.setPassword(e.target.value)
  }

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    userStore.setFullName(e.target.value)
  }

  const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    userStore.setDisplayName(e.target.value)
  }

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    userStore.resetRegistrationErrors()
    await userStore.signUp()
    if (userStore.currentUser !== null) {
      history.replace("/upload")
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmitForm} noValidate>
          <Grid container spacing={2}>
            {errors.common.length > 0 && (
              <Alert severity="error">{errors.common.join("\n")}</Alert>
            )}
            <Grid item xs={12}>
              <TextField
                error={errors.fullName.length !== 0}
                helperText={errors.fullName.join("\n")}
                defaultValue={registrationValues.fullName}
                onChange={handleFullNameChange}
                autoComplete="name"
                name="fullName"
                variant="outlined"
                fullWidth
                id="fullName"
                label="Full Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errors.displayName.length !== 0}
                helperText={errors.displayName.join("\n")}
                defaultValue={registrationValues.displayName}
                onChange={handleDisplayNameChange}
                autoComplete="nickname"
                name="displayName"
                variant="outlined"
                fullWidth
                id="displayName"
                label="Display Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errors.email.length !== 0}
                helperText={errors.email.join("\n")}
                defaultValue={registrationValues.email}
                onChange={handleEmailChange}
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errors.password.length !== 0}
                helperText={errors.password.join("\n")}
                defaultValue={registrationValues.password}
                onChange={handlePasswordChange}
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid> 
          <Button
            disabled={registration.inProgress}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/auth/login" variant="body1">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
})
