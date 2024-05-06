import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import {
  Link,
  Paper,
  Grid,
  Container,
  Typography,
  Toolbar,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import PriceChange from "./PriceChange";
import Chart from "./Chart";
import TradeList from "./TradeList";

const tradingPairs = ["bnbbtc", "ethbtc", "ltcbtc"];

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const defaultTheme = createTheme();

export default function Dashboard() {
  const [currentPair, setCurrentPair] = React.useState("bnbbtc");
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={false}>
          <Toolbar>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Onyx Capital - ReactJs Test
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>
              {/* Recent Price */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <FormControl fullWidth sx={{ marginBottom: "16px" }}>
                    <InputLabel>Trading Pair</InputLabel>
                    <Select
                      value={currentPair}
                      onChange={(e) => setCurrentPair(e.target.value)}
                      label="Trading Pair"
                      style={{ font: "bold", fontSize: "2rem" }}
                    >
                      {tradingPairs.map((pair) => (
                        <MenuItem key={pair} value={pair}>
                          {pair.toUpperCase()}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <PriceChange pair={currentPair} />
                </Paper>
              </Grid>
              {/* Recent Trades */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <TradeList pair={currentPair} />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
