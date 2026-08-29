import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_INSPECTIONS } from '../data/mockInspections';

const AuthInspectionContext = createContext();

const DEFAULT_OFFICER = {
  name: "Officer Sharma",
  officerId: "LM/EG/2026/1001",
  department: "Legal Metrology",
  email: "officer.sharma@gov.in",
  phone: "+91 96765 43210",
  location: "New Delhi, India",
  role: "Enforcement Officer",
  isLoggedIn: true
};

export function AuthInspectionProvider({ children }) {
  // Officer auth state
  const [officer, setOfficer] = useState(() => {
    const saved = localStorage.getItem('lm_officer_session');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return DEFAULT_OFFICER;
  });

  // Registered users storage
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const saved = localStorage.getItem('lm_registered_users');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      {
        fullName: "Officer Sharma",
        officerId: "LM/EG/2026/1001",
        email: "officer.sharma@gov.in",
        department: "Legal Metrology",
        password: "password123"
      }
    ];
  });

  // Inspections history state
  const [inspections, setInspections] = useState(() => {
    const saved = localStorage.getItem('lm_inspections');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_INSPECTIONS;
  });

  // Current active scan flow state
  const [capturedImage, setCapturedImage] = useState(null);
  const [activeAnalysis, setActiveAnalysis] = useState(null);

  // Save changes to localStorage
  useEffect(() => {
    if (officer) {
      localStorage.setItem('lm_officer_session', JSON.stringify(officer));
    } else {
      localStorage.removeItem('lm_officer_session');
    }
  }, [officer]);

  useEffect(() => {
    localStorage.setItem('lm_registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  useEffect(() => {
    localStorage.setItem('lm_inspections', JSON.stringify(inspections));
  }, [inspections]);

  // Auth helper methods
  const login = (identifier, password) => {
    const found = registeredUsers.find(
      u => (u.officerId.toLowerCase() === identifier.toLowerCase() || u.email.toLowerCase() === identifier.toLowerCase())
    );

    if (found && found.password === password) {
      const session = {
        name: found.fullName,
        officerId: found.officerId,
        department: found.department || "Legal Metrology",
        email: found.email,
        phone: "+91 98765 43210",
        location: "Regional Enforcement Hub",
        role: "Enforcement Officer",
        isLoggedIn: true
      };
      setOfficer(session);
      return { success: true };
    }

    // Default fallback check for demo
    if (identifier && password) {
      const session = {
        name: identifier.includes('@') ? identifier.split('@')[0] : identifier,
        officerId: identifier,
        department: "Legal Metrology",
        email: identifier.includes('@') ? identifier : `${identifier}@gov.in`,
        phone: "+91 96765 43210",
        location: "Central Enforcement Division",
        role: "Compliance Inspector",
        isLoggedIn: true
      };
      setOfficer(session);
      return { success: true };
    }

    return { success: false, message: "Invalid credentials" };
  };

  const loginWithBiometric = () => {
    const session = DEFAULT_OFFICER;
    setOfficer(session);
    return { success: true };
  };

  const registerUser = (userData) => {
    const newUser = {
      fullName: userData.fullName,
      officerId: userData.officerId,
      email: userData.email,
      department: userData.department,
      password: userData.password
    };
    setRegisteredUsers(prev => [...prev, newUser]);
    return { success: true };
  };

  const logout = () => {
    setOfficer(null);
    localStorage.removeItem('lm_officer_session');
  };

  // Scanning flow methods
  const setCapturedPhoto = (imageData) => {
    setCapturedImage(imageData);
  };

  const generateScanAnalysis = (productNameHint = "Scanned Commodity", imageBase64 = null) => {
    const timestampDate = "05 Sep 2026";
    const timestampTime = "10:32 AM";
    const newId = `INS-2026-${String(inspections.length + 1).padStart(3, '0')}`;

    // Randomize slightly or create realistic non-compliant audit result
    const isCompliant = Math.random() > 0.6;

    const mockResult = isCompliant ? {
      id: newId,
      name: productNameHint || "Tata Salt Iodised 1kg",
      category: "Grocery & Staples",
      netQuantity: "1 kg",
      manufacturer: "Tata Consumer Products Ltd.",
      mrp: "₹28.00 (Incl. of all taxes)",
      date: timestampDate,
      time: timestampTime,
      rawTimestamp: "2026-09-05T10:32:00",
      status: "COMPLIANT",
      complianceScore: 95,
      checks: { total: 12, passed: 12, violations: 0, warnings: 0 },
      violationsList: [],
      ocrExtracted: {
        productName: productNameHint || "Tata Salt Iodised",
        netQty: "1 kg",
        mrpText: "MRP Rs 28.00 (INCL. OF ALL TAXES)",
        mfgDate: "01/09/2026",
        countryOfOrigin: "Made in India",
        customerCare: "1800 108 4444 / care@tataconsumer.com"
      },
      image: imageBase64 || capturedImage || "https://images.unsplash.com/photo-1626197031507-c170a045c697?auto=format&fit=crop&w=400&q=80"
    } : {
      id: newId,
      name: productNameHint || "Tata Salt Iodised",
      category: "Grocery & Staples",
      netQuantity: "1 kg",
      manufacturer: "Tata Consumer Products Ltd.",
      mrp: "₹28.00 (Unverified font)",
      date: timestampDate,
      time: timestampTime,
      rawTimestamp: "2026-09-05T10:32:00",
      status: "NON-COMPLIANT",
      complianceScore: 72,
      checks: { total: 12, passed: 8, violations: 3, warnings: 1 },
      violationsList: [
        { id: 1, title: "MRP Declaration", desc: "MRP not declared on the product front panel." },
        { id: 2, title: "Mandatory Declaration", desc: "Country of Origin is missing." },
        { id: 3, title: "Readability", desc: "Text is not clearly readable / font height under 1.5mm." }
      ],
      ocrExtracted: {
        productName: productNameHint || "Tata Salt Iodised 1kg",
        netQty: "1 kg",
        mrpText: "MRP: UNREADABLE / MISSING",
        mfgDate: "02/09/2026",
        countryOfOrigin: "NOT SPECIFIED",
        customerCare: "care@tataconsumer.com"
      },
      image: imageBase64 || capturedImage || "https://images.unsplash.com/photo-1626197031507-c170a045c697?auto=format&fit=crop&w=400&q=80"
    };

    setActiveAnalysis(mockResult);

    // Save to inspection list
    setInspections(prev => [mockResult, ...prev]);
    return mockResult;
  };

  return (
    <AuthInspectionContext.Provider value={{
      officer,
      login,
      loginWithBiometric,
      registerUser,
      logout,
      inspections,
      setInspections,
      capturedImage,
      setCapturedPhoto,
      activeAnalysis,
      setActiveAnalysis,
      generateScanAnalysis
    }}>
      {children}
    </AuthInspectionContext.Provider>
  );
}

export function useAuthInspection() {
  return useContext(AuthInspectionContext);
}
