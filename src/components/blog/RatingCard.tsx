import { calculateAverageRating } from '@/lib/utils';

interface RatingCardProps {
  ratings: Record<string, number>;
}

export default function RatingCard({ ratings }: RatingCardProps) {
  // Get the overall rating directly if it exists, or calculate it
  const overallRating = ratings.overall || calculateAverageRating(ratings);
  
  // Format the rating name to be more readable
  const formatRatingName = (name: string): string => {
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
    // Special case for German words like "Preis"
    return {
      'preis': 'Preis',
      'konsistenz': 'Konsistenz',
      'geschmack': 'Geschmack',
      'sättigung': 'Sättigung',
      'optik': 'Optik',
      'overall': 'Gesamtwertung'
    }[name.toLowerCase()] || formattedName;
  };
  
  // Get color based on rating value
  const getRatingColor = (value: number): string => {
    if (value >= 8.5) return 'bg-green-500';
    if (value >= 7) return 'bg-green-400';
    if (value >= 5.5) return 'bg-yellow-400';
    if (value >= 4) return 'bg-orange-400';
    return 'bg-red-400';
  };
  
  // Filter out "overall" from individual ratings display
  const individualRatings = Object.entries(ratings).filter(
    ([key]) => key.toLowerCase() !== 'overall'
  );
  
  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      <div className="bg-gray-100/30 px-4 py-3 border-b border-gray-200">
        <h3 className="text-lg font-semibold">Bewertung</h3>
      </div>
      
      <div className="p-4">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <span className="text-3xl font-bold">{overallRating}</span>
            <span className="text-lg text-gray-500">/10</span>
          </div>
          <div className="h-3 flex-1 mx-4 overflow-hidden rounded-full bg-gray-100">
            <div 
              className={`h-full ${getRatingColor(overallRating)}`} 
              style={{ width: `${(overallRating / 10) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="space-y-3">
          {individualRatings.map(([name, value]) => (
            <div key={name} className="flex items-center justify-between">
              <span className="text-sm">{formatRatingName(name)}</span>
              <div className="flex items-center">
                <span className="mr-2 text-sm font-medium">{value}/10</span>
                <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-100">
                  <div 
                    className={`h-full ${getRatingColor(value)}`}
                    style={{ width: `${(value / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 