import React, { useState, useEffect, useRef } from 'react';
import './styles/theme.css';
import { Header } from './components/Header';
import { TodayEntry } from './components/TodayEntry';
import { TotalExpenseCard } from './components/TotalExpenseCard';
import { SplitCard } from './components/SplitCard';
import { RideHistory } from './components/RideHistory';
import { SettlementHistory } from './components/SettlementHistory';
import { PeopleSetupModal } from './components/PeopleSetupModal';
import { PixelRoadDecoration } from './components/PixelRoadDecoration';
import { PixelToastManager } from './components/PixelToastManager';
import { 
  getStoredCurrentRides, 
  saveCurrentRides,
  getStoredSettlements,
  saveSettlements, 
  getStoredPeople, 
  saveStoredPeople,
  calculatePeopleBalances,
  formatRupees 
} from './utils/storage';
import confetti from 'canvas-confetti';

const FUN_MESSAGES = [
  "Meter running…",
  "Ride recorded!",
  "Another day, another ride.",
  "Khata updated ✓",
  "Ready for the next ride?"
];

export function App() {
  const [currentRides, setCurrentRides] = useState([]);
  const [settlements, setSettlements] = useState([]);
  const [people, setPeople] = useState(['Rumi', 'Huda', 'Juveria']);
  const [editingEntry, setEditingEntry] = useState(null);
  const [isPeopleModalOpen, setIsPeopleModalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const todayEntryRef = useRef(null);

  // Load current active rides, completed settlements, and 3 people names on mount
  useEffect(() => {
    const loadedRides = getStoredCurrentRides();
    const loadedSettlements = getStoredSettlements();
    const loadedPeople = getStoredPeople();
    setCurrentRides(loadedRides);
    setSettlements(loadedSettlements);
    setPeople(loadedPeople);
  }, []);

  // Toast notification trigger
  const triggerToast = (msg) => {
    const toastMessage = msg || FUN_MESSAGES[Math.floor(Math.random() * FUN_MESSAGES.length)];
    const newToast = { id: Date.now() + Math.random(), message: toastMessage };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 3200);
  };

  // Calculate Overall Total Expense for Current Active Expense Period
  const totalExpense = currentRides.reduce((acc, curr) => acc + (parseFloat(curr.total) || 0), 0);
  const totalDaysCount = currentRides.length;

  // Save / Update Ride Handler for Current Active Period
  const handleSaveDay = (dayData, isEditing) => {
    let updatedRides;
    if (isEditing) {
      updatedRides = currentRides.map((r) => (r.id === dayData.id ? dayData : r));
      triggerToast("Ride updated ✓");
    } else {
      updatedRides = [dayData, ...currentRides];
      triggerToast();
    }

    updatedRides.sort((a, b) => new Date(b.date) - new Date(a.date));

    setCurrentRides(updatedRides);
    saveCurrentRides(updatedRides);
    setEditingEntry(null);
  };

  // Delete Ride Handler
  const handleDeleteRide = (idToDelete) => {
    const updatedRides = currentRides.filter((r) => r.id !== idToDelete);
    setCurrentRides(updatedRides);
    saveCurrentRides(updatedRides);
    triggerToast("Ride deleted");
  };

  // Save 3 People Names Handler
  const handleSavePeople = (newPeople) => {
    setPeople(newPeople);
    saveStoredPeople(newPeople);
    setIsPeopleModalOpen(false);
    triggerToast("People names updated!");
  };

  // Complete and Save Settlement Handler (Archive Active Period)
  const handleCompleteSettlement = () => {
    if (currentRides.length === 0) return;

    const { equalShare, balances } = calculatePeopleBalances(currentRides, people);
    
    const settlementNumber = settlements.length + 1;
    const newSettlement = {
      id: 'settlement_' + Date.now(),
      number: settlementNumber,
      totalExpense,
      numPeople: people.length,
      perPerson: equalShare,
      people: [...people],
      balances,
      rides: [...currentRides],
      ridesCount: currentRides.length,
      completedAt: new Date().toISOString()
    };

    const updatedSettlements = [newSettlement, ...settlements];
    setSettlements(updatedSettlements);
    saveSettlements(updatedSettlements);

    // Clear active period rides for a fresh new expense period
    setCurrentRides([]);
    saveCurrentRides([]);
    setEditingEntry(null);

    // Particle explosion celebration
    try {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#FFC800', '#2ED573', '#FFFFFF']
      });
    } catch (e) {}

    triggerToast(`Settlement #${settlementNumber} Completed & Saved! 🎉`);
  };

  // Delete archived settlement handler
  const handleDeleteSettlement = (idToDelete) => {
    const updated = settlements.filter(s => s.id !== idToDelete);
    setSettlements(updated);
    saveSettlements(updated);
    triggerToast("Settlement box deleted");
  };

  // Trigger + NEW DAY / START NEW EXPENSE PERIOD action
  const handleNewDay = () => {
    setEditingEntry(null);
    if (todayEntryRef.current) {
      todayEntryRef.current.resetForm();
    }
    triggerToast("Ready for the next ride?");
    
    const entryEl = document.getElementById('today-entry-card');
    if (entryEl) {
      entryEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Trigger Edit Ride
  const handleEditRide = (ride) => {
    setEditingEntry(ride);
    const entryEl = document.getElementById('today-entry-card');
    if (entryEl) {
      entryEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // TOTAL button click action
  const handleRecalculateTotal = () => {
    triggerToast(`Current Period Total: ${formatRupees(totalExpense)} (${totalDaysCount} Days)`);
  };

  // Load sample dataset for testing
  const handleLoadSampleData = () => {
    const sampleRides = [
      {
        id: 'sample_1',
        date: '2026-11-09',
        going: 250,
        returnFare: 124,
        paidBy: 'Rumi',
        additional: [],
        total: 374
      },
      {
        id: 'sample_2',
        date: '2026-11-08',
        going: 269,
        returnFare: 200,
        paidBy: 'Huda',
        additional: [],
        total: 469
      },
      {
        id: 'sample_3',
        date: '2026-11-07',
        going: 270,
        returnFare: 250,
        paidBy: 'Juveria',
        additional: [],
        total: 520
      }
    ];
    setCurrentRides(sampleRides);
    saveCurrentRides(sampleRides);
    triggerToast("Sample active period loaded 🛺");
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px 60px 20px' }}>
      {/* App Header */}
      <Header onNewDay={handleNewDay} />

      {/* Main Dashboard Grid: Current Expense Period */}
      <main className="dashboard-grid">
        {/* Left Column: Today's Entry */}
        <section>
          <TodayEntry 
            ref={todayEntryRef}
            people={people}
            onSaveDay={handleSaveDay} 
            editingEntry={editingEntry}
            onCancelEdit={() => setEditingEntry(null)}
          />
        </section>

        {/* Right Column: Total Expense & Split Between 3 Cards */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Total Expense Summary & TOTAL button */}
          <TotalExpenseCard 
            totalExpense={totalExpense} 
            totalDaysCount={totalDaysCount}
            onRecalculateTotal={handleRecalculateTotal} 
          />

          {/* 3-Person Split & COMPLETE & SAVE button */}
          <SplitCard 
            rides={currentRides}
            people={people} 
            onOpenPeopleSetup={() => setIsPeopleModalOpen(true)}
            onCompleteSettlement={handleCompleteSettlement}
          />
        </section>

        {/* Full Width Section: Ride History for Current Active Period */}
        <section className="grid-full-width" style={{ marginTop: '12px' }}>
          <PixelRoadDecoration showMiniAuto={true} />
          
          <RideHistory 
            rides={currentRides}
            onEditRide={handleEditRide}
            onDeleteRide={handleDeleteRide}
            onAddFirstRide={handleNewDay}
          />
        </section>
      </main>

      {/* Separate Section: Completed Settlement History */}
      <SettlementHistory 
        settlements={settlements}
        onDeleteSettlement={handleDeleteSettlement}
      />

      {/* Footer */}
      <footer 
        style={{ 
          marginTop: '60px', 
          textAlign: 'center', 
          color: 'var(--text-muted)', 
          fontSize: '12px',
          borderTop: '1px solid #1c1c1c',
          paddingTop: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <p className="font-pixel text-yellow" style={{ fontSize: '11px' }}>
          🛺 AutoKhata — Daily Rickshaw Tracker & Settlement Manager
        </p>
        <p style={{ color: '#666' }}>
          Track the ride. Split the fare. Save settlements to permanent history.
        </p>

        {currentRides.length === 0 && settlements.length === 0 && (
          <button 
            onClick={handleLoadSampleData}
            className="btn-pixel btn-pixel-secondary"
            style={{ fontSize: '9px', padding: '6px 12px', marginTop: '8px' }}
          >
            ⚡ Load Demo Sample Period (3 Days = ₹1,363)
          </button>
        )}
      </footer>

      {/* People Setup Modal */}
      <PeopleSetupModal 
        isOpen={isPeopleModalOpen}
        currentPeople={people}
        onSave={handleSavePeople}
        onClose={() => setIsPeopleModalOpen(false)}
      />

      {/* Floating Toast Notifications */}
      <PixelToastManager toasts={toasts} />
    </div>
  );
}

export default App;
