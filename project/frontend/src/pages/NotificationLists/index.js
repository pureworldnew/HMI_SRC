import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../Dashboard/Header';
import StatCard from '../../components/StatCard/index';
import loadingGif from '../../assets/gif/loading.gif';
import Modal from '../../components/Modal';
import NotificationService from '../../services/NotificationService';

function NotificationLists({ ...props }) {
  const dispatch = useDispatch();
  // const notifications = useSelector(
  //   (state) => state.notifications.notificationData
  // );
  // const loading = useSelector((state) => state.loading.models.alerts);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    dispatch.notifications.getAllNotifications();
  }, []);

  const deleteReport = async () => {
    await dispatch.alerts.getAllAlerts();
    await setModalShow(null);
  };

  const pauseReport = async () => {};

  const [page, setPage] = useState(0);
  const [notificationList, setNotificationList] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);

  const noOfDatasInTable = 6;
  const noOfPages = parseInt(notificationList.length / noOfDatasInTable);
  const dataInTable = notificationList.slice(
    page * noOfDatasInTable,
    page * noOfDatasInTable + noOfDatasInTable
  );

  const paginationComponent = () => {
    return (
      <div className="pagination" style={{ flex: 'auto' }}>
        <div
          className="pagination__prev"
          onClick={() => {
            if (page > 0) {
              setPage(page - 1);
            }
          }}>
          Previous
        </div>
        <div className="pagination__pages">
          <ul>
            {Array(noOfPages + 1)
              .fill('')
              .map((d, index) => (
                <li
                  key={index + 'sjlk'}
                  className={`pagination__page ${
                    index === page ? `pagination__page--active` : null
                  }`}
                  onClick={() => {
                    setPage(index);
                  }}>
                  {index + 1}
                </li>
              ))}
          </ul>
        </div>
        <div
          className="pagination__next"
          onClick={() => {
            if (page < noOfPages) {
              setPage(page + 1);
            }
          }}>
          Next
        </div>
      </div>
    );
  };

  useEffect(() => {
    setPageLoading(true);
    NotificationService.getNotification()
      .then((res) => {
        console.log('state changeweqwe:', res);
        setNotificationList(res.data);
        setPageLoading(false);
        props.updateState(false);
      })
      .catch((err) => {
        console.log('Error:', err);
      });
  }, []);

  return (
    <div className="dashboard revenue-insights">
      <Header title="Notifications Lists" type="Notification_lists" />
      {pageLoading ? (
        <div className="panel-body terminology d-flex justify-content-center align-items-center">
          <img className="pb-5 mb-5" src={loadingGif} alt="loader gif" />
        </div>
      ) : (
        <div className="revenue-insights__statsGrid adminTeams">
          {dataInTable.map((notification, index) => (
            <StatCard
              key={index}
              actionName={notification.action_name}
              grid={index + 1}
              page="notification_lists"
              notificationId={notification.id}
            />
          ))}
        </div>
      )}
      {noOfPages >= 1 ? paginationComponent() : null}
      <Modal
        title="Report edit"
        modalShow={modalShow === 'edit'}
        onClose={() => setModalShow(false)}
        footerBtnControl={true}
        btnTitle={['Confirm', 'Close']}
      />
      <Modal
        title="Report pause"
        modalShow={modalShow === 'pause'}
        onClose={() => setModalShow(false)}
        content="Please confirm if you really want pause report."
        footerBtnControl={true}
        btnTitle={['Confirm', 'Close']}
        onConfirm={() => pauseReport()}
      />
      <Modal
        title="Report delete"
        modalShow={modalShow === 'delete'}
        onClose={() => setModalShow(false)}
        content="Please confirm if you really want delete report."
        footerBtnControl={true}
        btnTitle={['Confirm', 'Close']}
        onConfirm={() => deleteReport()}
      />
    </div>
  );
}

export default NotificationLists;
