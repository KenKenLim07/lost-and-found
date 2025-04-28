export default function ItemInfoSection({ item }) {
  const formatContactInfo = (contactInfo) => {
    if (!contactInfo) return null;
    
    // Regex to detect phone numbers (e.g., +1234567890 or (123) 456-7890)
    const phoneRegex = /(\+?\d{1,3}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?(\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})/;
    // Regex to detect emails
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    
    if (phoneRegex.test(contactInfo)) {
      return (
        <a href={`tel:${contactInfo}`} className="text-blue-600 hover:underline">
          {contactInfo}
        </a>
      );
    } else if (emailRegex.test(contactInfo)) {
      return (
        <a href={`mailto:${contactInfo}`} className="text-blue-600 hover:underline">
          {contactInfo}
        </a>
      );
    }
    return contactInfo;
  };

  return (
    <div className="flex-1 border border-gray-200 rounded-2xl p-4 bg-gray-50 space-y-4 mt-2 flex flex-col justify-between shadow-sm">
      
      {/* Status Block */}
      <div className="space-y-3">
        {/* Status + Posted Date */}
        <div className="flex justify-between items-center">
          <span
            className={`inline-block px-3 py-1 rounded-full font-semibold text-xs tracking-wide ${
              item.status === "lost"
                ? "bg-red-100 text-red-700"
                : item.status === "found"
                ? "bg-green-100 text-green-700"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {item.status.toUpperCase()}
          </span>

          <div className="text-xs text-gray-500 text-right">
            <div className="font-medium">Posted</div>
            <div>{new Date(item.created_at).toLocaleDateString()}</div>
          </div>
        </div>

        {/* Returned Status */}
        <div className="flex justify-between items-center">
          <span
            className={`inline-block px-3 py-1 rounded-full font-semibold text-xs tracking-wide ${
              item.is_returned
                ? "bg-purple-100 text-purple-700"
                : "bg-gray-200 text-gray-400"
            }`}
          >
            {item.is_returned ? "RETURNED" : "NOT RETURNED"}
          </span>

          <div className="text-xs text-gray-500 text-right">
            {item.is_returned ? (
              <>
                <div className="text-gray-700">
                  <span className="font-medium">Returned to:</span>
                  <span className="ml-1">{item.returned_to}</span>
                </div>
                <div>
                  <span className="font-bold">
                    {new Date(item.date_returned).toLocaleDateString()}
                  </span>
                </div>
              </>
            ) : (
              <div>Not yet returned</div>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="border border-yellow-300 bg-yellow-100/50 p-4 rounded-xl">
        <p className="text-xs font-bold text-gray-700 mb-2">Description</p>
        <p className="text-sm text-gray-700 leading-snug break-words line-clamp-5">
          {item.description}
        </p>
      </div>

      {/* Contact Info */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-gray-500 mb-1">Contact Information</p>
        <div className="text-sm text-gray-700 break-words">
          {formatContactInfo(item.contact_info)}
        </div>
      </div>
    </div>
  );
}
