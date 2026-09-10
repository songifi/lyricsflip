'use client';

import { AdminConfig } from "@/components/organisms/AdminConfig";
import { useStellar } from "@/lib/stellar/hooks/useStellar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
  const { account } = useStellar();
  const router = useRouter();

  useEffect(() => {
    // Redirect if no account or not admin
    if (!account) {
      router.push('/');
    }
  }, [account, router]);

  if (!account) {
    return null;
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <AdminConfig />
    </main>
  );
}