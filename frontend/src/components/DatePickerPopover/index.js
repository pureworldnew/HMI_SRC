import React, { useEffect, useState, useRef } from 'react';
import { Button, Popover, IconButton, Menu, MenuItem } from '@material-ui/core';
import ArrowLeftIcon from '@material-ui/icons/ArrowBackIos';
import ArrowRightIcon from '@material-ui/icons/ArrowForwardIos';
import Menus from './Menus';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import moment from 'moment';

function DatePickerPopover({
  popoverId,
  handleClose,
  onShow,
  selectOption,
  ...props
}) {
  const months = moment.monthsShort();
  const currentYear = new Date().getFullYear();
  const selectElementHtml = document.querySelector(
    '.datepicker-menu-root__button'
  );

  const [rangeType, setRangeType] = useState(true);
  const [popoverOpen, setPopoverOpen] = useState(null);
  const [dateOption, setDateOption] = useState({ period: '', type: '' });
  const [rangeSelected, setRangeSelected] = useState({
    startDate: { value: currentYear },
    endDate: { value: currentYear - 1 }
  });

  const [periodSelected, setPeriodSelected] = useState({ value: currentYear });
  const [dateArray, setDateArray] = useState([]);
  const [datepickerParseValue, setDatepickerParseValue] = useState(null);
  // first render, create first date massive
  useEffect(() => {
    const { period, type } = dateOption;
    let buttonsLength = 12;
    let newDateArray = [];
    setRangeType(true);

    if (type === 'YTD (Year to Date)') {
      setRangeType(false);
    }

    // Create monthly array
    if (period === 'monthly') {
      for (let i = 0; months.length > i; i++) {
        newDateArray = [
          ...newDateArray,
          {
            value: Number(`${periodSelected.value}${i}`),
            label: months[i],
            id: `${periodSelected.value}${i}`
          }
        ];
      }
      return setDateArray(newDateArray);
    }
    // Create quarterly data
    if (period === 'quarterly') {
      let quarter = 4;
      let year = 0;
      for (let i = 0; buttonsLength > i; i++) {
        year = quarter === 0 ? year + 1 : year;
        quarter = quarter === 0 ? 4 : quarter;
        newDateArray = [
          ...newDateArray,
          {
            value: periodSelected.value - year,
            label: `${periodSelected.value - year} Q${quarter}`,
            quarter: quarter,
            id: `${periodSelected.value - year}${quarter}`
          }
        ];
        quarter = quarter - 1;
      }
      return setDateArray(newDateArray);
    }

    // Create yearly data
    if (period === 'yearly') {
      for (let i = 0; buttonsLength > i; i++) {
        newDateArray = [
          ...newDateArray,
          { value: periodSelected.value - i, label: periodSelected.value - i }
        ];
      }
      return setDateArray(newDateArray);
    }
  }, [dateOption, periodSelected]);

  // Button next, prev Action
  const onChangePeriod = (dir) => {
    const { period } = dateOption;
    let current = [];
    if (period === 'monthly' && dir === 'next') {
      current = Number(periodSelected.value) - 1;
      return setPeriodSelected({ value: current });
    }
    if (period === 'monthly' && dir === 'prev') {
      current = Number(periodSelected.value) + 1;
      return setPeriodSelected({ value: current });
    }
    if (period === 'quarterly' && dir === 'prev') {
      current = dateArray[0].value + 2;
      return setPeriodSelected({ value: current });
    }
    if (period === 'quarterly' && dir === 'next') {
      current = dateArray[dateArray.length - 1].value;
      return setPeriodSelected({ value: current });
    }
    if (period === 'yearly' && dir === 'next') {
      current = dateArray[dateArray.length - 1].value - 1;
      return setPeriodSelected({ value: current });
    }
    if (period === 'yearly' && dir === 'prev') {
      current = dateArray[0].value + 12;
      return setPeriodSelected({ value: current });
    }
  };

  // Set option for first render datepicker
  const setSearchOption = (period, type) => {
    setRangeSelected({ startDate: '', endDate: '' });
    setDateOption({ period, type });
    setPopoverOpen(true);
  };

  // Pick range
  const onSelectDate = (date, datepicker) => {
    const { period } = dateOption;
    let { startDate, endDate } = rangeSelected;
    const value = Number(date.value);
    const quarter = Number(date.id);
    const startDateQuarter = Number(startDate.id);
    const endDateQuarter = Number(endDate.id);
    // ==========================================
    startDate = Number(startDate.value);
    endDate = Number(endDate.value);

    const newDate = (newValue) =>
      setRangeSelected({ ...rangeSelected, ...newValue });

    // Not range value
    if (datepicker === 'single') {
      return newDate({ startDate: { ...date }, endDate: { value: '' } });
    }
    // Range value
    if (period === 'quarterly' || period === 'monthly') {
      switch (value > 0) {
        case !startDateQuarter:
          return newDate({ startDate: { ...date } });
        case !endDateQuarter:
          return newDate({ endDate: { ...date } });
        case endDateQuarter === quarter:
          return newDate({ endDate: {} });
        case startDateQuarter === quarter:
          return newDate({ startDate: {} });
        case startDateQuarter < quarter && quarter > endDateQuarter:
          return newDate({ startDate: { ...date } });
        case startDateQuarter > quarter && endDateQuarter > quarter:
          return newDate({ endDate: { ...date } });
        case startDateQuarter > quarter && endDateQuarter < quarter:
          return newDate({ startDate: { ...date } });
        default:
          break;
      }
    } else {
      switch (value > 0) {
        case !endDate && value < startDate:
          return newDate({ endDate: { ...date } });
        case (!startDate && value > endDate) || (!startDate && !endDate):
          return newDate({ startDate: { ...date } });
        case endDate === value:
          return newDate({ endDate: { ...date, value: null } });
        case startDate === value:
          return newDate({ startDate: { ...date, value: null } });
        case startDate < value && value > endDate:
          return newDate({ startDate: { ...date } });
        case startDate > value && endDate > value:
          return newDate({ endDate: { ...date } });
        case startDate > value && endDate < value:
          return newDate({ startDate: { ...date } });
        default:
          break;
      }
    }
  };

  const onShowDate = (type, value) => {
    let newDate = [];
    const { startDate, endDate } = rangeSelected;
    if (dateOption.period === 'monthly') {
      newDate = [
        startDate.id.slice(0, 4),
        startDate.id.slice(4, 5),
        endDate === '' || !endDate.id ? false : endDate.id.slice(0, 4),
        endDate === '' || !endDate.id ? false : endDate.id.slice(4, 5)
      ].filter((key) => key);
    }
    setDatepickerParseValue(newDate);
    setPopoverOpen(null);
    console.log(newDate);
    console.log(type, value);
  };

  const datepickerData = Object.values(dateArray).length > 0 ? dateArray : [];
  return (
    <>
      <Menus setSearchOption={setSearchOption} value={datepickerParseValue} />
      {dateArray.length === 0 ? (
        <></>
      ) : (
        <Popover
          id="datepicker-menu-root"
          open={popoverOpen}
          anchorEl={selectElementHtml}
          className="popover-action__modal"
          onClose={() => setPopoverOpen(null)}
          keepMounted>
          <div className="content-toolbar-datepicker">
            <div className="MuiPickersBasePicker-container__toolbar-control">
              <IconButton
                className="MuiPickersBasePicker-container__toolbar-control"
                onClick={() => setPopoverOpen(null)}>
                <ChevronLeftIcon />
              </IconButton>
              <h5>
                {dateOption.period === 'yearly'
                  ? 'Multi-year range'
                  : dateOption.type === 'YTD (Year to Date)'
                  ? `Year to Date (${dateOption.period})`
                  : 'Year range'}
              </h5>
            </div>
            <div
              className={
                rangeType ? `picker-control` : 'picker-control text-center'
              }>
              {rangeType ? (
                <div className="picker-control--left">
                  Select starting and ending Year
                </div>
              ) : null}
              <div className="picker-control--right">
                <IconButton
                  onClick={() => onChangePeriod('prev')}
                  aria-label="left"
                  size="large"
                  disabled={currentYear === periodSelected}>
                  <ArrowLeftIcon />
                </IconButton>
                <div className="picker-control__current">
                  {dateOption.period === 'monthly'
                    ? periodSelected.value
                    : `${dateArray[0].value} - ${
                        dateArray[dateArray.length - 1].value
                      }`}
                </div>
                <IconButton
                  onClick={() => onChangePeriod('next')}
                  aria-label="right"
                  size="large">
                  <ArrowRightIcon />
                </IconButton>
              </div>
            </div>
            <div className="picker-body">
              {rangeType && dateOption.period === 'quarterly'
                ? Object.values(datepickerData).length > 0 &&
                  Object.values(dateArray).map((key) => {
                    const startId = rangeSelected.startDate.id;
                    const endId = rangeSelected.endDate.id;
                    const keyId = key.id;
                    return (
                      <Button
                        onClick={() => onSelectDate(key, '')}
                        className={
                          startId === keyId || endId === keyId
                            ? 'picker-item active'
                            : keyId < startId &&
                              keyId > endId &&
                              startId > 0 &&
                              endId > 0
                            ? 'picker-item in-range'
                            : 'picker-item'
                        }
                        key={key.label}>
                        {key.label}
                      </Button>
                    );
                  })
                : null}
              {rangeType && dateOption.period !== 'quarterly'
                ? Object.values(datepickerData).length > 0 &&
                  Object.values(dateArray).map((key, index) => {
                    return (
                      <Button
                        onClick={() => onSelectDate(key, '', index)}
                        className={
                          rangeSelected.startDate.value === key.value ||
                          rangeSelected.endDate.value === key.value
                            ? 'picker-item active'
                            : key.value < rangeSelected.startDate.value &&
                              key.value > rangeSelected.endDate.value &&
                              rangeSelected.startDate.value > 0 &&
                              rangeSelected.endDate.value > 0
                            ? 'picker-item in-range'
                            : 'picker-item'
                        }
                        key={key.label}>
                        {key.label}
                      </Button>
                    );
                  })
                : null}
              {!rangeType
                ? Object.values(datepickerData).length > 0 &&
                  Object.values(dateArray).map((key) => {
                    return (
                      <Button
                        onClick={() => onSelectDate(key, 'single')}
                        className={
                          dateOption.period === 'quarterly'
                            ? rangeSelected.startDate.value === key.value &&
                              rangeSelected.startDate.quarter === key.quarter
                              ? 'picker-item active'
                              : 'picker-item '
                            : rangeSelected.startDate.value === key.value
                            ? 'picker-item active'
                            : 'picker-item '
                        }
                        key={key.label}>
                        {key.label}
                      </Button>
                    );
                  })
                : null}
            </div>
            <div className="picker-footer">
              <Button className="btn-text" onClick={() => setPopoverOpen(null)}>
                Cancel
              </Button>
              <Button
                className="btn-block"
                onClick={() => onShowDate(dateOption, rangeSelected)}>
                Show
              </Button>
            </div>
          </div>
        </Popover>
      )}
    </>
  );
}
export default DatePickerPopover;
