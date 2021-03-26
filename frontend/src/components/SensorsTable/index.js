import React from 'react';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import GraphicEqOutlinedIcon from '@material-ui/icons/GraphicEqOutlined';
import { AddBox, ArrowDownward } from '@material-ui/icons';
import { Table, Button } from 'reactstrap';
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
const theme = createMuiTheme({
  typography: {
    fontSize: '24px'
  }
});
const useStyles = makeStyles({
  table: {
    opacity: '1',
    // transition: 'all .2s ease',
    borderRadius: '10px',
    border: 'none',
    boxShadow: '0px 5px 5px 0px rgb(0 0 0 / 20%)',
    background: '#fff',
    padding: '18px'
  },
  header: {
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    fontWeight: '600'
  },
  iconSize: {
    fontSize: '20px',
    fill: 'blue',
    paddingRight: '5px'
  },
  blueLine: {
    color: 'blue',
    border: 'none!important'
  },
  blueColor: {
    color: 'blue'
  }
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
];

export default function SensorsTable() {
  const classes = useStyles();

  return (
    <div className={classes.table}>
      <div className={classes.header}>
        <GraphicEqOutlinedIcon className={classes.iconSize} />
        Sensors
      </div>
      <Table>
        <tbody>
          <tr>
            <th scope="row" className={classes.blueColor}>
              Demo 1 - 713591
            </th>
            <td>69.8° F</td>
            <td>11/09/2020 10:49 AM</td>
            <td>
              <Button color="primary">View Sensor</Button>{' '}
            </td>
          </tr>
          <tr>
            <th scope="row" className={classes.blueLine}>
              Demo 1 - 713591
            </th>
            <td className="border-0">134.2° F</td>
            <td className="border-0">10/26/2020 6:40 PM</td>
            <td className="border-0">
              <Button color="primary">View Sensor</Button>{' '}
            </td>
          </tr>
          <tr>
            <th scope="row" className={classes.blueLine}>
              Demo 1 - 713591
            </th>
            <td className="border-0">99.9° F</td>
            <td className="border-0">10/24/2020 5:40 PM</td>
            <td className="border-0">
              <Button color="primary">View Sensor</Button>{' '}
            </td>
          </tr>
          <tr>
            <th scope="row" className={classes.blueLine}>
              Demo 1 - 713591
            </th>
            <td className="border-0">99.9° F</td>
            <td className="border-0">10/24/2020 5:38 AM</td>
            <td className="border-0">
              <Button color="primary">View Sensor</Button>{' '}
            </td>
          </tr>
          <tr>
            <th scope="row" className={classes.blueLine}>
              Demo 1 - 713591
            </th>
            <td className="border-0">100.8° F</td>
            <td className="border-0">10/16/2020 4:05 PM</td>
            <td className="border-0">
              <Button color="primary">View Sensor</Button>{' '}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
