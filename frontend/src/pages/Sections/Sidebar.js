import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'react-feather';
import T from 'i18n-react';
import UnAvailableToolTip from '../Components/TooltipComponents/UnAvailableTooltipComponent';
import Footer from './Footer';

const Sidebar = ({
  showMenu,
  setShowMenu,
  fullSceen,
  setFullSceen,
  roleId
}) => {
  const [menuDropDown, setMenuDropDown] = useState('');
  return (
    <div
      className={`main__sidebar-container ${
        !showMenu && 'main__sidebar-container-collapse'
      }`}
      onMouseLeave={() => {
        setShowMenu(false);
        setMenuDropDown('');
      }}>
      <div
        className={`sideBar ${!showMenu && 'sideBar-collapse'}`}
        onMouseLeave={() => {
          setShowMenu(false);
          setMenuDropDown('');
        }}
        onMouseEnter={() => {
          setShowMenu(true);
        }}>
        <p
          className="sideBar__logo"
          onClick={() => {
            if (showMenu) {
              setShowMenu(false);
              setMenuDropDown('');
            } else setShowMenu(true);
          }}>
          {showMenu ? 'LOGO' : 'L'}
        </p>
        <ul className="sideNav">
          <li>
            <NavLink to="/dashboard" activeClassName="active">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.25 1.5H3.75C3.15326 1.5 2.58097 1.73705 2.15901 2.15901C1.73705 2.58097 1.5 3.15326 1.5 3.75V8.25C1.5 8.84674 1.73705 9.41903 2.15901 9.84099C2.58097 10.2629 3.15326 10.5 3.75 10.5H8.25C8.84674 10.5 9.41903 10.2629 9.84099 9.84099C10.2629 9.41903 10.5 8.84674 10.5 8.25V3.75C10.5 3.15326 10.2629 2.58097 9.84099 2.15901C9.41903 1.73705 8.84674 1.5 8.25 1.5ZM9 8.25C9 8.44891 8.92098 8.63968 8.78033 8.78033C8.63968 8.92098 8.44891 9 8.25 9H3.75C3.55109 9 3.36032 8.92098 3.21967 8.78033C3.07902 8.63968 3 8.44891 3 8.25V3.75C3 3.55109 3.07902 3.36032 3.21967 3.21967C3.36032 3.07902 3.55109 3 3.75 3H8.25C8.44891 3 8.63968 3.07902 8.78033 3.21967C8.92098 3.36032 9 3.55109 9 3.75V8.25Z"
                  fill="currentColor"
                />
                <path
                  d="M20.25 1.5H15.75C15.1533 1.5 14.581 1.73705 14.159 2.15901C13.7371 2.58097 13.5 3.15326 13.5 3.75V8.25C13.5 8.84674 13.7371 9.41903 14.159 9.84099C14.581 10.2629 15.1533 10.5 15.75 10.5H20.25C20.8467 10.5 21.419 10.2629 21.841 9.84099C22.2629 9.41903 22.5 8.84674 22.5 8.25V3.75C22.5 3.15326 22.2629 2.58097 21.841 2.15901C21.419 1.73705 20.8467 1.5 20.25 1.5ZM21 8.25C21 8.44891 20.921 8.63968 20.7803 8.78033C20.6397 8.92098 20.4489 9 20.25 9H15.75C15.5511 9 15.3603 8.92098 15.2197 8.78033C15.079 8.63968 15 8.44891 15 8.25V3.75C15 3.55109 15.079 3.36032 15.2197 3.21967C15.3603 3.07902 15.5511 3 15.75 3H20.25C20.4489 3 20.6397 3.07902 20.7803 3.21967C20.921 3.36032 21 3.55109 21 3.75V8.25Z"
                  fill="currentColor"
                />
                <path
                  d="M8.25 13.5H3.75C3.15326 13.5 2.58097 13.7371 2.15901 14.159C1.73705 14.581 1.5 15.1533 1.5 15.75V20.25C1.5 20.8467 1.73705 21.419 2.15901 21.841C2.58097 22.2629 3.15326 22.5 3.75 22.5H8.25C8.84674 22.5 9.41903 22.2629 9.84099 21.841C10.2629 21.419 10.5 20.8467 10.5 20.25V15.75C10.5 15.1533 10.2629 14.581 9.84099 14.159C9.41903 13.7371 8.84674 13.5 8.25 13.5ZM9 20.25C9 20.4489 8.92098 20.6397 8.78033 20.7803C8.63968 20.921 8.44891 21 8.25 21H3.75C3.55109 21 3.36032 20.921 3.21967 20.7803C3.07902 20.6397 3 20.4489 3 20.25V15.75C3 15.5511 3.07902 15.3603 3.21967 15.2197C3.36032 15.079 3.55109 15 3.75 15H8.25C8.44891 15 8.63968 15.079 8.78033 15.2197C8.92098 15.3603 9 15.5511 9 15.75V20.25Z"
                  fill="currentColor"
                />
                <path
                  d="M20.25 13.5H15.75C15.1533 13.5 14.581 13.7371 14.159 14.159C13.7371 14.581 13.5 15.1533 13.5 15.75V20.25C13.5 20.8467 13.7371 21.419 14.159 21.841C14.581 22.2629 15.1533 22.5 15.75 22.5H20.25C20.8467 22.5 21.419 22.2629 21.841 21.841C22.2629 21.419 22.5 20.8467 22.5 20.25V15.75C22.5 15.1533 22.2629 14.581 21.841 14.159C21.419 13.7371 20.8467 13.5 20.25 13.5ZM21 20.25C21 20.4489 20.921 20.6397 20.7803 20.7803C20.6397 20.921 20.4489 21 20.25 21H15.75C15.5511 21 15.3603 20.921 15.2197 20.7803C15.079 20.6397 15 20.4489 15 20.25V15.75C15 15.5511 15.079 15.3603 15.2197 15.2197C15.3603 15.079 15.5511 15 15.75 15H20.25C20.4489 15 20.6397 15.079 20.7803 15.2197C20.921 15.3603 21 15.5511 21 15.75V20.25Z"
                  fill="currentColor"
                />
              </svg>

              {showMenu && <T.span text="sidebar.dashboard" />}
            </NavLink>
          </li>
          <li>
            <NavLink to="/sensors" activeClassName="active">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M22.1558 9.50998C22.0734 9.33773 21.9283 9.20342 21.7503 9.13444C21.5722 9.06545 21.3745 9.06699 21.1976 9.13873C21.0206 9.21048 20.8777 9.34703 20.7979 9.52054C20.7181 9.69404 20.7076 9.89144 20.7683 10.0725C20.9215 10.4462 21.0005 10.8461 21.0008 11.25C21.007 11.3574 21.007 11.4651 21.0008 11.5725C20.9395 12.1087 20.7519 12.6228 20.4533 13.0725L20.3483 13.2225C19.7753 13.9592 19.0517 14.5651 18.2258 15H18.1508L18.0758 15.0375C16.2013 16.0155 14.1151 16.5177 12.0008 16.5C9.891 16.5339 7.80504 16.0498 5.92584 15.09L5.85084 15.0525L5.75334 15C4.94209 14.559 4.23392 13.9506 3.67584 13.215L3.58584 13.0875C3.28299 12.6387 3.09027 12.1248 3.02334 11.5875C3.00883 11.4756 3.00132 11.3628 3.00084 11.25C3.00084 8.40748 7.12584 5.99998 12.0008 5.99998C12.7718 6.00036 13.5416 6.06054 14.3033 6.17998C14.5022 6.21081 14.7053 6.16136 14.8677 6.04251C15.0302 5.92366 15.1388 5.74514 15.1696 5.54623C15.2004 5.34732 15.151 5.1443 15.0321 4.98185C14.9133 4.8194 14.7347 4.71081 14.5358 4.67998C13.6967 4.55466 12.8492 4.49448 12.0008 4.49998C6.11334 4.49998 1.50084 7.49998 1.50084 11.25V15.75C1.49191 15.9073 1.49191 16.0651 1.50084 16.2225C1.60062 17.0761 1.9183 17.8896 2.42334 18.585C3.10202 19.5121 3.97482 20.2799 4.98084 20.835C7.14094 21.9785 9.55725 22.5516 12.0008 22.5C14.4394 22.5382 16.8476 21.9549 18.9983 20.805C20.0041 20.2495 20.8768 19.4818 21.5558 18.555C22.0627 17.8725 22.3879 17.0725 22.5008 16.23C22.5097 16.0701 22.5097 15.9098 22.5008 15.75V11.25C22.4995 10.6531 22.3823 10.0622 22.1558 9.50998ZM21.0008 15.75C21.007 15.8574 21.007 15.9651 21.0008 16.0725C20.9263 16.6665 20.7018 17.2318 20.3483 17.715C19.7858 18.452 19.0724 19.0606 18.2558 19.5C16.3319 20.5226 14.1793 21.0388 12.0008 21C9.82487 21.0375 7.67507 20.5213 5.75334 19.5C4.94269 19.0614 4.23454 18.4555 3.67584 17.7225C3.31229 17.2371 3.07983 16.6663 3.00084 16.065C2.99474 15.9601 2.99474 15.8549 3.00084 15.75V14.7525C3.15834 14.9175 3.32334 15.075 3.50334 15.2325L3.64584 15.3525C3.79584 15.4775 3.95334 15.6 4.11834 15.72L4.29834 15.855C4.51584 16.005 4.74084 16.1475 4.98084 16.29L5.20584 16.41C7.30653 17.4882 9.63983 18.0342 12.0008 18C14.3674 18.0331 16.7059 17.4846 18.8108 16.4025L18.9983 16.305C19.2458 16.1625 19.4708 16.02 19.6883 15.8625L19.8758 15.75C20.0358 15.63 20.1908 15.51 20.3408 15.39L20.4983 15.255C20.6708 15.0975 20.8433 14.94 20.9933 14.775L21.0008 15.75Z"
                  fill="currentColor"
                />
                <path
                  d="M14.25 9C14.4489 9 14.6397 8.92098 14.7803 8.78033C14.921 8.63968 15 8.44891 15 8.25C15 8.05109 14.921 7.86032 14.7803 7.71967C14.6397 7.57902 14.4489 7.5 14.25 7.5H12.75C12.75 7.30109 12.671 7.11032 12.5303 6.96967C12.3897 6.82902 12.1989 6.75 12 6.75C11.8011 6.75 11.6103 6.82902 11.4697 6.96967C11.329 7.11032 11.25 7.30109 11.25 7.5C10.6533 7.5 10.081 7.73705 9.65901 8.15901C9.23705 8.58097 9 9.15326 9 9.75C9 10.3467 9.23705 10.919 9.65901 11.341C10.081 11.7629 10.6533 12 11.25 12V13.5H9.75C9.55109 13.5 9.36032 13.579 9.21967 13.7197C9.07902 13.8603 9 14.0511 9 14.25C9 14.4489 9.07902 14.6397 9.21967 14.7803C9.36032 14.921 9.55109 15 9.75 15H11.25C11.25 15.1989 11.329 15.3897 11.4697 15.5303C11.6103 15.671 11.8011 15.75 12 15.75C12.1989 15.75 12.3897 15.671 12.5303 15.5303C12.671 15.3897 12.75 15.1989 12.75 15C13.3467 15 13.919 14.7629 14.341 14.341C14.7629 13.919 15 13.3467 15 12.75C15 12.1533 14.7629 11.581 14.341 11.159C13.919 10.7371 13.3467 10.5 12.75 10.5V9H14.25ZM13.5 12.75C13.5 12.9489 13.421 13.1397 13.2803 13.2803C13.1397 13.421 12.9489 13.5 12.75 13.5V12C12.9489 12 13.1397 12.079 13.2803 12.2197C13.421 12.3603 13.5 12.5511 13.5 12.75ZM11.25 10.5C11.0511 10.5 10.8603 10.421 10.7197 10.2803C10.579 10.1397 10.5 9.94891 10.5 9.75C10.5 9.55109 10.579 9.36032 10.7197 9.21967C10.8603 9.07902 11.0511 9 11.25 9V10.5Z"
                  fill="currentColor"
                />
                <path
                  d="M19.2842 3.4675C19.1437 3.32781 18.9536 3.24941 18.7554 3.24941C18.5573 3.24941 18.3672 3.32781 18.2267 3.4675L15.9767 5.7175C15.8538 5.86098 15.7896 6.04553 15.7969 6.23429C15.8042 6.42305 15.8824 6.6021 16.016 6.73567C16.1496 6.86924 16.3286 6.94749 16.5174 6.95478C16.7062 6.96207 16.8907 6.89787 17.0342 6.775L18.0017 5.8075V10C18.0017 10.1989 18.0807 10.3897 18.2214 10.5303C18.362 10.671 18.5528 10.75 18.7517 10.75C18.9506 10.75 19.1414 10.671 19.282 10.5303C19.4227 10.3897 19.5017 10.1989 19.5017 10V5.8075L20.4692 6.7825C20.6127 6.90537 20.7972 6.96957 20.986 6.96228C21.1747 6.95499 21.3538 6.87674 21.4874 6.74317C21.6209 6.6096 21.6992 6.43055 21.7065 6.24179C21.7138 6.05303 21.6496 5.86848 21.5267 5.725L19.2842 3.4675Z"
                  fill="currentColor"
                />
              </svg>
              {showMenu && <T.span text="sidebar.sensors" />}
            </NavLink>
          </li>
          <li>
            <NavLink to="/notifications" activeClassName="active">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0)">
                  <path
                    d="M23.8183 11.8333L18.4023 2.45241C18.1601 2.0329 17.7263 1.78246 17.2419 1.78246C16.7575 1.78246 16.3237 2.0329 16.0815 2.45241L15.1281 4.10374C14.517 3.70157 13.8484 3.38373 13.146 3.15747V2.57672C13.146 1.1562 11.9903 0.000549316 10.5698 0.000549316C9.14927 0.000549316 7.99363 1.1562 7.99363 2.57672V3.15579C4.87467 4.16378 2.62717 6.94887 2.62717 10.2183V16.1094H2.37429C1.06509 16.1094 0 17.1745 0 18.4837C0 19.7929 1.06509 20.8579 2.37424 20.8579H7.29433C7.36675 22.6024 8.8079 23.9994 10.5698 23.9994C12.3317 23.9994 13.7729 22.6023 13.8453 20.8579H18.7653C20.0746 20.8579 21.1396 19.7928 21.1396 18.4837C21.1396 17.1745 20.0745 16.1094 18.7653 16.1094H18.5125V13.8432H22.6579C23.1423 13.8432 23.5761 13.5927 23.8183 13.1732C24.0606 12.7537 24.0606 12.2528 23.8183 11.8333ZM9.39981 2.57677C9.39981 1.93161 9.92469 1.40678 10.5698 1.40678C11.215 1.40678 11.7398 1.93161 11.7398 2.57677V2.83452C11.3538 2.78024 10.9627 2.75249 10.5698 2.75249C10.1724 2.75249 9.78173 2.78043 9.39981 2.83368V2.57677ZM10.5698 22.5932C9.58341 22.5932 8.77331 21.8266 8.70262 20.858H12.437C12.3663 21.8265 11.5562 22.5932 10.5698 22.5932ZM19.7334 18.4837C19.7334 19.0175 19.2991 19.4517 18.7653 19.4517H2.37424C1.84046 19.4517 1.40618 19.0175 1.40618 18.4837C1.40618 17.9499 1.84046 17.5156 2.37424 17.5156H18.7653C19.2991 17.5156 19.7334 17.9498 19.7334 18.4837ZM17.1063 16.1094H4.0333V10.2184C4.0333 6.87706 6.96557 4.15867 10.5698 4.15867C11.9547 4.15867 13.3101 4.57078 14.4234 5.32431L10.6654 11.8333C10.4232 12.2528 10.4232 12.7537 10.6654 13.1732C10.9076 13.5927 11.3414 13.8432 11.8258 13.8432H17.1062V16.1094H17.1063ZM11.9406 12.437L17.2419 3.25487L22.5432 12.437H11.9406Z"
                    fill="currentColor"
                  />
                  <path
                    d="M16.5389 6.91229V8.11715C16.5389 8.50544 16.8537 8.82024 17.242 8.82024C17.6303 8.82024 17.9451 8.50544 17.9451 8.11715V6.91229C17.9451 6.52399 17.6303 6.2092 17.242 6.2092C16.8537 6.2092 16.5389 6.52399 16.5389 6.91229Z"
                    fill="currentColor"
                  />
                  <path
                    d="M17.9314 10.3154C17.8715 10.027 17.6375 9.80217 17.3456 9.75764C17.0557 9.71339 16.7597 9.8631 16.6223 10.1218C16.4841 10.3818 16.5242 10.706 16.7212 10.9248C16.9179 11.1433 17.2401 11.2139 17.511 11.102C17.8155 10.9761 17.9986 10.6396 17.9314 10.3154Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="24" height="24" fill="currentColor" />
                  </clipPath>
                </defs>
              </svg>
              {showMenu && <T.span text="sidebar.notifications" />}
            </NavLink>
          </li>
          <li>
            <UnAvailableToolTip title="Not available in beta!">
              <NavLink
                to="/gateways"
                activeClassName="active"
                className="link--disabled"
                onClick={(event) => event.preventDefault()}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0)">
                    <path
                      d="M23.8183 11.8333L18.4023 2.45241C18.1601 2.0329 17.7263 1.78246 17.2419 1.78246C16.7575 1.78246 16.3237 2.0329 16.0815 2.45241L15.1281 4.10374C14.517 3.70157 13.8484 3.38373 13.146 3.15747V2.57672C13.146 1.1562 11.9903 0.000549316 10.5698 0.000549316C9.14927 0.000549316 7.99363 1.1562 7.99363 2.57672V3.15579C4.87467 4.16378 2.62717 6.94887 2.62717 10.2183V16.1094H2.37429C1.06509 16.1094 0 17.1745 0 18.4837C0 19.7929 1.06509 20.8579 2.37424 20.8579H7.29433C7.36675 22.6024 8.8079 23.9994 10.5698 23.9994C12.3317 23.9994 13.7729 22.6023 13.8453 20.8579H18.7653C20.0746 20.8579 21.1396 19.7928 21.1396 18.4837C21.1396 17.1745 20.0745 16.1094 18.7653 16.1094H18.5125V13.8432H22.6579C23.1423 13.8432 23.5761 13.5927 23.8183 13.1732C24.0606 12.7537 24.0606 12.2528 23.8183 11.8333ZM9.39981 2.57677C9.39981 1.93161 9.92469 1.40678 10.5698 1.40678C11.215 1.40678 11.7398 1.93161 11.7398 2.57677V2.83452C11.3538 2.78024 10.9627 2.75249 10.5698 2.75249C10.1724 2.75249 9.78173 2.78043 9.39981 2.83368V2.57677ZM10.5698 22.5932C9.58341 22.5932 8.77331 21.8266 8.70262 20.858H12.437C12.3663 21.8265 11.5562 22.5932 10.5698 22.5932ZM19.7334 18.4837C19.7334 19.0175 19.2991 19.4517 18.7653 19.4517H2.37424C1.84046 19.4517 1.40618 19.0175 1.40618 18.4837C1.40618 17.9499 1.84046 17.5156 2.37424 17.5156H18.7653C19.2991 17.5156 19.7334 17.9498 19.7334 18.4837ZM17.1063 16.1094H4.0333V10.2184C4.0333 6.87706 6.96557 4.15867 10.5698 4.15867C11.9547 4.15867 13.3101 4.57078 14.4234 5.32431L10.6654 11.8333C10.4232 12.2528 10.4232 12.7537 10.6654 13.1732C10.9076 13.5927 11.3414 13.8432 11.8258 13.8432H17.1062V16.1094H17.1063ZM11.9406 12.437L17.2419 3.25487L22.5432 12.437H11.9406Z"
                      fill="currentColor"
                    />
                    <path
                      d="M16.5389 6.91229V8.11715C16.5389 8.50544 16.8537 8.82024 17.242 8.82024C17.6303 8.82024 17.9451 8.50544 17.9451 8.11715V6.91229C17.9451 6.52399 17.6303 6.2092 17.242 6.2092C16.8537 6.2092 16.5389 6.52399 16.5389 6.91229Z"
                      fill="currentColor"
                    />
                    <path
                      d="M17.9314 10.3154C17.8715 10.027 17.6375 9.80217 17.3456 9.75764C17.0557 9.71339 16.7597 9.8631 16.6223 10.1218C16.4841 10.3818 16.5242 10.706 16.7212 10.9248C16.9179 11.1433 17.2401 11.2139 17.511 11.102C17.8155 10.9761 17.9986 10.6396 17.9314 10.3154Z"
                      fill="currentColor"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect width="24" height="24" fill="currentColor" />
                    </clipPath>
                  </defs>
                </svg>
                {showMenu && <T.span text="sidebar.gateways" />}
              </NavLink>
            </UnAvailableToolTip>
          </li>
          {roleId < 4 ? (
            <li>
              <NavLink to="/admin" activeClassName="active">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0)">
                    <path
                      d="M14.5206 21.0823C14.1531 21.2301 13.8242 21.4058 13.5711 21.5902L12.5978 22.2962C12.4521 22.4028 12.2352 22.4636 12.0013 22.4636C12.0004 22.4636 11.9992 22.4636 11.9984 22.4636C11.7661 22.4636 11.5492 22.4028 11.4018 22.2949L10.4314 21.591C10.1771 21.4053 9.84825 21.2297 9.48064 21.0823C9.08767 20.9233 8.63934 21.1152 8.48113 21.5089C8.32334 21.9028 8.51441 22.3498 8.90823 22.508C9.15592 22.6075 9.37573 22.7228 9.52766 22.8336L10.4976 23.5371C10.9064 23.8352 11.4396 23.9996 11.9966 23.9996C11.9987 23.9996 12.0008 23.9996 12.0029 23.9996C12.5615 23.9996 13.0943 23.8356 13.5019 23.5383L14.4752 22.8328C14.6254 22.7233 14.8452 22.6076 15.0929 22.508C15.4872 22.3503 15.6783 21.9028 15.52 21.5089C15.3619 21.1156 14.914 20.9237 14.5206 21.0823Z"
                      fill="currentColor"
                    />
                    <path
                      d="M17.3763 10.2761C17.2377 9.84692 16.8526 9.55427 16.3156 9.47392L14.0856 9.15089L13.0886 7.13063C12.8496 6.64606 12.4533 6.36841 12.0008 6.36841C11.5483 6.36841 11.152 6.64606 10.9155 7.12857L9.91687 9.15047L7.68351 9.47392C7.14982 9.55427 6.76477 9.8465 6.62616 10.2761C6.48754 10.7053 6.62948 11.167 7.01495 11.542L8.62808 13.1139L8.24801 15.3365C8.17516 15.7591 8.26216 16.1424 8.4928 16.4159C8.83664 16.8251 9.43484 16.9143 10.0052 16.6141L12.0012 15.5651L13.9973 16.6146C14.2259 16.7349 14.4549 16.7957 14.6767 16.7957C15.0081 16.7957 15.3041 16.6604 15.5097 16.4164C15.7408 16.1425 15.8278 15.7595 15.7545 15.3382L15.374 13.1144L16.9879 11.5426C17.3734 11.167 17.5149 10.7053 17.3763 10.2761ZM14.0119 12.2955C13.8308 12.472 13.7476 12.7264 13.7908 12.9758L14.1272 14.9461L12.3588 14.0169C12.2468 13.9578 12.124 13.9286 12.0012 13.9286C11.8784 13.9286 11.7556 13.9578 11.6436 14.0169L9.87398 14.9452L10.2112 12.9758C10.2536 12.7264 10.1712 12.4721 9.9901 12.2955L8.56016 10.9002L10.5371 10.6137C10.7873 10.5775 11.0038 10.4202 11.1158 10.1933L12.0016 8.40161L12.8858 10.1933C12.9982 10.4202 13.2143 10.5775 13.4649 10.6137L15.4427 10.9014L14.0119 12.2955Z"
                      fill="currentColor"
                    />
                    <path
                      d="M23.3321 18.8259L21.9249 17.4188L22.5178 16.9888C23.3608 16.3765 23.7679 15.121 23.4456 14.1314L23.0748 12.9896C22.9049 12.4671 22.9049 11.5167 23.0748 10.9947L23.4456 9.85369C23.7683 8.86252 23.3599 7.60739 22.5178 6.99588L21.5461 6.29029C21.1024 5.96768 20.5429 5.19796 20.373 4.67594L20.0022 3.53449C19.6791 2.54454 18.6117 1.76943 17.571 1.76943H16.3709C15.8218 1.76943 14.9176 1.47514 14.4739 1.15206L13.5023 0.446468C12.6834 -0.148823 11.3168 -0.148823 10.4979 0.446468L9.52547 1.15248C9.08211 1.47509 8.17794 1.76943 7.62887 1.76943H6.42873C5.38801 1.76943 4.32025 2.54454 3.99759 3.53533L3.62708 4.67514C3.45682 5.19801 2.89734 5.96773 2.45398 6.29034L1.48278 6.99551C0.639792 7.60702 0.232243 8.86257 0.554476 9.85331L0.925367 10.9956C1.09562 11.5168 1.09562 12.4672 0.925367 12.99L0.554851 14.1306C0.232665 15.121 0.639792 16.3761 1.48316 16.9893L2.07503 17.4188L0.668481 18.8256C0.468644 19.0258 0.394578 19.3193 0.475723 19.5895C0.556914 19.86 0.780048 20.0645 1.05686 20.1215L3.76396 20.6802L4.32179 23.3868C4.37884 23.6641 4.58323 23.8868 4.8538 23.968C4.92665 23.9896 5.00076 24 5.07445 24C5.27509 24 5.47159 23.9214 5.61813 23.7748L9.1993 20.194C10.0782 20.4949 11.0202 20.6585 11.9998 20.6585C12.9794 20.6585 13.9215 20.4949 14.8004 20.1941L18.3819 23.7752C18.528 23.9213 18.7249 24 18.9256 24C18.9993 24 19.0738 23.9896 19.1467 23.9683C19.4172 23.8867 19.6212 23.664 19.6787 23.3872L20.2369 20.6805L22.9436 20.1219C23.2204 20.0653 23.4435 19.8605 23.5247 19.5899C23.6056 19.3196 23.5315 19.0258 23.3321 18.8259ZM2.38657 15.7446C2.07854 15.5206 1.8991 14.9674 2.0169 14.6052L2.38741 13.4642C2.66052 12.6241 2.66052 11.3577 2.38741 10.5189L2.01652 9.37704C1.89872 9.0153 2.07812 8.46163 2.3862 8.23808L3.35782 7.53248C4.07133 7.01379 4.81564 5.98972 5.08917 5.14968L5.45969 4.00987C5.57791 3.6477 6.04874 3.30512 6.4292 3.30512H7.62934C8.51311 3.30512 9.71743 2.91337 10.4301 2.3943L11.4017 1.68871C11.6952 1.47556 12.3051 1.47514 12.5994 1.68913L13.5697 2.39472C14.2833 2.91426 15.488 3.30596 16.3709 3.30596H17.5711C17.9516 3.30596 18.4228 3.64859 18.5402 4.00991L18.9115 5.15137C19.185 5.99061 19.9289 7.01468 20.6429 7.53337L21.6145 8.23939C21.9226 8.46252 22.1015 9.01619 21.9837 9.37836L21.6132 10.519C21.3397 11.3582 21.3397 12.6245 21.6128 13.4646L21.9841 14.6069C22.1015 14.9682 21.9217 15.5215 21.6144 15.745L20.8243 16.3182L19.9501 15.444C20.4116 14.3857 20.6682 13.2185 20.6682 11.9922C20.6682 7.21325 16.7793 3.32513 11.9999 3.32513C7.2209 3.32513 3.33278 7.21325 3.33278 11.9922C3.33278 13.2182 3.58925 14.3852 4.05047 15.4432L3.17565 16.3182L2.38657 15.7446ZM5.53914 21.6804L5.16699 19.8746C5.10497 19.574 4.87016 19.3388 4.56963 19.2772L2.76337 18.9042L3.78158 17.886C3.78158 17.886 3.78163 17.886 3.78163 17.886L4.82258 16.845C5.5653 17.9398 6.55169 18.8564 7.70322 19.5164L5.53914 21.6804ZM4.87016 11.9922C4.87016 8.06074 8.06849 4.86157 11.9999 4.86157C15.9322 4.86157 19.1313 8.06032 19.1309 11.9922C19.1309 15.9232 15.9322 19.1219 11.9999 19.1219C8.06849 19.1219 4.87016 15.9232 4.87016 11.9922ZM19.4311 19.2776C19.1301 19.3396 18.8949 19.5744 18.8333 19.875L18.4607 21.6808L16.2966 19.5167C17.4483 18.8567 18.4349 17.9402 19.1779 16.8455L20.2195 17.8872C20.2195 17.8872 20.2195 17.8872 20.2195 17.8872C20.2195 17.8872 20.2196 17.8872 20.2196 17.8873L21.2369 18.9046L19.4311 19.2776Z"
                      fill="currentColor"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                {showMenu && <T.span text="sidebar.admin" />}
              </NavLink>
            </li>
          ) : (
            <></>
          )}
        </ul>
        {showMenu && <Footer />}
      </div>
    </div>
  );
};
export default withRouter(Sidebar);
