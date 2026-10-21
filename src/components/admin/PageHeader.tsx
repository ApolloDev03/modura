import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  crumb?: string;
  children?: ReactNode;
}

export default function PageHeader({ title, crumb, children }: PageHeaderProps) {
  return (
    <>
      <div className="crumb">Admin / {crumb || title}</div>
      <div className="page-h">
        <h2>{title}</h2>
        {children ? <div className="page-actions">{children}</div> : null}
      </div>
    </>
  );
}
