'use client';


import InquiryList from '@/components/admin/InquiryList';
import { INQUIRIES } from '@/lib/modules';

export default function ProjectInquiriesPage() {
  return <InquiryList config={INQUIRIES.project} />;
}
