import React from 'react';
import { RecurringTable } from '../experience/RecurringTable';

export const Scene05LongNights: React.FC = () => {
  return (
    <group>
      <RecurringTable />
      {/* Desk lamp point light */}
      <pointLight position={[0.6, 1.2, 0]} color="#fef08a" intensity={3} distance={5} decay={2} />
    </group>
  );
};
