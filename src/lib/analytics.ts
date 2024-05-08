import type {
  AnalyticsUserProperty,
  AnalyticsUserPropertyValue,
  AnalyticsEvent,
  AnalyticsEventData,
} from '@/constants/analytics';

import { testFlags } from './testFlags';

const DEBUG_ANALYTICS = false;

export const identify = <T extends AnalyticsUserProperty>(
  property: T,
  propertyValue: AnalyticsUserPropertyValue<T>
) => {
  if (DEBUG_ANALYTICS) {
    console.log(`[Analytics:Identify] ${property}`, propertyValue);
  }
  const customEvent = new CustomEvent('dydx:identify', {
    detail: { property, propertyValue },
  });

  globalThis.dispatchEvent(customEvent);
};

export const track = <T extends AnalyticsEvent>(
  eventType: T,
  eventData?: AnalyticsEventData<T>
) => {
  const eventDataWithReferrer = { ...(eventData || {}), refferer: testFlags.referrer };
  if (DEBUG_ANALYTICS) {
    console.log(`[Analytics] ${eventType}`, eventDataWithReferrer);
  }
  const customEvent = new CustomEvent('dydx:track', {
    detail: { eventType, eventDataWithReferrer },
  });

  globalThis.dispatchEvent(customEvent);
};
