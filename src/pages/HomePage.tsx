import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneCall, CreditCard, History, BarChart4 } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-8">
      <section className="text-center py-12 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <h1 className="text-4xl font-bold mb-6">Sri Lanka's #1 Mobile Reload Platform</h1>
        <p className="text-xl max-w-2xl mx-auto mb-8">
          Top up mobile credit for Dialog, Mobitel, Hutch, and Airtel networks quickly and securely.
        </p>
        <Link 
          to="/reload" 
          className="inline-block bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg shadow-lg 
            hover:bg-blue-50 transition duration-300 transform hover:scale-105"
        >
          Reload Now
        </Link>
      </section>

      <section className="py-12">
        <h2 className="text-2xl font-bold text-center mb-8">Why Choose SmartReload...?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={<PhoneCall className="h-10 w-10 text-blue-600" />}
            title="All Networks"
            description="Support for Dialog, Mobitel, Hutch, and Airtel networks in one place."
          />
          <FeatureCard 
            icon={<CreditCard className="h-10 w-10 text-blue-600" />}
            title="Secure Transactions"
            description="Your payments are protected with industry-standard security."
          />
          <FeatureCard 
            icon={<History className="h-10 w-10 text-blue-600" />}
            title="Transaction History"
            description="Access your complete transaction history anytime."
          />
          <FeatureCard 
            icon={<BarChart4 className="h-10 w-10 text-blue-600" />}
            title="Real-time Updates"
            description="Instant confirmation and receipts for every reload."
          />
        </div>
      </section>

      <section className="bg-gray-100 rounded-xl p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6">Supported Networks</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <NetworkCard name="Dialog" color="bg-green-600" prefixes="077, 076, 075, 072" />
          <NetworkCard name="Mobitel" color="bg-blue-600" prefixes="071, 070" />
          <NetworkCard name="Hutch" color="bg-orange-600" prefixes="078" />
          <NetworkCard name="Airtel" color="bg-red-600" prefixes="075" />
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

interface NetworkCardProps {
  name: string;
  color: string;
  prefixes: string;
}

const NetworkCard: React.FC<NetworkCardProps> = ({ name, color, prefixes }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
      <div className={`${color} w-16 h-16 rounded-full flex items-center justify-center text-white font-bold mb-3`}>
        {name.charAt(0)}
      </div>
      <h3 className="font-semibold mb-1">{name}</h3>
      <p className="text-xs text-gray-500">Prefixes: {prefixes}</p>
    </div>
  );
};

export default HomePage;