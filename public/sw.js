importScripts('./moment.js')
function checkMedicationSchedules() {
  // Get the current time
  const now = new Date();
  
  // Define the time ranges for each medication abstraction
  const timeRanges = {
    'morgen': { start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6), end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10) },
    'formiddag': { start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10), end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14) },
    'ettermiddag': { start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14), end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18) },
    'kveld': { start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18), end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 22) },
  };

  let currentRange = null;
  const passedRanges = [];
  for (const range in timeRanges) {
    if (now >= timeRanges[range].end) {
      passedRanges.push(range);
    }
  }
  
  // Open the indexedDB database
  const openRequest = indexedDB.open('protocolDB');
  
  // Handle errors that occur when opening the database
  openRequest.onerror = function(event) {
    console.error('Failed to open database:', event.target.error);
  };
  
  // Handle success when opening the database
  openRequest.onsuccess = function(event) {
    // Get the database object
    const db = event.target.result;
    
    // Get the object store for medications
    const transaction = db.transaction(['medications'], 'readonly');
    const objectStore = transaction.objectStore('medications');
    
    const getAllRequest = objectStore.getAll();
    getAllRequest.onsuccess = function(event) {
      const objects = getAllRequest.result;
      const medicationsToTakeNow = objects.filter((med) => {
        let isDueToday = true;
        if (med.frequency === 'annenhver dag') {
          const start = moment(med.startDate).diff(moment(), 'days');
          isDueToday = start % 2 === 0;
        }
        return isDueToday && med.hours.some(time => passedRanges.includes(time)) && med.startDate < moment().unix() && med.endDate > moment().unix();
      });
      const remainsToTake = medicationsToTakeNow.filter((med) => {
        if (med.history.length > 0) {
          const taken = med.history.filter((h) => {
            return moment.unix(h.date).isSame(moment(), 'day');
          })
          return taken.length === 0
        } else {
          return true
        }

      })
      console.log(remainsToTake)
      if (remainsToTake.length > 0) {
        self.registration.showNotification('Medisiner', {
          body: `Du har medisiner som må tas nå`,
          icon: 'https://www.skeletonlabs.no/wp-content/uploads/2020/05/cropped-SkeletonLabs-Logo-1-32x32.png',
          vibrate: [200, 100, 200],
        })
      }
      
      return remainsToTake

    }
    
    // Close the database transaction
    transaction.oncomplete = function() {
      db.close();
    };
  };
  
}

// Call the checkMedicationSchedules function every minute
setInterval(checkMedicationSchedules, 60000);