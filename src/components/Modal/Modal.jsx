import React, { useState } from 'react';
import { Modal, Card, Image } from 'antd';

const MovieModal = ({ title, description, releaseYear, imageUrl, onClose }) => {
  const defaultImageUrl =
  'https://www.shutterstock.com/image-vector/default-image-icon-vector-missing-260nw-2079504220.jpg';
  const [visible, setVisible] = useState(true);

  const handleCancel = () => {
    setVisible(false);
    onClose();
  };
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = defaultImageUrl;
  };
  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={handleCancel}
      footer={null}
      width="400px"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center', // Centrar el contenido del modal
      }}
      bodyStyle={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <p style={{ fontSize: '16px', marginBottom: '0.5rem', width: '100%' }}>
        {description}
      </p>
      <Card style={{ maxHeight: '500px' }}>
        <Image onError={handleImageError} src={imageUrl } alt={title} style={{ width: '100%', objectFit: 'cover', height: '200px' }} />
      <p style={{ fontStyle: 'italic', color: 'gray', marginBottom: '0.5rem' }}>
        {`Release Year: ${releaseYear}`}
      </p>
      </Card>
    </Modal>
  );
};

export default MovieModal;
