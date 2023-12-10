import React from 'react';

const Card = ({ data, title }) => {
  const cardStyle = {
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    padding: 15,
    margin: 10,
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16)',
  };

  const labelStyle = {
    color: '#434343',
    fontWeight: 'bold',
  };

  const valueStyle = {
    color: '#757575',
  };

  return (
    <div style={cardStyle}>
      <h3 style={{ textAlign: 'center', color: '#009933' }}>{title}</h3>
      {Object.entries(data).map(([key, value]) => (
        <div key={key}>
          <span style={labelStyle}>{key}:</span>
          <span style={valueStyle}> {value}</span>
        </div>
      ))}
    </div>
  );
};

export default Card;