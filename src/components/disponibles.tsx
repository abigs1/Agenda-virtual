import React, { useState } from 'react';
import './Disponibles.css';

type DbSlot = {
    id: string;
    day: 'Miércoles' | 'Jueves';
    date: string;
    hours: string[];
};

const mockData: DbSlot[] = [
    { id: 'w1-m', day: 'Miércoles', date: '6 Mar', hours: ['10:00', '12:00', '14:00'] },
    { id: 'w1-j', day: 'Jueves', date: '7 Mar', hours: ['11:00', '13:00', '15:00'] },

    { id: 'w2-m', day: 'Miércoles', date: '13 Mar', hours: ['10:00', '12:00', '14:00'] },
    { id: 'w2-j', day: 'Jueves', date: '14 Mar', hours: ['11:00', '13:00', '15:00'] },

    { id: 'w3-m', day: 'Miércoles', date: '20 Mar', hours: ['10:00', '12:00', '14:00'] },
    { id: 'w3-j', day: 'Jueves', date: '21 Mar', hours: ['11:00', '13:00', '15:00'] },

    { id: 'w4-m', day: 'Miércoles', date: '27 Mar', hours: ['10:00', '12:00', '14:00'] },
    { id: 'w4-j', day: 'Jueves', date: '28 Mar', hours: ['11:00', '13:00', '15:00'] },

    { id: 'w5-m', day: 'Miércoles', date: '3 Abr', hours: ['10:00', '12:00', '14:00'] },
    { id: 'w5-j', day: 'Jueves', date: '4 Abr', hours: ['11:00', '13:00', '15:00'] },
];

function groupIntoWeeks(data: DbSlot[]): DbSlot[][] {
    const weeks: DbSlot[][] = [];
    for (let i = 0; i < data.length; i += 2) {
        weeks.push([data[i], data[i + 1]]);
    }
    return weeks;
}

const Disponibles: React.FC = () => {
    const weeks = groupIntoWeeks(mockData);

    const [page, setPage] = useState(0);
    const [selected, setSelected] = useState<{
        slotId: string;
        date: string;
        hour: string;
    } | null>(null);

    const weeksPerPage = 2;
    const visibleWeeks = weeks.slice(
        page * weeksPerPage,
        page * weeksPerPage + weeksPerPage
    );

    return (
        <div className="page">
            <header className="header">Atelier Lidia Sanmartin</header>

            <main className="weeks-wrapper">
                {visibleWeeks.map((week: DbSlot[], index: number) => (
                    <div className="week" key={index}>
                        {week.map((slot: DbSlot) => (
                            <div className="slot-card" key={slot.id}>
                                <div className="slot-header">
                                    <span>{slot.day}</span>
                                    <small>{slot.date}</small>
                                </div>

                                <div className="hours">
                                    {slot.hours.map((hour: string) => (
                                        <button
                                            key={hour}
                                            className={`hour ${selected?.slotId === slot.id &&
                                                selected.hour === hour
                                                ? 'selected'
                                                : ''
                                                }`}
                                            onClick={() =>
                                                setSelected({
                                                    slotId: slot.id,
                                                    date: slot.date,
                                                    hour,
                                                })
                                            }
                                        >
                                            {hour}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </main>

            <div className="controls">
                {page > 0 && (
                    <button className="arrow" onClick={() => setPage(p => p - 1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                            <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                        </svg>
                    </button>
                )}
                {(page + 1) * weeksPerPage < weeks.length && (
                    <button className="arrow" onClick={() => setPage(p => p + 1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                        </svg>
                    </button>
                )}
            </div>

            {selected && (
                <div className="selection-box">
                    <p>
                        Seleccionaste <strong>{selected.date}</strong> a las{' '}
                        <strong>{selected.hour}</strong>
                    </p>
                    <button className="continue">Continuar</button>
                </div>
            )}
        </div>
    );
};

export default Disponibles;
