import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import * as carService from '../../services/carService';

const CarDetail = () => {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentImage, setCurrentImage] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadCar = async () => {
      try {
        const data = await carService.getCarById(id);
        setCar(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load car details');
        setLoading(false);
      }
    };

    if (id) {
      loadCar();
    }
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await carService.deleteCar(id);
        navigate('/cars');
      } catch (err) {
        setError('Failed to delete car');
      }
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;
  if (!car) return <div className="text-center mt-8">Car not found</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          to="/cars"
          className="text-blue-500 hover:text-blue-700 mb-4 inline-block"
        >
          ← Back to Cars
        </Link>
        <h1 className="text-3xl font-bold mb-2">{car.title}</h1>
        <div className="flex gap-2 mb-4">
          {car.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 px-2 py-1 rounded text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Image Gallery */}
      <div className="mb-8">
        {car.images.length > 0 ? (
          <div>
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <img
                src={car.images[currentImage]}
                alt={car.title}
                className="object-contain w-full h-full rounded-lg"
              />
            </div>
            {car.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {car.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 
                      ${currentImage === index ? 'border-blue-500' : 'border-transparent'}`}
                  >
                    <img
                      src={image}
                      alt={`${car.title} - Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gray-100 h-64 flex items-center justify-center rounded-lg">
            No images available
          </div>
        )}
      </div>

      {/* Car Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Details</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Description</h3>
              <p className="text-gray-600">{car.description}</p>
            </div>
            <div>
              <h3 className="font-semibold">Car Type</h3>
              <p className="text-gray-600">{car.car_type}</p>
            </div>
            <div>
              <h3 className="font-semibold">Company</h3>
              <p className="text-gray-600">{car.company}</p>
            </div>
            <div>
              <h3 className="font-semibold">Dealer</h3>
              <p className="text-gray-600">{car.dealer}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-4">
          <Link
            to={`/cars/edit/${car._id}`}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
          >
            Edit Car
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete Car
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;