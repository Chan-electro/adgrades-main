import React from 'react';
import { ExternalLink } from 'lucide-react';

interface InteractivePortfolioCardProps {
  title: string;
  category: string;
  description: string;
  image: string;
  tags?: string[];
}

const InteractivePortfolioCard: React.FC<InteractivePortfolioCardProps> = ({
  title,
  category,
  description,
  image,
  tags = []
}) => {
  return (
    <div className="group relative bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] border border-gray-200/50 dark:border-gray-700/50">
      {/* Image container with overlay */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Category badge */}
        <div className="absolute top-4 left-4 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <span className="bg-blue-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
            {category}
          </span>
        </div>
        
        {/* Hover action button */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <button className="bg-white/90 hover:bg-white text-gray-900 p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110">
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          {description}
        </p>
        
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-md font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {/* Subtle border glow on hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-blue-500/0 group-hover:border-blue-500/20 transition-colors duration-500 pointer-events-none" />
    </div>
  );
};

export default InteractivePortfolioCard;