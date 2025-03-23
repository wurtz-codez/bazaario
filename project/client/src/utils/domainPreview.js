/**
 * Domain preview utility to handle website previews without requiring real domain purchases
 */

// Base URL for local development previews
export const PREVIEW_BASE_URL = process.env.REACT_APP_PREVIEW_URL || 'http://localhost:5001/preview';

/**
 * Formats a domain for use in the application
 * Removes the need for a real domain purchase by using subdirectory-based approach
 */
export const formatDomain = (domain) => {
  // Strip any protocol and trailing slashes
  let formattedDomain = domain
    .replace(/^https?:\/\//, '')
    .replace(/\/$/, '');
  
  // Remove .bazaario.com suffix if present
  formattedDomain = formattedDomain.replace(/\.bazaario\.com$/, '');
  
  // Return just the subdomain/slug part
  return formattedDomain;
};

/**
 * Generates a preview URL for a website without requiring a real domain
 */
export const getPreviewUrl = (domain) => {
  const slug = formatDomain(domain);
  return `${PREVIEW_BASE_URL}/${slug}`;
};

/**
 * Formats a domain for display to the user
 */
export const getDomainForDisplay = (domain) => {
  // Show users what their domain would look like if purchased
  const slug = formatDomain(domain);
  return `${slug}.preview.bazaario.com`;
};
