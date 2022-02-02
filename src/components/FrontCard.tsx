import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventActivity } from '../model/Event';
import Modal from 'react-modal';
import data from '../model/data';
import EditMeetup from './EditMeetup';
import '../App.css';
import edit from './edit.png';
import deleteEv from './delete.png';
import closeBtn from './close-button.png';

interface Props {
  searchText: string;
}

export default function FrontCard({ searchText }: Props) {
  const [events, setEvents] = useState<any>([]);
  const [online, setOnline] = useState<boolean>(false);
  const [live, setLive] = useState<boolean>(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };
  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  const navigate = useNavigate();

  let updatedEvent: EventActivity;

  function handleDeleteEvent(id: number) {
    let storedEvents = JSON.parse(localStorage.getItem('events') || '');
    updatedEvent = storedEvents.filter(
      (store: EventActivity) => store.id !== id,
    );
    localStorage.setItem('events', JSON.stringify(updatedEvent));
    setEvents(updatedEvent);
  }

  function handleReadMore(id: number) {
    localStorage.setItem('eventID', JSON.stringify(id));
    navigate('/details');
  }

  if (!localStorage.getItem('events')) {
    localStorage.setItem('events', JSON.stringify(data));
    setEvents(data);
  }

  useEffect(() => {
    if (localStorage.getItem('events')) {
      let fetchEvents = JSON.parse(localStorage.getItem('events') || '');

      setEvents(fetchEvents);
    }
  }, []);

  let showEvents = !searchText
    ? events
    : events.filter((event: EventActivity) =>
        event.title.toLowerCase().includes(searchText.toLocaleLowerCase()),
      );

  let filteredEvents =
    online && !live
      ? showEvents.filter(
          (event: EventActivity) => event.location.toLowerCase() === 'online',
        )
      : !online && live
      ? showEvents.filter(
          (event: EventActivity) => event.location.toLowerCase() !== 'online',
        )
      : showEvents;

  return (
    <>
      <section data-testid="filter-events" className="filter-events">
        <div className="filter-wrapper">
          <div className="checkbox">
            <label htmlFor="online">Online</label>
            <input
              type="checkbox"
              id="online"
              checked={online}
              onChange={() => setOnline(!online)}
            />
            <label htmlFor="live">Live</label>
            <input
              type="checkbox"
              id="live"
              checked={live}
              onChange={() => setLive(!live)}
            />
          </div>
        </div>
      </section>
      {filteredEvents.map((activity: EventActivity) => {
        return (
          <section
            data-testid="all-events"
            className="grid-container"
            key={activity.id}
          >
            <section
              key={activity.id}
              className="frontCard"
              data-testid="create-group-btn"
            >
              <img
                className="event-icon"
                src={activity.imgUrl}
                alt="event icon"
              />
              <h3 className="activity-title">{activity.title}</h3>
              <div className="date-location">
                <p className="date-time">{activity.date}</p>
                <p className="location">{activity.location}</p>
              </div>
              <p className="description">{activity.description}</p>

              <button
                className="readmore-button"
                onClick={() => handleReadMore(activity.id)}
                data-testid="readmoreBtn"
              >
                Read more
              </button>
              {activity.creator === 'organiser' ? (
                <section className="edit-delete-wrapper">
                  <button
                    className="btn-edit-event-icon"
                    data-testid="edit-button"
                    onClick={() => {
                      if (
                        new Date(activity.date).getTime() < new Date().getTime()
                      ) {
                        alert('You cannot Edit an old event');
                      } else {
                        setModalIsOpenToTrue();
                      }
                    }}
                  >
                    {/* <img className="edit-event-icon" src={edit} alt="edit" /> */}
                    Edit
                  </button>
                  <Modal
                    isOpen={modalIsOpen}
                    style={{
                      overlay: {
                        background: 'rgba(255, 255, 255, 0.75)',
                      },
                      content: {
                        maxWidth: '45rem',
                        background: 'rgb(206, 211, 219)',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                      },
                    }}
                  >
                    <button
                      onClick={setModalIsOpenToFalse}
                      className="close-modal-btn"
                    >
                      <img
                        className="close-event-icon"
                        src={closeBtn}
                        alt="close"
                      />
                    </button>
                    <EditMeetup eventDetails={activity} />
                  </Modal>
                  <button
                    data-testid="delete-button"
                    className="btn-delete-event-icon"
                    onClick={() => {
                      if (
                        new Date(activity.date).getTime() < new Date().getTime()
                      ) {
                        alert('You cannot delete an old event');
                      } else {
                        handleDeleteEvent(activity.id);
                      }
                    }}
                  >
                    {/* <img
                      className="delete-event-icon"
                      src={deleteEv}
                      alt="delete"
                    /> */}{' '}
                    Delete
                  </button>
                </section>
              ) : null}
            </section>
          </section>
        );
      })}
    </>
  );
}
