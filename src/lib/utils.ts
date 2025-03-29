import { format, parseISO } from 'date-fns';

/**
 * Format a date string into a readable format
 */
export function formatDate(date: string): string {
  const parsed = parseISO(date);
  return format(parsed, 'MMMM d, yyyy');
}

/**
 * Create URL-friendly slug from a string
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

/**
 * Calculate the average rating from a ratings object
 */
export function calculateAverageRating(ratings: Record<string, number>): number {
  // Filter out the "overall" rating if it exists, as it's already an average
  const filteredRatings = Object.entries(ratings).filter(
    ([key]) => key.toLowerCase() !== 'overall'
  );
  
  if (filteredRatings.length === 0) {
    return ratings.overall || 0;
  }
  
  const sum = filteredRatings.reduce((acc, [, value]) => acc + value, 0);
  const average = sum / filteredRatings.length;
  
  // Return either the calculated average or the provided overall score
  return ratings.overall || parseFloat(average.toFixed(1));
} 