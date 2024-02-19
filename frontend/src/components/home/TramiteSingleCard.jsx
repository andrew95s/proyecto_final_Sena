import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import TramiteModal from './TramiteModal';

const TramiteSingleCard = ({ tramite }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'>
      <h2 className='absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg'>
        {tramite.Municipio}
      </h2>
      <h4 className='my-2 text-gray-500'>{tramite._id}</h4>
      <div className='flex justify-start items-center gap-x-2'>
        <PiBookOpenTextLight className='text-red-300 text-2xl' />
        <h2 className='my-1'>{tramite.Numero_Predial}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <BiUserCircle className='text-red-300 text-2xl' />
        <h2 className='my-1'>{tramite.Numero_Radicacion}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <PiBookOpenTextLight className='text-red-300 text-2xl' />
        <h2 className='my-1'>{tramite.Tipo_Tramite}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <BiUserCircle className='text-red-300 text-2xl' />
        <h2 className='my-1'>{tramite.Folio_Matricula}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <PiBookOpenTextLight className='text-red-300 text-2xl' />
        <h2 className='my-1'>{tramite.Ejecutor}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <BiUserCircle className='text-red-300 text-2xl' />
        <h2 className='my-1'>{tramite.Fecha_inicio_tarea_de_ejecucion}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <BiUserCircle className='text-red-300 text-2xl' />
        <h2 className='my-1'>{tramite.Fecha_fin_tarea_de_ejecucion}</h2>
      </div>

      <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
        <BiShow
          className='text-3xl text-blue-800 hover:text-black cursor-pointer'
          onClick={() => setShowModal(true)}
        />
        <Link to={`/tramites/details/${tramite._id}`}>
          <BsInfoCircle className='text-2xl text-green-800 hover:text-black' />
        </Link>
        <Link to={`/tramites/edit/${tramite._id}`}>
          <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-black' />
        </Link>
        <Link to={`/tramites/delete/${tramite._id}`}>
          <MdOutlineDelete className='text-2xl text-red-600 hover:text-black' />
        </Link>
      </div>
      {showModal && (
        <TramiteModal book={tramite} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

// Add PropTypes validation
TramiteSingleCard.propTypes = {
  tramite: PropTypes.object.isRequired // Ensure tramite is an object and required
};

export default TramiteSingleCard;
