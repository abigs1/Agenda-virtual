import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Admin.css';

type Event = {
  id: number;
  date: string;
  title: string;
  start: string;
  end: string;
  primera: boolean;
};

const mockEvents: Event[] = [
  {
    id: 1,
    date: '2026-03-04',
    title: 'Ana López',
    start: '10:00',
    end: '11:00',
    primera: true,
  },
  {
    id: 2,
    date: '2026-03-05',
    title: 'María Pérez',
    start: '13:00',
    end: '14:00',
    primera: false,
  },
];

const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

const Admin: React.FC = () => {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [tab, setTab] = useState<'semana' | 'calendario' | 'otro'>('semana');
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [calendarDate, setCalendarDate] = useState<Date>(new Date());

  const [newEvent, setNewEvent] = useState({
    date: '',
    title: '',
    start: '',
    end: '',
    primera: false,
  });

  /* WEEK LOGIC */
  const startOfWeek = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay() || 7;
    if (day !== 1) d.setDate(d.getDate() - (day - 1));
    return d;
  };

  const weekStart = startOfWeek(selectedWeek);
  const weekDates = [...Array(7)].map((_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d.toISOString().split('T')[0];
  });

  const monthLabel = selectedWeek.toLocaleDateString('es-MX', {
    month: 'long',
    year: 'numeric',
  });

  const addEvent = () => {
    if (!newEvent.date || !newEvent.title || !newEvent.start || !newEvent.end) return;

    setEvents([
      ...events,
      {
        id: Date.now(),
        ...newEvent,
      },
    ]);

    setNewEvent({ date: '', title: '', start: '', end: '', primera: false });
    setShowAdd(false);
  };

  return (
    <div className="page">
      <header className="header">Agenda</header>

      {/* TABS */}
      <div className="tabs">
        <button onClick={() => setTab('semana')} className={tab === 'semana' ? 'active' : ''}>Semana</button>
        <button onClick={() => setTab('calendario')} className={tab === 'calendario' ? 'active' : ''}>Calendario</button>
        <button onClick={() => setTab('otro')} className={tab === 'otro' ? 'active' : ''}>Otro</button>
      </div>

      {/* SEMANA */}
      {tab === 'semana' && (
        <>
          <div className="week-header">
            <button onClick={() => setSelectedWeek(new Date(selectedWeek.getTime() - 7 * 86400000))}>←</button>

            <div className="week-center">
              <strong>{monthLabel}</strong>
              <button className="today" onClick={() => setSelectedWeek(new Date())}>
                Semana actual
              </button>
            </div>

            <button onClick={() => setSelectedWeek(new Date(selectedWeek.getTime() + 7 * 86400000))}>→</button>
          </div>

          <main className="week-calendar">
            {weekDates.map((date, i) => {
              const dayEvents = events.filter(e => e.date === date);

              return (
                <div className="week-day" key={date}>
                  <div className="day-header">
                    <span>{days[i]}</span>
                    <span>{date.slice(-2)}</span>
                  </div>

                  {dayEvents.map(ev => (
                    <div
                      key={ev.id}
                      className={`event ${ev.primera ? 'beige' : 'black'}`}
                      onClick={() => setSelectedEvent(ev)}
                    >
                      <strong>{ev.start} – {ev.end}</strong>
                      <span>{ev.title}</span>
                    </div>
                  ))}
                </div>
              );
            })}
          </main>
        </>
      )}

      {/* CALENDAR */}
      {tab === 'calendario' && (
        <div className="calendar-wrapper">
          <Calendar
            value={calendarDate}
            onChange={(value) => {
              if (value instanceof Date) setCalendarDate(value);
            }}
            tileContent={({ date }) => {
              const d = date.toISOString().split('T')[0];
              const dayEvents = events.filter(e => e.date === d);

              return (
                <div className="dots">
                  {dayEvents.map(ev => (
                    <span key={ev.id} className={`dot ${ev.primera ? 'beige' : 'black'}`} />
                  ))}
                </div>
              );
            }}
          />

          <div className="day-events">
            {events
              .filter(e => e.date === calendarDate.toISOString().split('T')[0])
              .map(ev => (
                <div
                  key={ev.id}
                  className={`event ${ev.primera ? 'beige' : 'black'}`}
                  onClick={() => setSelectedEvent(ev)}
                >
                  {ev.start} – {ev.end} · {ev.title}
                </div>
              ))}
          </div>
        </div>
      )}

      {tab === 'otro' && <div className="blank">Contenido pendiente ✨</div>}

      {/* ADD BUTTON */}
      <button className="add-button" onClick={() => setShowAdd(true)}>+</button>

      {/* ADD MODAL */}
      {showAdd && (
        <div className="modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Agregar cita</h3>

            <input type="date" onChange={e => setNewEvent({ ...newEvent, date: e.target.value })} />
            <input type="time" onChange={e => setNewEvent({ ...newEvent, start: e.target.value })} />
            <input type="time" onChange={e => setNewEvent({ ...newEvent, end: e.target.value })} />
            <input type="text" placeholder="Nombre" onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} />

            <label className="checkbox">
              <input type="checkbox" onChange={e => setNewEvent({ ...newEvent, primera: e.target.checked })} />
              Primera cita
            </label>

            <div className="modal-actions">
              <button onClick={() => setShowAdd(false)}>Cancelar</button>
              <button onClick={addEvent}>Guardar</button>
            </div>
          </div>
        </div>
      )}

      {/* DETAIL MODAL */}
      {selectedEvent && (
        <div className="modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>{selectedEvent.title}</h3>
            <p>{selectedEvent.date}</p>
            <p>{selectedEvent.start} – {selectedEvent.end}</p>
            <p>{selectedEvent.primera ? 'Primera cita' : 'Seguimiento'}</p>
            <button onClick={() => setSelectedEvent(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
