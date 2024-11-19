import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as carService from '../../services/carService';
import LoadingSpinner from '../shared/LoadingSpinner';
import Alert from '../shared/Alert';
import SearchBar from '../shared/SearchBar';

const CarCard = ({ car, onDelete }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg">
    <div className="h-48 overflow-hidden">
      <img
        src={car.images[0] || '/placeholder-car.jpg'}
        alt={car.title}
        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
      />
    </div>
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">{car.title}</h2>
      <p className="text-gray-600 mb-2">{car.company}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {car.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center pt-3 border-t">
        <Link
          to={`/cars/${car._id}`}
          className="text-blue-500 hover:text-blue-700 font-medium"
        >
          View Details
        </Link>
        <button
          onClick={() => onDelete(car._id)}
          className="text-red-500 hover:text-red-700 font-medium transition-colors duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    try {
      const data = await carService.getUserCars();
      setCars(data);
    } catch (err) {
      setError('Failed to load cars');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (searchTerm.trim()) {
        const results = await carService.searchCars(searchTerm);
        setCars(results);
      } else {
        await loadCars();
      }
    } catch (err) {
      setError('Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await carService.deleteCar(id);
        setCars(cars.filter(car => car._id !== id));
        setSuccessMessage('Car deleted successfully');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (err) {
        setError('Failed to delete car');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Cars</h1>
        <Link
          to="/cars/new"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition duration-150 ease-in-out shadow-sm"
        >
          Add New Car
        </Link>
      </div>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        onSubmit={handleSearch}
      />

      {error && <Alert type="error" message={error} />}
      {successMessage && <Alert type="success" message={successMessage} />}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {cars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car) => (
                <CarCard key={car._id} car={car} onDelete={handleDelete} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-600">No cars found</h3>
              <p className="text-gray-500 mt-2">Add your first car to get started!</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CarList;