import { useEffect, useState } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from './history';
import Home from './pages/Home';
import EventPage from './pages/EventPage';
import RegisterPage from './pages/RegisterPage';
import { getEventsPagination, getCountEvents } from './api/api';
import { CONSTANTS } from './constants';

function App() {

  const [error, setError] = useState(null);
  const [eventList, setEventList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getCountEvents()
      .then(result => {
        const totalRecords = result.data.data;
        setTotalPages(Math.ceil(totalRecords / CONSTANTS.PAGE_LIMIT));
      })
      .catch(error => {
        setError(error);
      })
  }, [])

  useEffect(() => {
    getEventsPagination(currentPage - 1)
      .then((result) => {
        setEventList(result.data.data);
      })
      .catch((error) => {
        setError(error.message);
      })
  }, [currentPage]);

  useEffect(() => {
    if (error) {
      alert('Opps, something goes wrong');
      setError(null);
    }
  }, [error]);

  return (
    <>
      <Router history={history}>
        <Switch>
          <Route path='/' exact>
            <Home eventList={eventList}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setCurrentEvent={setCurrentEvent}
              totalPages={totalPages} />
          </Route>
          <Route path='/event'>
            <EventPage currentEvent={currentEvent}
              setError={setError} />
          </Route>
          <Route path='/register'>
            <RegisterPage currentEvent={currentEvent}
              setError={setError} />
          </Route>
        </Switch>
      </Router>
      {/* <ToastContainer /> */}
    </>
  );
}

export default App;
