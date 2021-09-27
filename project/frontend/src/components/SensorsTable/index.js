import React from 'react';
import GraphicEqOutlinedIcon from '@material-ui/icons/GraphicEqOutlined';
import { Table, Button } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  table: {
    opacity: '1',
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
    color: 'blue',
    fontSize: '18px'
  },
  textSize: {
    fontSize: '18px'
  }
});

export default function SensorsTable(props) {
  const classes = useStyles();

  let data = props.sensors;
  const items = [];
  console.log('sensors is ', data);
  for (let i = 0; i < data.length; i++) {
    items.push(
      <tr key={i}>
        <td className={classes.blueColor}>{data[i].deviceName}</td>
        <td className={classes.textSize}>{data[i].macAddress}</td>
        <td className={classes.textSize}>{data[i].temp1}</td>
        <td className={classes.textSize}>{data[i].temp2}</td>
        <td className={classes.textSize}>{data[i].voltage}</td>
        <td className={classes.textSize}>{data[i].includeDateTime}</td>
        <td className={classes.textSize}>
          <Button color="primary" size="lg">
            View Sensor
          </Button>{' '}
        </td>
      </tr>
    );
  }

  return (
    <div className={classes.table}>
      <div className={classes.header}>
        <GraphicEqOutlinedIcon className={classes.iconSize} />
        Sensors
      </div>
      <Table size="md">
        <tbody>{items}</tbody>
      </Table>
    </div>
  );
}
