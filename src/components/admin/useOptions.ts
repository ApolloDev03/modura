'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import type { ApiRecord, ApiResponse, Option, OptionsSource } from '@/types';

const cache = new Map<string, Option[]>();

/** Loads dropdown options from an admin endpoint (?all=1). */
export default function useOptions(source?: OptionsSource): Option[] {
  const key = source ? source.endpoint : null;
  const [options, setOptions] = useState<Option[]>(() => (key && cache.get(key)) || []);

  useEffect(() => {
    if (!source) return undefined;
    let alive = true;
    api.get<ApiResponse<ApiRecord[]>>(source.endpoint, { params: { all: 1 } })
      .then(({ data }) => {
        const opts = (data.data || []).map((r) => ({
          value: String(r.id),
          label: String(r[source.labelKey || 'name'] ?? '') + (r.status === false ? ' (inactive)' : ''),
        }));
        cache.set(source.endpoint, opts);
        if (alive) setOptions(opts);
      })
      .catch(() => {});
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return options;
}
