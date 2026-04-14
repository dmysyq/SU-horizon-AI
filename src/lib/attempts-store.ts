/**
 * Хранилище попыток (localStorage).
 * TODO(ai): заменить на API при подключении бэкенда.
 */

export interface StoredAttempt {
  id: string;
  courseSlug: string;
  courseTitle: string;
  lessonSlug: string;
  lessonTitle: string;
  type: 'test' | 'report';
  studentAnswer: string;
  score: number;
  maxScore: number;
  errors: string[];
  recommendations: string[];
  date: string;
}

const STORAGE_KEY = 'ch_f_attempts';
const STORAGE_VERSION_KEY = 'ch_f_attempts_version';
const CURRENT_VERSION = 'v1';

function ensureVersion() {
  if (typeof window === 'undefined') return;
  try {
    const current = localStorage.getItem(STORAGE_VERSION_KEY);
    if (current !== CURRENT_VERSION) {
      // При каждом перезапуске/обновлении версии очищаем попытки
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(STORAGE_VERSION_KEY, CURRENT_VERSION);
    }
  } catch {
    // ignore
  }
}

function load(): StoredAttempt[] {
  if (typeof window === 'undefined') return [];
  ensureVersion();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function save(attempts: StoredAttempt[]) {
  if (typeof window === 'undefined') return;
  ensureVersion();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts));
}

export function getAttempts(): StoredAttempt[] {
  return load().sort((a, b) => (b.date > a.date ? 1 : -1));
}

export function getAttempt(id: string): StoredAttempt | null {
  return load().find((a) => a.id === id) ?? null;
}

export function addAttempt(attempt: StoredAttempt) {
  const list = load();
  list.unshift(attempt);
  save(list);
}
