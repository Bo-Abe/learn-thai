/**
 * Advertising configuration.
 *
 * To enable ads, fill in your Google AdSense (or compatible) publisher details
 * below. Leave `enabled` as false or `clientId` empty to hide all ad slots.
 *
 * Example for Google AdSense:
 *   enabled: true,
 *   clientId: 'ca-pub-XXXXXXXXXXXXXXXX',
 *   slotId:   '1234567890',
 */
export const adsConfig = {
  /** Master switch – set to true to show ads site-wide. */
  enabled: false,

  /** Google AdSense publisher client ID (e.g. 'ca-pub-XXXXXXXXXXXXXXXX'). */
  clientId: '',

  /** Ad slot ID for the leaderboard banner. */
  slotId: '',

  /**
   * Where to show the banner relative to the page content.
   * 'top'   – horizontal banner between header and content (recommended)
   * 'sidebar' – right sidebar on desktop, top banner on mobile
   */
  placement: 'top' as 'top' | 'sidebar',
};
