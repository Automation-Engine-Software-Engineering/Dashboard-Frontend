export let savedRange: Range | null = null;

export const saveSelection = () => {
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    savedRange = selection.getRangeAt(0).cloneRange();
  }
};

export const restoreSelection = () => {
  const selection = window.getSelection();
  if (selection && savedRange) {
    selection.removeAllRanges();
    selection.addRange(savedRange);
  }
};
