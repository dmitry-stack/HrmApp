export const formatMessageTime = (timestamp: unknown): string => {
  if (!timestamp) return '';
  let date: Date;
  if (
    typeof timestamp === 'object' &&
    'toDate' in timestamp &&
    typeof (timestamp as { toDate: () => unknown }).toDate === 'function'
  ) {
    const firestoreDate = (timestamp as { toDate: () => unknown }).toDate();
    if (firestoreDate instanceof Date) {
      date = firestoreDate;
    } else {
      return '';
    }
  } else if (timestamp instanceof Date) {
    date = timestamp;
  } else if (typeof timestamp === 'number' || typeof timestamp === 'string') {
    date = new Date(timestamp);
  } else {
    return '';
  }
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
};
