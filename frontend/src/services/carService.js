import api from './api';

export const createCar = async (carData) => {
  try {
    const formData = new FormData();
    Object.keys(carData).forEach(key => {
      if (key === 'images') {
        carData.images.forEach(image => {
          formData.append('images', image);
        });
      } else if (key === 'tags') {
        formData.append('tags', carData.tags.join(','));
      } else {
        formData.append(key, carData[key]);
      }
    });

    const response = await api.post('/cars', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUserCars = async () => {
  try {
    const response = await api.get('/cars');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getCarById = async (id) => {
  try {
    const response = await api.get(`/cars/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateCar = async (id, carData) => {
  try {
    const formData = new FormData();
    Object.keys(carData).forEach(key => {
      if (key === 'images') {
        carData.images.forEach(image => {
          formData.append('images', image);
        });
      } else if (key === 'tags') {
        formData.append('tags', carData.tags.join(','));
      } else {
        formData.append(key, carData[key]);
      }
    });

    const response = await api.put(`/cars/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteCar = async (id) => {
  try {
    const response = await api.delete(`/cars/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const searchCars = async (keyword) => {
  try {
    const response = await api.get(`/cars/search?keyword=${keyword}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};