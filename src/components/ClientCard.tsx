import React from "react";

interface ClientCardProps {
  name: string;
  category: string;
  logo?: string;
}

// Function to get appropriate logo based on client name
// const getClientLogo = (name: string): string => {
//   const logoMap: { [key: string]: string } = {
//     "OS CODE Solutions":
//       "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?w=100&h=100&fit=crop",
//     "Delhi 65":
//       "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?w=100&h=100&fit=crop",
//     "Medhavi Classes":
//       "https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?w=100&h=100&fit=crop",
//     Uplifto:
//       "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?w=100&h=100&fit=crop",
//     "Vinayaka Enterprises":
//       "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?w=100&h=100&fit=crop",
//     "M K Streetwear":
//       "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?w=100&h=100&fit=crop",
//     Adhyayan:
//       "https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?w=100&h=100&fit=crop",
//     "Dew Drop Homestay":
//       "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?w=100&h=100&fit=crop",
//     "Nataraj Dance Studios":
//       "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?w=100&h=100&fit=crop",
//     "Pureblend Foods":
//       "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=100&h=100&fit=crop",
//     "SP Enterprises":
//       "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?w=100&h=100&fit=crop",
//     "AS Tech Industries":
//       "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?w=100&h=100&fit=crop",
//   };

//   return logoMap[name] || "";
// };

const ClientCard: React.FC<ClientCardProps> = ({ name, category, logo }) => {
  // const clientLogo = logo || getClientLogo(name);
  const clientLogo = logo;

  return (
    <div className="relative mx-2 sm:mx-3 lg:mx-6 w-40 sm:w-48 lg:w-72 cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-3 sm:p-4 lg:p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 group flex-shrink-0">
      <div className="flex flex-col items-center text-center">
        {/* Logo/Image - Mobile Responsive */}
        <div className="mb-2 sm:mb-3 lg:mb-4 flex h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-32 items-center justify-center rounded-lg sm:rounded-xl bg-professional-gradient shadow-lg overflow-hidden group-hover:scale-110 transition-transform duration-300">
          {clientLogo ? (
            <img
              src={clientLogo}
              alt={name}
              className="h-full w-full rounded-lg sm:rounded-xl object-fit"
            />
          ) : (
            <span className="text-xs sm:text-sm lg:text-lg font-bold text-white">
              {name
                .split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 2)}
            </span>
          )}
        </div>

        {/* Client Name - Mobile Responsive */}
        <h3 className="mb-1 sm:mb-2 text-xs sm:text-sm lg:text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors duration-300 text-center leading-tight">
          {name}
        </h3>

        {/* Category - Mobile Responsive */}
        <span className="rounded-full bg-primary/20 px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-medium text-primary text-center">
          {category}
        </span>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
};

export default ClientCard;
