import React from 'react';
import { SellerReputation } from '../../types';

interface ReputationBadgeProps {
  reputation?: SellerReputation;
}

export function ReputationBadge({ reputation }: ReputationBadgeProps) {
  if (!reputation?.level_id) {
    return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
      Sin datos
    </span>;
  }

  const getReputationStyle = (levelId: string) => {
    switch (levelId) {
      case '5_green':
        return 'bg-green-100 text-green-800';
      case '4_light_green':
        return 'bg-green-50 text-green-700';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${getReputationStyle(reputation.level_id)}`}>
      {reputation.level_id.split('_').join(' ')}
    </span>
  );
}