import { useState, useEffect, useRef } from "react";
import DescriptionSection from "./DescriptionSection";

export default function ItemInfoSection({ item }) {
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const backdropRef = useRef(null);
  const MAX_PREVIEW_CHARS = 120;

  const isLongDescription = item.description?.length > MAX_PREVIEW_CHARS;

  useEffect(() => {
    if (isDescriptionModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isDescriptionModalOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) {
      setIsDescriptionModalOpen(false);
    }
  };

  const formatContactInfo = (contactInfo) => {
    if (!contactInfo) return null;
    
    // Regex to detect phone numbers (e.g., +1234567890 or (123) 456-7890)
    const phoneRegex = /(\+?\d{1,3}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?(\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})/;
    // Regex to detect emails
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    
    if (phoneRegex.test(contactInfo)) {
      return (
        <a 
          href={`tel:${contactInfo}`} 
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {contactInfo}
        </a>
      );
    } else if (emailRegex.test(contactInfo)) {
      return (
        <a 
          href={`mailto:${contactInfo}`} 
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {contactInfo}
        </a>
      );
    }
    return (
      <div className="flex items-center text-gray-700">
        <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        {contactInfo}
      </div>
    );
  };

  // Format date to a more readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Status badge component for consistent styling
  const StatusBadge = ({ status, isReturned }) => {
    if (isReturned) {
      return (
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
          <span className="text-xs font-medium text-green-700">RETURNED</span>
        </div>
      );
    }
    
    return (
      <div className="flex items-center">
        <div className={`w-2 h-2 rounded-full mr-2 ${
          status === "lost" ? "bg-red-500" : "bg-green-500"
        }`}></div>
        <span className={`text-xs font-medium ${
          status === "lost" ? "text-red-700" : "text-green-700"
        }`}>
          {status.toUpperCase()}
        </span>
      </div>
    );
  };

  // Info row component for consistent layout
  const InfoRow = ({ label, value, icon }) => (
    <div className="flex items-center text-xs text-gray-600">
      <svg className="w-3.5 h-3.5 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {icon}
      </svg>
      <span className="font-medium mr-1">{label}:</span>
      <span>{value}</span>
    </div>
  );

  return (
    <div className="flex-1 border border-gray-200 rounded-2xl p-4 bg-gray-50 space-y-4 mt-1 flex flex-col justify-between shadow-sm">
      
    {/* Status Block */}
<div className="border border-gray-200 bg-gray-50/60 p-4 rounded-2xl space-y-4 shadow-sm">
  {/* Section Header */}
  <div className="flex items-center gap-2">
    <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
    <h4 className="text-sm- font-semibold text-gray-800">Item Status</h4>
  </div>

  {/* Initial Status + Posted */}
  <div className="flex justify-between items-start">
    <div>
      <p className="text-xs text-gray-500 mb-1">Initial Status</p>
      <StatusBadge status={item.status} isReturned={false} />
    </div>
    <div className="text-right">
      <InfoRow 
        label="Posted"
        value={formatDate(item.created_at)}
        icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />}
      />
    </div>
  </div>

  <hr className="border-t border-gray-200" />
{/* Current Status */}
<div className="flex justify-between items-start mt-2">
  <div>
    <p className="text-xs text-gray-500 mb-1">Current Status</p>
    <div className="inline-flex items-center gap-1">
      <span
        className={`h-2 w-2 rounded-full ${
          item.is_returned ? 'bg-green-500' : 'bg-red-500'
        }`}
      />
      <span
        className={`text-xs font-medium ${
          item.is_returned ? 'text-green-700' : 'text-red-700'
        }`}
      >
        {item.is_returned ? 'RETURNED' : 'NOT RETURNED'}
      </span>
    </div>
  </div>

  <div className="text-right text-xs space-y-0.5">
    {item.is_returned ? (
      <>
        <div className="flex items-center justify-end gap-1 text-gray-700">
          <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="font-medium">Returned to:</span>
          <span>{item.returned_to}</span>
        </div>
        <div className="flex items-center justify-end gap-1 text-gray-700">
          <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="font-medium">Date:</span>
          <span>{formatDate(item.date_returned)}</span>
        </div>
      </>
    ) : (
      <div className="italic text-gray-500">Not yet returned</div>
    )}
  </div>
</div>
</div>

  {/* Description */}
  <DescriptionSection 
    description={item.description}
    isLongDescription={isLongDescription}
    isModalOpen={isDescriptionModalOpen}
    onModalOpen={() => setIsDescriptionModalOpen(true)}
    onModalClose={() => setIsDescriptionModalOpen(false)}
    backdropRef={backdropRef}
    onBackdropClick={handleBackdropClick}
  />

{/* Contact Info */}
<div className="-mt-5 border border-blue-100 bg-blue-50/50 p-2 rounded-xl">
  <div className="flex items-center mb-1.5">
    <svg
      className="w-4 h-4 text-blue-500 mr-1.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
      />
    </svg>
    <p className="text-xs font-medium text-blue-700">Contact Information</p>
  </div>
  <div className="text-sm text-gray-700 break-words pl-6">
    {formatContactInfo(item.contact_info)}
  </div>
</div>

    </div>
  );
}