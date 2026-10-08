// LocalStorage manager for AutoKhata with Settlement Periods

const CURRENT_RIDES_KEY = 'autokhata_current_rides';
const SETTLEMENTS_KEY = 'autokhata_settlements';
const PEOPLE_KEY = 'autokhata_people';

export const DEFAULT_PEOPLE = ['Rumi', 'Huda', 'Juveria'];

/**
 * Format currency to Indian Rupee standard (e.g. ₹1,363 or ₹454.33)
 */
export const formatRupees = (amount, forceDecimals = false) => {
  const num = parseFloat(amount) || 0;
  if (forceDecimals || num % 1 !== 0) {
    return `₹${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `₹${num.toLocaleString('en-IN')}`;
};

/**
 * Get stored 3 people names
 */
export const getStoredPeople = () => {
  try {
    const raw = localStorage.getItem(PEOPLE_KEY);
    if (!raw) return DEFAULT_PEOPLE;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length === 3 ? parsed : DEFAULT_PEOPLE;
  } catch (err) {
    return DEFAULT_PEOPLE;
  }
};

/**
 * Save 3 people names
 */
export const saveStoredPeople = (people) => {
  try {
    localStorage.setItem(PEOPLE_KEY, JSON.stringify(people));
  } catch (err) {
    console.error("Failed to save people:", err);
  }
};

/**
 * Get current active expense period rides (newest date first)
 */
export const getStoredCurrentRides = () => {
  try {
    const raw = localStorage.getItem(CURRENT_RIDES_KEY);
    if (!raw) return [];
    const rides = JSON.parse(raw);
    return Array.isArray(rides)
      ? rides.sort((a, b) => new Date(b.date) - new Date(a.date))
      : [];
  } catch (err) {
    console.error("Failed to load current rides:", err);
    return [];
  }
};

/**
 * Save current active expense period rides
 */
export const saveCurrentRides = (rides) => {
  try {
    localStorage.setItem(CURRENT_RIDES_KEY, JSON.stringify(rides));
  } catch (err) {
    console.error("Failed to save current rides:", err);
  }
};

/**
 * Get all completed settlements history
 */
export const getStoredSettlements = () => {
  try {
    const raw = localStorage.getItem(SETTLEMENTS_KEY);
    if (!raw) return [];
    const settlements = JSON.parse(raw);
    return Array.isArray(settlements) ? settlements : [];
  } catch (err) {
    console.error("Failed to load settlements:", err);
    return [];
  }
};

/**
 * Save completed settlements history
 */
export const saveSettlements = (settlements) => {
  try {
    localStorage.setItem(SETTLEMENTS_KEY, JSON.stringify(settlements));
  } catch (err) {
    console.error("Failed to save settlements:", err);
  }
};

/**
 * Calculate total for a single day entry object (Going + Return + Additional)
 */
export const calculateDayTotal = (going, returnFare, additional = []) => {
  const g = parseFloat(going) || 0;
  const r = parseFloat(returnFare) || 0;
  const addSum = (additional || []).reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0);
  return g + r + addSum;
};

/**
 * Compute per-person balances and settlements for the 3 people
 */
export const calculatePeopleBalances = (rides = [], people = DEFAULT_PEOPLE) => {
  const totalExpense = rides.reduce((acc, curr) => acc + (parseFloat(curr.total) || 0), 0);
  const numPeople = people.length || 3;
  const equalShare = totalExpense > 0 ? (totalExpense / numPeople) : 0;

  const paidMap = {};
  people.forEach(p => { paidMap[p] = 0; });

  rides.forEach(ride => {
    const person = ride.paidBy || people[0];
    const amt = parseFloat(ride.total) || 0;
    if (paidMap[person] !== undefined) {
      paidMap[person] += amt;
    } else {
      const match = people.find(p => p.toLowerCase() === person.toLowerCase());
      if (match) {
        paidMap[match] += amt;
      } else {
        paidMap[people[0]] += amt;
      }
    }
  });

  const balances = people.map(name => {
    const totalPaid = paidMap[name] || 0;
    const net = totalPaid - equalShare;
    return {
      name,
      totalPaid,
      equalShare,
      net,
      status: net > 0.01 ? 'receives' : net < -0.01 ? 'owes' : 'settled'
    };
  });

  return {
    totalExpense,
    equalShare,
    balances
  };
};

/**
 * Format date to short format (e.g. "08 Nov")
 */
export const formatShortDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString + 'T00:00:00');
  if (isNaN(date.getTime())) return dateString;
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'short' });
  return `${day} ${month}`;
};

/**
 * Format single date (e.g. "08 NOV 2026")
 */
export const formatDateDisplay = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString + 'T00:00:00');
  if (isNaN(date.getTime())) return dateString;
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

/**
 * Format date range from a list of rides (e.g. "08–11 NOV 2026")
 */
export const formatDateRange = (rides = []) => {
  if (!rides || rides.length === 0) return 'No dates';
  
  const timestamps = rides.map(r => new Date(r.date + 'T00:00:00').getTime()).filter(t => !isNaN(t));
  if (timestamps.length === 0) return 'Custom Period';

  const minDate = new Date(Math.min(...timestamps));
  const maxDate = new Date(Math.max(...timestamps));

  const minDay = String(minDate.getDate()).padStart(2, '0');
  const maxDay = String(maxDate.getDate()).padStart(2, '0');
  
  const minMonth = minDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const maxMonth = maxDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const year = maxDate.getFullYear();

  if (minDate.getTime() === maxDate.getTime()) {
    return `${minDay} ${minMonth} ${year}`;
  }

  if (minMonth === maxMonth) {
    return `${minDay}–${maxDay} ${maxMonth} ${year}`;
  }

  return `${minDay} ${minMonth} – ${maxDay} ${maxMonth} ${year}`;
};

/**
 * Get default YYYY-MM-DD for today
 */
export const getTodayDateString = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
