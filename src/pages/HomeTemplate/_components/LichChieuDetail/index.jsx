import React, { useState, useEffect } from 'react';
import moment from "moment";

export default function LichChieuDetail({
  lichChieu,
  handleBooking,
}) {
    const [selectedDate, setSelectedDate] = useState(null);

  const groupLichChieuByDate = (data) => {
    if (!data) return {};
    return data.reduce((groups, item) => {
      const date = moment(item.ngayChieuGioChieu).format('DD/MM/YYYY');
      if (!groups[date]) groups[date] = [];
      groups[date].push(item);
      return groups;
    }, {});
  };

  const groupedData = groupLichChieuByDate(lichChieu);
  const dates = Object.keys(groupedData);

  useEffect(() => {
    if (dates.length > 0 && !selectedDate) {
      setSelectedDate(dates[0]);
    }
  }, [dates, selectedDate]);

  if (!lichChieu || lichChieu.length === 0) {
    return <div className="text-muted fst-italic">No showtimes available for this movie yet.</div>;
  }

  return (
    <div className="mt-4 w-100">
      {/* DATE SELECTION */}
      <div className="position-relative overflow-hidden" style={{ height: '85px' }}>
        <div className="d-flex gap-3 overflow-auto pb-3">
          {dates.map((date) => {
            const isSelected = selectedDate === date;
            const [day, month] = date.split('/');

            return (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`flex-shrink-0 btn border rounded-3 px-2 py-3`}
                style={{
                  minWidth: '85px',
                  transition: 'all 0.3s ease',
                  backgroundColor: isSelected ? '#dc3545' : '#212529',
                  borderColor: isSelected ? '#dc3545' : '#343a40',
                  color: isSelected ? '#fff' : '#6c757d',
                  boxShadow: isSelected ? '0 0 10px rgba(220,53,69,0.5)' : 'none',
                }}
              >
                <div className="text-uppercase fw-bold" style={{ fontSize: '10px', opacity: 0.8 }}>
                  {moment(date, 'DD/MM/YYYY').format('ddd')}
                </div>
                <div className="fw-bolder">
                  {day}/{month}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* SHOWTIME AREA */}
      <div className="mt-4">
        <div className="row g-3">
          {groupedData[selectedDate]?.map(({ maLichChieu, ngayChieuGioChieu }) => (
            <div key={maLichChieu} className="col-4 col-sm-3 col-md-2">
              <button
                onClick={() => handleBooking?.(maLichChieu)}
                className="btn w-100 border rounded transition-all"
                style={{
                  backgroundColor: '#212529',
                  borderColor: '#343a40',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#dc3545';
                  e.currentTarget.style.borderColor = '#dc3545';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#212529';
                  e.currentTarget.style.borderColor = '#343a40';
                }}
              >
                <span className="fw-bold font-monospace text-light">
                  {moment(ngayChieuGioChieu).format('HH:mm')}
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
