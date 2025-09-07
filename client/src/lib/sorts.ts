export type SortFrames = {
  name: string;
  frames: number[][];
  result: number[];
};

function clone(a: number[]) {
  return a.slice();
}

export function bubbleSort(input: number[]): SortFrames {
  const a = clone(input);
  const frames: number[][] = [clone(a)];
  for (let i = 0; i < a.length; i += 1) {
    for (let j = 0; j < a.length - i - 1; j += 1) {
      if (a[j] > a[j + 1]) {
        const t = a[j]; a[j] = a[j + 1]; a[j + 1] = t;
        frames.push(clone(a));
      }
    }
  }
  return { name: 'Bubble Sort', frames, result: a };
}

export function selectionSort(input: number[]): SortFrames {
  const a = clone(input);
  const frames: number[][] = [clone(a)];
  for (let i = 0; i < a.length; i += 1) {
    let minIdx = i;
    for (let j = i + 1; j < a.length; j += 1) if (a[j] < a[minIdx]) minIdx = j;
    if (minIdx !== i) { const t = a[i]; a[i] = a[minIdx]; a[minIdx] = t; frames.push(clone(a)); }
  }
  return { name: 'Selection Sort', frames, result: a };
}

export function insertionSort(input: number[]): SortFrames {
  const a = clone(input);
  const frames: number[][] = [clone(a)];
  for (let i = 1; i < a.length; i += 1) {
    const key = a[i];
    let j = i - 1;
    while (j >= 0 && a[j] > key) { a[j + 1] = a[j]; j -= 1; frames.push(clone(a)); }
    a[j + 1] = key; frames.push(clone(a));
  }
  return { name: 'Insertion Sort', frames, result: a };
}

export function mergeSort(input: number[]): SortFrames {
  const a = clone(input);
  const frames: number[][] = [clone(a)];
  function merge(lo: number, mid: number, hi: number) {
    const left = a.slice(lo, mid + 1);
    const right = a.slice(mid + 1, hi + 1);
    let i = 0, j = 0, k = lo;
    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) { a[k++] = left[i++]; }
      else { a[k++] = right[j++]; }
      frames.push(clone(a));
    }
    while (i < left.length) { a[k++] = left[i++]; frames.push(clone(a)); }
    while (j < right.length) { a[k++] = right[j++]; frames.push(clone(a)); }
  }
  function sort(lo: number, hi: number) {
    if (lo >= hi) return;
    const mid = Math.floor((lo + hi) / 2);
    sort(lo, mid); sort(mid + 1, hi); merge(lo, mid, hi);
  }
  sort(0, a.length - 1);
  return { name: 'Merge Sort', frames, result: a };
}

export function quickSort(input: number[]): SortFrames {
  const a = clone(input);
  const frames: number[][] = [clone(a)];
  function partition(lo: number, hi: number): number {
    const pivot = a[hi];
    let i = lo;
    for (let j = lo; j < hi; j += 1) {
      if (a[j] <= pivot) { const t = a[i]; a[i] = a[j]; a[j] = t; i += 1; frames.push(clone(a)); }
    }
    const t = a[i]; a[i] = a[hi]; a[hi] = t; frames.push(clone(a));
    return i;
  }
  function sort(lo: number, hi: number) {
    if (lo >= hi) return;
    const p = partition(lo, hi);
    sort(lo, p - 1); sort(p + 1, hi);
  }
  sort(0, a.length - 1);
  return { name: 'Quick Sort', frames, result: a };
}

export function heapSort(input: number[]): SortFrames {
  const a = clone(input);
  const frames: number[][] = [clone(a)];
  const n = a.length;
  function heapify(len: number, i: number) {
    let largest = i;
    const l = 2 * i + 1; const r = 2 * i + 2;
    if (l < len && a[l] > a[largest]) largest = l;
    if (r < len && a[r] > a[largest]) largest = r;
    if (largest !== i) { const t = a[i]; a[i] = a[largest]; a[largest] = t; frames.push(clone(a)); heapify(len, largest); }
  }
  for (let i = Math.floor(n / 2) - 1; i >= 0; i -= 1) heapify(n, i);
  for (let i = n - 1; i > 0; i -= 1) { const t = a[0]; a[0] = a[i]; a[i] = t; frames.push(clone(a)); heapify(i, 0); }
  return { name: 'Heap Sort', frames, result: a };
}

export function shellSort(input: number[]): SortFrames {
  const a = clone(input);
  const frames: number[][] = [clone(a)];
  let gap = Math.floor(a.length / 2);
  while (gap > 0) {
    for (let i = gap; i < a.length; i += 1) {
      const temp = a[i];
      let j = i;
      while (j >= gap && a[j - gap] > temp) { a[j] = a[j - gap]; j -= gap; frames.push(clone(a)); }
      a[j] = temp; frames.push(clone(a));
    }
    gap = Math.floor(gap / 2);
  }
  return { name: 'Shell Sort', frames, result: a };
}

export function countingSort(input: number[]): SortFrames {
  const a = clone(input);
  const frames: number[][] = [clone(a)];
  const min = Math.min(...a); const max = Math.max(...a);
  const k = max - min + 1;
  const count = new Array(k).fill(0);
  for (const v of a) count[v - min] += 1;
  let i = 0;
  for (let val = 0; val < k; val += 1) {
    while (count[val] > 0) { a[i++] = val + min; count[val] -= 1; frames.push(clone(a)); }
  }
  return { name: 'Counting Sort', frames, result: a };
}

export function radixSortLSD(input: number[]): SortFrames {
  const a = clone(input);
  const frames: number[][] = [clone(a)];
  const max = Math.max(...a, 0);
  let exp = 1;
  const aux = new Array(a.length);
  while (Math.floor(max / exp) > 0) {
    const count = new Array(10).fill(0);
    for (let i = 0; i < a.length; i += 1) count[Math.floor(a[i] / exp) % 10] += 1;
    for (let i = 1; i < 10; i += 1) count[i] += count[i - 1];
    for (let i = a.length - 1; i >= 0; i -= 1) { const d = Math.floor(a[i] / exp) % 10; aux[--count[d]] = a[i]; }
    for (let i = 0; i < a.length; i += 1) { a[i] = aux[i]; frames.push(clone(a)); }
    exp *= 10;
  }
  return { name: 'Radix Sort (LSD)', frames, result: a };
}

export const ALL_SORTS: Array<{ key: string; name: string; fn: (arr: number[]) => SortFrames }> = [
  { key: 'bubble', name: 'Bubble', fn: bubbleSort },
  { key: 'selection', name: 'Selection', fn: selectionSort },
  { key: 'insertion', name: 'Insertion', fn: insertionSort },
  { key: 'merge', name: 'Merge', fn: mergeSort },
  { key: 'quick', name: 'Quick', fn: quickSort },
  { key: 'heap', name: 'Heap', fn: heapSort },
  { key: 'shell', name: 'Shell', fn: shellSort },
  { key: 'counting', name: 'Counting', fn: countingSort },
  { key: 'radix', name: 'Radix (LSD)', fn: radixSortLSD },
];


