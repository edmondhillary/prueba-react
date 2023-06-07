import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';

const defaultImageUrl = 'https://www.shutterstock.com/image-vector/default-image-icon-vector-missing-260nw-2079504220.jpg'; 

export const CardPoster = ({ text, description, releaseYear, img, height }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const imageUrl = img || defaultImageUrl; // Utiliza la URL de la imagen original o la imagen por defecto si no está disponible

  return (
    <Card
      hoverable
      style={{
        width: 240,
        height: height,
        background: '#202020',
        opacity: hovered ? 0.8 : 1,
        transition: 'opacity 0.3s ease',
        position: 'relative',
        margin: '1rem',
      }}
      cover={<img alt={text} src={imageUrl} style={{ height: '100%', objectFit: 'cover' }} />}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '8px',
          background: hovered ? 'rgba(0, 0, 0, 0.8)' : 'transparent',
          transition: 'background 0.3s ease',
        }}
      >
        <Link
          to={`/${text}`} // Modifica el enlace según tus necesidades
          style={{
            color: '#fff',
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '4px',
            display: 'block',
          }}
        >
          {text}
        </Link>
        {hovered && description && (
          <span
            style={{
              color: '#fff',
              fontSize: '14px',
              display: 'block',
              whiteSpace: 'normal',
            }}
          >
            {`${description} (${releaseYear})`}
          </span>
        )}
      </div>
    </Card>
  );
};
