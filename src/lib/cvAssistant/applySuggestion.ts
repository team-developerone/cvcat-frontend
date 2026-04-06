import type { CV } from "@/lib/types";
import type { CVAssistantSuggestion } from "@/services/api";
import type { BackendCV } from "@/services/api";
import { frontendCVToBackendData, backendCVToFrontendCV } from "@/lib/types";

// Allowed path prefixes for safety — reject anything outside CV data
const ALLOWED_PATH_PREFIXES = [
  "data.basics.",
  "data.work[",
  "data.projects[",
  "data.skills[",
  "data.volunteer[",
  "data.education[",
  "data.certificates[",
  "data.publications[",
  "data.awards[",
  "data.interests[",
  "data.custom[",
];

// Root-level array paths allowed for append operations (e.g., "data.work" to append a new entry)
const ALLOWED_ROOT_ARRAY_PATHS = [
  "data.work",
  "data.projects",
  "data.skills",
  "data.volunteer",
  "data.education",
  "data.certificates",
  "data.publications",
  "data.awards",
  "data.interests",
  "data.custom",
];

const PATH_SEGMENT_RE = /^[a-zA-Z_][a-zA-Z0-9_]*(\[\d{1,4}\])?$/;
const MAX_PATH_DEPTH = 8;
const BANNED_SEGMENTS = ["__proto__", "constructor", "prototype"];

function isAllowedPath(path: string): boolean {
  if (!path || path.length > 200) return false;
  if (!ALLOWED_PATH_PREFIXES.some((prefix) => path.startsWith(prefix))
    && !ALLOWED_ROOT_ARRAY_PATHS.includes(path)) return false;

  const parts = path.split(".");
  if (parts.length > MAX_PATH_DEPTH) return false;

  for (const part of parts) {
    if (!PATH_SEGMENT_RE.test(part)) return false;
    const ident = part.replace(/\[\d+\]$/, "");
    if (BANNED_SEGMENTS.includes(ident)) return false;
  }

  return true;
}

/**
 * Parse a path like "data.work[0].highlights[1]" into segments
 */
function parsePath(path: string): (string | number)[] {
  const segments: (string | number)[] = [];
  const parts = path.split(".");

  for (const part of parts) {
    const bracketMatch = part.match(/^(\w+)\[(\d+)\]$/);
    if (bracketMatch) {
      segments.push(bracketMatch[1]);
      segments.push(parseInt(bracketMatch[2], 10));
    } else {
      segments.push(part);
    }
  }

  return segments;
}

/**
 * Get a nested value from an object using parsed path segments
 */
function getNestedValue(obj: Record<string, unknown>, segments: (string | number)[]): unknown {
  let current: unknown = obj;
  for (const seg of segments) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string | number, unknown>)[seg];
  }
  return current;
}

/**
 * Set a nested value in an object immutably using parsed path segments
 */
function setNestedValue(
  obj: Record<string, unknown>,
  segments: (string | number)[],
  value: unknown
): Record<string, unknown> {
  if (segments.length === 0) return obj;

  const [head, ...rest] = segments;

  if (rest.length === 0) {
    if (typeof head === "number") {
      const arr = Array.isArray(obj) ? [...obj] : [];
      arr[head] = value;
      return arr as unknown as Record<string, unknown>;
    }
    return { ...obj, [head]: value };
  }

  const child = (obj as Record<string | number, unknown>)[head];
  const nextChild =
    typeof child === "object" && child != null
      ? (child as Record<string, unknown>)
      : typeof rest[0] === "number"
        ? []
        : {};

  const updatedChild = setNestedValue(
    nextChild as Record<string, unknown>,
    rest,
    value
  );

  if (typeof head === "number") {
    const arr = Array.isArray(obj) ? [...obj] : [];
    arr[head] = updatedChild;
    return arr as unknown as Record<string, unknown>;
  }

  return { ...obj, [head]: updatedChild };
}

/**
 * Apply a single suggestion to a CV, returning a new CV object.
 * Operates on the backend data format internally for path compatibility,
 * then converts back to frontend CV.
 */
export function applySuggestion(cv: CV, suggestion: CVAssistantSuggestion): CV | null {
  if (!isAllowedPath(suggestion.path)) {
    console.warn(`[applySuggestion] Blocked disallowed path: ${suggestion.path}`);
    return null;
  }

  if (suggestion.type !== "replace" && suggestion.type !== "append") {
    console.warn(`[applySuggestion] Unsupported type: ${suggestion.type}`);
    return null;
  }

  // Convert to backend format to work with "data.*" paths
  const backendData = frontendCVToBackendData(cv);
  const backendObj = { data: backendData } as Record<string, unknown>;
  const segments = parsePath(suggestion.path);

  let updated: Record<string, unknown>;

  if (suggestion.type === "replace") {
    updated = setNestedValue(backendObj, segments, suggestion.newValue);
  } else if (suggestion.type === "append") {
    const existing = getNestedValue(backendObj, segments);
    const currentArr = Array.isArray(existing) ? existing : [];
    const toAppend = Array.isArray(suggestion.newValue)
      ? suggestion.newValue
      : [suggestion.newValue];
    updated = setNestedValue(backendObj, segments, [...currentArr, ...toAppend]);
  } else {
    return null;
  }

  // Reconstruct a BackendCV-like object to convert back
  const fakeBackendCV: BackendCV = {
    _id: cv.id,
    title: cv.title,
    description: cv.description,
    isDraft: false,
    cvType: cv.isTailored ? "tailored" : "base",
    isEmailVerified: cv.isEmailVerified,
    _user: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    data: (updated as { data: BackendCV["data"] }).data,
  };

  const newCV = backendCVToFrontendCV(fakeBackendCV);
  // Preserve the original id and timestamps
  newCV.id = cv.id;
  newCV.lastUpdated = new Date();
  newCV.title = cv.title;

  return newCV;
}
