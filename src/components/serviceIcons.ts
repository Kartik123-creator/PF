import { Bot, Building2, Globe, Layers, Smartphone, Zap, type LucideIcon } from "lucide-react";

/** Icon per service id (see data/services.ts). Falls back to Layers. */
const SERVICE_ICONS: Record<string, LucideIcon> = {
  web: Globe,
  erp: Building2,
  mobile: Smartphone,
  realtime: Zap,
  ai: Bot,
};

export function serviceIcon(id: string): LucideIcon {
  return SERVICE_ICONS[id] ?? Layers;
}
