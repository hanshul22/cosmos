import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import styled from 'styled-components';

const StyledMissions = styled.div`
  .mission-card {
    background: rgba(11,13,23,0.8);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(123,137,228,0.2);
    transition: all 0.3s ease;

    &:hover {
      border-color: rgba(123,137,228,0.4);
      transform: translateY(-5px);
      box-shadow: 0 4px 20px rgba(123,137,228,0.1);
    }
  }

  .status-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 500;

    &.success {
      background: rgba(34, 197, 94, 0.1);
      color: rgb(34, 197, 94);
      border: 1px solid rgba(34, 197, 94, 0.2);
    }

    &.failed {
      background: rgba(239, 68, 68, 0.1);
      color: rgb(239, 68, 68);
      border: 1px solid rgba(239, 68, 68, 0.2);
    }

    &.ongoing {
      background: rgba(234, 179, 8, 0.1);
      color: rgb(234, 179, 8);
      border: 1px solid rgba(234, 179, 8, 0.2);
    }
  }

  .pagination-btn {
    background: rgba(123,137,228,0.1);
    border: 1px solid rgba(123,137,228,0.3);
    color: #7B89E4;
    transition: all 0.3s ease;

    &:hover:not(:disabled) {
      background: rgba(123,137,228,0.2);
      transform: translateY(-2px);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .skeleton {
    background: linear-gradient(
      90deg,
      rgba(123,137,228,0.1) 25%,
      rgba(123,137,228,0.15) 37%,
      rgba(123,137,228,0.1) 63%
    );
    background-size: 400% 100%;
    animation: skeleton-loading 1.4s ease infinite;
  }

  @keyframes skeleton-loading {
    0% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
`;

function MissionCard({ mission }) {
  const getStatusColor = (status) => {
    if (!status) return 'ongoing';
    status = status.toLowerCase();
    if (status.includes('successful')) return 'success';
    if (status.includes('unsuccessful') || status.includes('failed')) return 'failed';
    return 'ongoing';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mission-card rounded-lg p-6"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white">{mission.name}</h3>
        <span className={`status-badge ${getStatusColor(mission.missionStatus)}`}>
          {mission.missionStatus || 'Ongoing'}
        </span>
      </div>
      
      <div className="space-y-3 text-gray-400">
        <p>
          <span className="font-semibold text-gray-300">Launch Date:</span>{' '}
          {new Date(mission.launchDate).toLocaleDateString()}
        </p>
        <p>
          <span className="font-semibold text-gray-300">Launch Vehicle:</span>{' '}
          {mission.launchVehicle}
        </p>
        {mission.orbitType && (
          <p>
            <span className="font-semibold text-gray-300">Orbit Type:</span>{' '}
            {mission.orbitType}
          </p>
        )}
        <p>
          <span className="font-semibold text-gray-300">Application:</span>{' '}
          {mission.application}
        </p>
      </div>
      
      {mission.link && (
        <a
          href={mission.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-space-accent hover:text-space-accent/80 transition-colors"
        >
          Learn More →
        </a>
      )}
    </motion.div>
  );
}

function MissionCardSkeleton() {
  return (
    <div className="mission-card rounded-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="skeleton h-7 w-48 rounded"></div>
        <div className="skeleton h-6 w-24 rounded-full"></div>
      </div>
      
      <div className="space-y-3">
        <div className="skeleton h-5 w-36 rounded"></div>
        <div className="skeleton h-5 w-full rounded"></div>
        <div className="skeleton h-5 w-3/4 rounded"></div>
        <div className="skeleton h-5 w-5/6 rounded"></div>
      </div>
      
      <div className="skeleton h-6 w-28 rounded mt-4"></div>
    </div>
  );
}

function Missions() {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const missionsPerPage = 9;

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://services.isrostats.in/api/spacecraft');
        setMissions(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch missions');
        setLoading(false);
      }
    };

    fetchMissions();
  }, []);

  const indexOfLastMission = currentPage * missionsPerPage;
  const indexOfFirstMission = indexOfLastMission - missionsPerPage;
  const currentMissions = missions.slice(indexOfFirstMission, indexOfLastMission);
  const totalPages = Math.ceil(missions.length / missionsPerPage);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <StyledMissions className="pt-20 min-h-screen bg-space-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-orbitron font-bold text-white mb-4">
            ISRO Space Missions
          </h1>
          <p className="text-gray-400">
            Explore India's journey to space through various spacecraft missions
          </p>
        </motion.div>

        {error && (
          <div className="text-red-500 text-center py-8">
            {error}
          </div>
        )}

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {loading ? (
            Array(missionsPerPage).fill(0).map((_, index) => (
              <MissionCardSkeleton key={index} />
            ))
          ) : (
            currentMissions.map(mission => (
              <MissionCard key={mission._id} mission={mission} />
            ))
          )}
        </motion.div>

        {!loading && !error && (
          <div className="mt-12 flex justify-center gap-4">
            <button
              onClick={() => setCurrentPage(prev => prev - 1)}
              disabled={currentPage === 1}
              className="pagination-btn px-4 py-2 rounded-lg"
            >
              Previous
            </button>
            <span className="text-white px-4 py-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={currentPage === totalPages}
              className="pagination-btn px-4 py-2 rounded-lg"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </StyledMissions>
  );
}

export default Missions;