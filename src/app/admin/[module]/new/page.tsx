'use client';

import { notFound, useParams } from 'next/navigation';
import { MODULES } from '@/lib/modules';
import ResourceForm from '@/components/admin/ResourceForm';

export default function ModuleCreatePage() {
  const { module } = useParams<{ module: string }>();
  const config = MODULES[module];
  if (!config) notFound();
  return <ResourceForm key={`${module}-new`} moduleKey={module} config={config} />;
}
