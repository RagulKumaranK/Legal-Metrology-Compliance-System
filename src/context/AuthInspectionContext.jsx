import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_INSPECTIONS, DEMO_SCAN_QUEUE, UPLOADED_PRODUCT_TEMPLATE } from '../data/mockInspections';

const AuthInspectionContext = createContext();

const DEFAULT_OFFICER = {
  name: "Officer Sharma",
  officerId: "LM/EG/2026/1001",
  department: "Legal Metrology",
  email: "officer.sharma@gov.in",
  phone: "+91 96765 43210",
  location: "New Delhi, India",
  role: "Enforcement Officer",
  isLoggedIn: false
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

  // Inspections history state - Auto sync saved items with current DEMO_SCAN_QUEUE image URLs
  const [inspections, setInspections] = useState(() => {
    const saved = localStorage.getItem('lm_inspections');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
            .filter(i => i.name !== "Amul Gold Milk" && i.ocrExtracted?.productName !== "Amul Gold Pasteurised Full Cream Milk")
            .map(item => {
              const match = DEMO_SCAN_QUEUE.find(d => d.name.toLowerCase() === item.name.toLowerCase()) ||
                            (item.name === UPLOADED_PRODUCT_TEMPLATE.name ? UPLOADED_PRODUCT_TEMPLATE : null);
              if (match) {
                return {
                  ...match,
                  ...item,
                  status: match.status || item.status,
                  complianceScore: match.complianceScore !== undefined ? match.complianceScore : item.complianceScore,
                  checks: match.checks || item.checks,
                  fontSizeAnalysis: match.fontSizeAnalysis || item.fontSizeAnalysis,
                  ocrExtracted: match.ocrExtracted || item.ocrExtracted,
                  violationsList: match.violationsList || item.violationsList,
                  image: match.image || item.image,
                  rawImage: match.rawImage || item.rawImage,
                  processedImage: match.processedImage || item.processedImage
                };
              }
              return item;
            });
        }
      } catch (e) {}
    }
    return INITIAL_INSPECTIONS;
  });

  // Sequential scanning demo index
  const [scanQueueIndex, setScanQueueIndex] = useState(() => {
    const saved = localStorage.getItem('lm_scan_queue_index');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Current active scan flow state
  const [capturedImage, setCapturedImage] = useState(null);
  const [activeAnalysis, setActiveAnalysis] = useState(null);

  // Server Database Sync Effect (Initial fetch & 2s real-time poll)
  useEffect(() => {
    let isMounted = true;

    async function syncWithServerDb() {
      try {
        const res = await fetch('/api/inspections');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            if (isMounted) {
              setInspections(prev => {
                if (JSON.stringify(prev) !== JSON.stringify(data)) {
                  return data;
                }
                return prev;
              });
            }
          } else if (data === null) {
            // Seed server DB with initial inspections
            await fetch('/api/inspections', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(INITIAL_INSPECTIONS)
            });
          }
        }
      } catch (e) {}
    }

    syncWithServerDb();
    const interval = setInterval(syncWithServerDb, 2000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Save changes to localStorage & Server Database
  useEffect(() => {
    localStorage.setItem('lm_inspections', JSON.stringify(inspections));
    fetch('/api/inspections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inspections)
    }).catch(() => {});
  }, [inspections]);

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
    localStorage.setItem('lm_scan_queue_index', scanQueueIndex.toString());
  }, [scanQueueIndex]);

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
    session.isLoggedIn = true;
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

  // Sequential Scan Simulation Trigger
  const triggerNextScanSequence = (customImage = null, isUpload = false) => {
    const baseProduct = isUpload ? UPLOADED_PRODUCT_TEMPLATE : DEMO_SCAN_QUEUE[scanQueueIndex % DEMO_SCAN_QUEUE.length];
    const newId = `INS-2026-${String(inspections.length + 1).padStart(3, '0')}`;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newScannedProduct = {
      ...baseProduct,
      id: newId,
      date: "05 Sep 2026",
      time: timeStr || baseProduct.time,
      rawTimestamp: new Date().toISOString(),
      isNewScan: true,
      rawImage: customImage || baseProduct.rawImage || baseProduct.image,
      processedImage: baseProduct.processedImage || customImage || baseProduct.image,
      image: customImage || baseProduct.image
    };

    setCapturedImage(customImage || baseProduct.rawImage || baseProduct.image);
    setActiveAnalysis(newScannedProduct);
    
    // Automatically add to scanned products list/history
    setInspections(prev => [newScannedProduct, ...prev]);
    
    // Increment index only for camera scans
    if (!isUpload) {
      setScanQueueIndex(prev => prev + 1);
    }

    return newScannedProduct;
  };

  const setCapturedPhoto = (imageData) => {
    setCapturedImage(imageData);
  };

  const generateScanAnalysis = (productNameHint = "Scanned Commodity", imageBase64 = null) => {
    if (activeAnalysis) {
      return activeAnalysis;
    }
    return triggerNextScanSequence();
  };

  const clearHistory = () => {
    setInspections([]);
    setScanQueueIndex(0);
    localStorage.removeItem('lm_inspections');
    localStorage.removeItem('lm_scan_queue_index');
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
      generateScanAnalysis,
      triggerNextScanSequence,
      scanQueueIndex,
      clearHistory
    }}>
      {children}
    </AuthInspectionContext.Provider>
  );
}

export function useAuthInspection() {
  return useContext(AuthInspectionContext);
}
