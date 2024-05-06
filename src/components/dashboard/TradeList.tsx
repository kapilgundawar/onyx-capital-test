import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

interface Trade {
  id: number;
  price: string;
  qty: string;
  time: number;
}

interface TradeListProps {
  pair: string;
}
// Function to convert a Unix timestamp (in milliseconds) to a readable date string
const convertTimestampToDate = (timestamp : number) => {
  const date = new Date(timestamp);
  return date.toLocaleString(); // You can adjust locale and options for desired formatting
};
const TradeList: React.FC<TradeListProps> = ({ pair }) => {
  const [trades, setTrades] = useState<Trade[]>([]);
  useEffect(() => {
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${pair}@trade`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.e === 'trade') {
        const newTrade: Trade = {
          id: data.t,
          price: data.p,
          qty: data.q,
          time: data.T,
        };

        setTrades((prevTrades) => [newTrade, ...prevTrades].slice(0, 10));
      }
    };

    return () => {
      ws.close();
    };
  }, [pair]);
  return (
    <React.Fragment>
      <Title>Recent Trades</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Trade ID</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Time</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {trades.map((trade) => (
            <TableRow key={trade.id}>
              <TableCell>{trade.id}</TableCell>
              <TableCell>{trade.price}</TableCell>
              <TableCell>{trade.qty}</TableCell>
              <TableCell>{convertTimestampToDate(trade.time)}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
     
    </React.Fragment>
  );
}
export default TradeList;