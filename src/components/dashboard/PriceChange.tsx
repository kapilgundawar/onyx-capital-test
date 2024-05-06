import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface PriceChangeProps {
  pair: string;
}

const PriceChange: React.FC<PriceChangeProps> = ({ pair }) => {
  const [price, setPrice] = useState<number | null>(null);
  const [previousPrice, setPreviousPrice] = useState<number | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${pair}@trade`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.e === "trade") {
        const newPrice = parseFloat(data.p);
        setPreviousPrice(price);
        setPrice(newPrice);
      }
    };

    return () => {
      ws.close();
    };
  }, [pair, price]);

  let priceColor = "black";
  let Icon = null;

  if (previousPrice !== null && price !== null) {
    if (price > previousPrice) {
      priceColor = "green";
      Icon = <ArrowUpwardIcon />;
    } else if (price < previousPrice) {
      priceColor = "red";
      Icon = <ArrowDownwardIcon />;
    }
  }

  return (
    <Typography
      style={{ textAlign: "center", paddingTop: "30px" }}
      variant="h3"
      sx={{ color: priceColor }}
    >
      {price ? `${price}` : "Loading..."} {Icon}
    </Typography>
  );
};

export default PriceChange;
