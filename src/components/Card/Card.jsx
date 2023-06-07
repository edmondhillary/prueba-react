import React, { useState, useEffect } from 'react';
import { Modal, Card, Image, Spin } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';

const CardPoster = ({ text, description, releaseYear, img, height, onClick }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [loading, setLoading] = useState(true);
  const defaultImageUrl =
    'https://www.shutterstock.com/image-vector/default-image-icon-vector-missing-260nw-2079504220.jpg';

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleModalClick = () => {
    if (text !== 'Series' && text !== 'Peliculas') {
      onClick();
    } else {
      navigate(`/${text}`);
    }
  };

  const imageUrl = img || defaultImageUrl;

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = defaultImageUrl;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 , display: 'flex', justifyContent: 'center', alignItems: 'center'}} spin />;

  return (
    <Card
      className="card-hover"
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
      cover={
        loading ? (
          <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Spin style={{ fontSize: 24 , display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:'2rem'}} indicator={antIcon} />
          </div>
        ) : (
          <Image
            preview={false}
            alt={text}
            src={imageUrl}
            style={{ height: '100%', objectFit: 'cover' }}
            onError={handleImageError}
          />
        )
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleModalClick}
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
          to={`/${text}`}
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

export default CardPoster;
