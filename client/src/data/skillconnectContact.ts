/*
 * SkillConnect contact details, taken from the main SunEx website (thesunex.com/contact).
 * The phone number below was supplied by the SunEx team and is also the WhatsApp number.
 */
export const skillconnectContact = {
  email: "skillconnect@thesunex.com",
  generalEmail: "info@thesunex.com",
  phone: "+91 87928 43688", // also a WhatsApp number
  whatsapp: "918792843688", // digits only with country code
  response: "Within 24 hours",
  centre: {
    name: "SkillConnect Training Centre, Mysuru",
    address: "1133/D, Third Floor, Gokulam 2nd Stage, 2nd Main, Mysuru, Karnataka 570002",
    landmark: "Near Ganapathi Temple and Adithya Hospital",
  },
};

export const skillconnectMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${skillconnectContact.centre.address}`,
)}`;
