// Test script to manually trigger equipment selection
console.log("Testing equipment selection...");

// Wait for the page to load
setTimeout(() => {
  // Try to find the store instance
  const store = window.__STORE__;
  if (store) {
    console.log("Store found, testing toggleEquipment...");
    store.toggleEquipment("BODY_ONLY");
    console.log("Equipment toggled!");
  } else {
    console.log("Store not found, trying to access via React components...");
    
    // Try to trigger a click event on the first equipment card
    const equipmentCards = document.querySelectorAll('[data-testid="equipment-card"]');
    console.log("Equipment cards found:", equipmentCards.length);
    
    if (equipmentCards.length > 0) {
      equipmentCards[0].click();
      console.log("Clicked first equipment card");
    }
  }
}, 2000);