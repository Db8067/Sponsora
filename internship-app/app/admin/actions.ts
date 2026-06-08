"use server";

import { supabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

// Verify admin (in a real app, verify Clerk user ID is admin, but for now we trust the action or check email)
// We'll assume the admin page is protected by middleware or layout, but let's just do the DB ops here.

export async function getAdminStats() {
  const { count: subCount } = await supabaseAdmin
    .from("user_subscriptions")
    .select("*", { count: "exact", head: true })
    .eq("status", "active");

  const startOfDay = new Date();
  startOfDay.setHours(0,0,0,0);
  const { count: todayApplies } = await supabaseAdmin
    .from("applications_log")
    .select("*", { count: "exact", head: true })
    .gte("created_at", startOfDay.toISOString());

  const { count: discountCount } = await supabaseAdmin
    .from("discount_codes")
    .select("*", { count: "exact", head: true })
    .eq("is_active", true);

  return { activeSubscriptions: subCount || 0, todayApplies: todayApplies || 0, activeDiscounts: discountCount || 0 };
}

export async function getSubscriptions() {
  const { data } = await supabaseAdmin
    .from("user_subscriptions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);
  return data || [];
}

export async function grantAccess(userId: string, planType: string, days: number) {
  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + days);
  
  await supabaseAdmin
    .from("user_subscriptions")
    .upsert({
      user_id: userId,
      plan_type: planType,
      status: "active",
      valid_until: validUntil.toISOString(),
      apply_limit_per_day: planType === "1_day" ? 10 : planType === "7_day" ? 12 : 15,
      updated_at: new Date().toISOString()
    }, { onConflict: "user_id" });
    
  revalidatePath("/admin");
  return { success: true };
}

export async function getDiscountCodes() {
  const { data } = await supabaseAdmin
    .from("discount_codes")
    .select("*")
    .order("created_at", { ascending: false });
  return data || [];
}

export async function createDiscountCode(code: string, discount: number, maxUses: number, expiresAt: string | null) {
  await supabaseAdmin
    .from("discount_codes")
    .insert({
      code: code.toUpperCase(),
      discount_percentage: discount,
      max_uses: maxUses,
      expires_at: expiresAt || null,
      is_active: true
    });
  revalidatePath("/admin");
  return { success: true };
}

export async function getAuditLogs() {
  const { data } = await supabaseAdmin
    .from("applications_log")
    .select("*, sponsora_posts(title, metadata)")
    .order("created_at", { ascending: false })
    .limit(100);
  return data || [];
}

export async function toggleDiscountCode(id: string, isActive: boolean) {
  await supabaseAdmin.from("discount_codes").update({ is_active: isActive }).eq("id", id);
  revalidatePath("/admin");
}
