'use client';

import { notFound, useParams } from 'next/navigation';
import { MODULES } from '@/lib/modules';
import ResourceForm from '@/components/admin/ResourceForm';

export default function ModuleEditPage() {
  const { module, id } = useParams<{ module: string; id: string }>();
  const config = MODULES[module];
  if (!config || !/^\d+$/.test(String(id))) notFound();
  return <ResourceForm key={`${module}-${id}`} moduleKey={module} config={config} id={id} />;
}
