'use client';

import InquiryList from '@/components/admin/InquiryList';
import { INQUIRIES } from '@/lib/modules';

export default function ContactInquiriesPage() {
  return <InquiryList config={INQUIRIES.contact} />;
}
