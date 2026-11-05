"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { enquiriesClientRepository } from "@/services/enquiries/client";

export interface UseNewEnquiryCountResult {
  count: number;
  loading: boolean;
}

export function useNewEnquiryCount(): UseNewEnquiryCountResult {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const intervalRef = useRef<number | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      const stats = await enquiriesClientRepository.getStats();
      setCount(stats.new);
      setLoading(false);
    } catch {
      // Keep last known count, do not throw
      setLoading(false);
    }
  }, []);

  const startInterval = useCallback(() => {
    if (intervalRef.current !== null) return;
    intervalRef.current = window.setInterval(fetchStats, 30000);
  }, [fetchStats]);

  const stopInterval = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchStats();
    startInterval();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopInterval();
      } else {
        fetchStats();
        startInterval();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      stopInterval();
    };
  }, [fetchStats, startInterval, stopInterval]);

  return { count, loading };
}
